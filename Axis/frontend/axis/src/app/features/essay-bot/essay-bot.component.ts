import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, contentChild, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentInfo } from '../../core/models/document.model';

@Component({
  selector: 'app-essay-bot',
  imports: [NgFor, FormsModule],
  templateUrl: './essay-bot.component.html',
  styleUrl: './essay-bot.component.css',
  standalone: true
})
export class EssayBotComponent implements OnInit {
  chatLog: { role: "user" | "assistant", content: string }[] = [
    { role: "assistant", content: "Hi, I am chat! How can I help?" }
  ];
  message: string = "";
  chatUrl = "http://localhost:8080/api/essay";
  docUrl = "http://localhost:8080/api/documents";

  document_id: number = -1;
  documentInfo: DocumentInfo;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private route: ActivatedRoute
  ) {
    this.documentInfo = { 
      document_id: -1, 
      student_email: "", 
      college_id: -1, 
      document_name: "" 
    };
  }

  ngOnInit(): void {
    this.getDocumentInfo();
  }

  getDocumentInfo(): void {
    const documentId = this.route.snapshot.paramMap.get("id");
    if (documentId) {
      this.http.get<DocumentInfo>(`${this.docUrl}/get/${documentId}`).subscribe({
        next: (response) => {
          this.documentInfo = response;
          this.document_id = response.document_id;
        }
      });
    }
  }

  submitMessage() {
    if (this.message.trim() && this.documentInfo.document_id !== -1) {
      const context = this.chatLog;
      const sentMessage = this.message;
      this.chatLog.push({ role: "user", content: this.message });
      this.message = "";

      const loadingIndex = this.chatLog.push({ 
        role: "assistant", 
        content: "" 
      }) - 1;

      this.passUserMessage(sentMessage, context).subscribe({
        next: (response) => {
          const currentContent = this.chatLog[loadingIndex].content;
          const trimmedResponse = response.trim();
          if (currentContent && !currentContent.endsWith(" ") && !trimmedResponse.startsWith(" ")) {
            this.chatLog[loadingIndex].content += " ";
          }
          this.chatLog[loadingIndex].content += trimmedResponse;
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });      
    }
  }

  passUserMessage(message: string, context: {role: "user"|"assistant", content: string}[]): Observable<string> {
    return new Observable<string>(observer => {
      const jsonContext = JSON.stringify(context);
      
      const url = new URL(`${this.chatUrl}/getFlux`);
      url.searchParams.set('document_id', this.documentInfo.document_id.toString());
      url.searchParams.set('message', message);
      url.searchParams.set('context', jsonContext);
  
      const eventSource = new EventSource(encodeURI(url.toString()));
  
      eventSource.onmessage = (event) => {
        this.zone.run(() => {
          if (event.data === "END") {
            observer.complete(); 
            eventSource.close();
          } else {
            observer.next(event.data);
          }
        });
      };
  
      eventSource.addEventListener('end', () => {
        this.zone.run(() => {
          observer.complete();
          eventSource.close();
        });
      });

      
      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        this.zone.run(() => observer.error(error));
        eventSource.close();
      };
  
      return () => {
        eventSource.close();
      };
    });
  }  
}
