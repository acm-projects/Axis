import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, contentChild, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentInfo } from '../../core/models/document.model';
import { AuthService } from '../../core/services/auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-essay-bot',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './essay-bot.component.html',
  styleUrl: './essay-bot.component.css',
  standalone: true
})
export class EssayBotComponent implements OnInit {
  state: "save" | "upload" | "open" | "download" | "view" = "open";
  file: File | null = null;
  sessionEmail: string = "";


  chatLog: { role: "user" | "assistant", content: string }[] = [
    { role: "assistant", content: "Hi, I am chat! How can I help?" }
  ];
  studentDocumentInfo: DocumentInfo[] = []

  message: string = "";
  chatUrl = "http://localhost:8080/api/essay";
  docUrl : string = "http://localhost:8080/api/documents"

  documentInfo: DocumentInfo;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.documentInfo = { 
      document_id: -1, 
      student_email: "", 
      college_id: -1, 
      document_name: "" 
    };
  }

  ngOnInit(): void {
    if (this.authService.getSession() === null) {
      this.router.navigate(['/']);
    }
    this.sessionEmail = this.authService.getSession()!.email
    if (this.state == "open") {
      this.getStudentDocumentInfo()
    } else {
      this.getDocumentInfo();
    }
  }

  getDocumentInfo(): void {
    const documentId = this.route.snapshot.paramMap.get("id");
    if (documentId) {
      this.http.get<DocumentInfo>(`${this.docUrl}/get/${documentId}`).subscribe({
        next: (response) => {
          this.documentInfo = response;
          if (this.documentInfo.document_id != -1) {
            this.state = "view";
          } else {
            this.state = "open";
          }
        }
      });
    }
  }

  submitMessage() {
    console.log(this.documentInfo.document_id)
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

      
      // eventSource.onerror = (error) => {
      //   console.error('SSE error:', error);
      //   this.zone.run(() => observer.error(error));
      //   eventSource.close();
      // };
  
      return () => {
        eventSource.close();
      };
    });
  }  

  saveCurrentDocument(): void {
    this.state = "save";
  }

  downloadCurrentDocument(): void {
    this.state = "download";
  }

  openDocument(): void {
    this.getStudentDocumentInfo()
    this.router.navigate(["essay"])
    this.state = "open";
  }

  viewDocument(document_id: number) {
    
    this.router.navigate(['/essay', document_id])
    this.getDocumentInfo()
    this.state = "view"
  }

  uploadDocument(): void {
    this.state = "upload";
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    if (!this.file) {
      alert('Please fill all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('studentEmail', this.sessionEmail);
    formData.append('collegeID', "35");

    this.http.post(`${this.docUrl}/uploadAndGetId`, formData, {
      responseType: 'text',
      observe: 'body'
    }).subscribe(
      (response) => {
        //alert('Upload successful: ' + response);
        this.router.navigate([`essay/${response}`])
        this.ngOnInit();
      },
      (error) => {
        alert('Upload failed: ' + error.message);
      }
    );
  }

  getStudentDocumentInfo() : void {
    //https://axisdocuments.s3.us-west-2.amazonaws.com/kevinphilip2004%40gmail.com/35/CS4141_Pre1_lxv220012.pdf
    this.http.get<DocumentInfo[]>(`${this.docUrl}/getDocuments/${this.sessionEmail}`).subscribe({
      next: (response: DocumentInfo[]) => {
       this.studentDocumentInfo = response
      },
      error: (error) => {
        console.error("Error retreving documents ", error)
      }
    })
  }

}
