import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Component, NgZone, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {QuillModule} from 'ngx-quill';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-essay-bot',
  imports: [NgFor, NgIf, FormsModule, QuillModule],
  templateUrl: './essay-bot.component.html',
  styleUrl: './essay-bot.component.css',
  standalone: true
})
export class EssayBotComponent implements OnInit{
  chatLog: string[];
  message: string;
  apiUrl = "http://localhost:8080/api/essay";
  essayText: string = '';
  documentId!: number;
  fileUrl: string = '';

  constructor (private http: HttpClient, private zone: NgZone,
               private route: ActivatedRoute
  ) {
    this.chatLog = ["Hi, I am chat! How can I help?"]
    this.message=""
  }

  ngOnInit() {
    this.documentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEssayText();
  }

  loadEssayText() {
    this.http
      .get(`http://localhost:8080/api/documents/${this.documentId}/text`, {
        responseType: 'text'
      })
      .subscribe({
        next: text => (this.essayText = text),
        error: err => console.error('Failed to load essay:', err)
      });
  }

  submitMessage() {
    if (this.message.trim()) {
      this.chatLog.push(this.message);

      const sentMessage = this.message;
      this.message = "";

      const loadingIndex = this.chatLog.push("") - 1;

      this.passUserMessage(sentMessage).subscribe({
        next: (response) => {
          this.chatLog[loadingIndex] += response + " ";
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
  }

  passUserMessage(message: string): Observable<string> {
    return new Observable<string>(observer => {
      const eventSource = new EventSource(`${this.apiUrl}?message=${encodeURIComponent(message)}`);

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        this.zone.run(() => observer.error(error));
        eventSource.close();
      };

      eventSource.onmessage = (event) => {
          this.zone.run(() => {
              observer.next(event.data);
          });
      };

      return () => {
          console.log("Closing SSE connection...");
          eventSource.close();
      };

    });
  }
}
