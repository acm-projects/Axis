import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Component, NgZone, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { EditorModule } from '@tinymce/tinymce-angular';
import { environment} from '../../../environments/environment';


@Component({
  selector: 'app-essay-bot',
  imports: [NgFor, NgIf, FormsModule, EditorModule],
  templateUrl: './essay-bot.component.html',
  styleUrl: './essay-bot.component.css',
  standalone: true
})
export class EssayBotComponent implements OnInit{
  chatLog: string[];
  message: string;
  apiUrl = "http://localhost:8080/api/essay";

  document: any;
  essayText: string = "";
  essayTitle: string = "";

  editorConfig = {
    height: 700,
    menubar: false,
    skin: 'oxide-dark',
    content_css: 'dark',
    content_style: `
    body {
      background-color: #1f1f1f;
      color: #fff;
      font-family: Satoshi, sans-serif;
      line-height: 0.74;
      font-size: 16px;
      padding-top: 0.5px;
      padding-left: 12px;
    },
    p {
      color: #131313;
    }
  `,
    toolbar:
      'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    setup: (editor: any) => {
      editor.on('init', () => {
        const style = document.createElement('style');
        style.innerHTML = `
        .tox-editor-container, .tox-editor-header, .tox-toolbar, .ng-untouched, .tox, .tox-toolbar__group, .tox-tbtn, .tox-statusbar, .tox-statusbar__text-container, .tox-toolbar-overlord {
          background-color: #131313 !important;
        }
        .tox-statusbar__branding, .tox-statusbar__path-item {
          display: none !important;
        }
        .tox-editor-container, .tox {
          border: none !important;
        }
        .tox .tox-toolbar__primary {
          color: white !important;
        }
        .tox .tox-button svg {
          fill: white !important;
        }
      `;
        document.head.appendChild(style);
      });
    }
  };



  constructor (private http: HttpClient,
               private zone: NgZone,
               private router: Router) {
    this.chatLog = ["Hi, I am chat! How can I help?"]
    this.message=""
    const nav = this.router.getCurrentNavigation();
    this.document = nav?.extras.state?.['document'];

  }

  ngOnInit() {
    if (this.document) {
      this.loadDocumentText();
      this.essayTitle = this.document.filename;
    } else {
      console.error("Document not found in navigation state.");
    }
  }

  loadDocumentText() {
    const { student_email, college_id, filename } = this.document;
    console.log("hit the load document method" + " " + student_email + " " + college_id + " " + filename);
    this.http.get('http://localhost:8080/api/documents/getFileText', {
      responseType: 'text',
      params: {
        student_email,
        college_id: college_id.toString(),
        filename
      }
    }).subscribe({
      next: text => this.essayText = text,
      error: err => {
        console.error('Could not load essay:', err);
        this.essayText = '[Failed to load document]';
      }
    });

  }


  async saveEditedText() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText(this.essayText, { x: 50, y: 700, size: 12, font });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = new File([blob], this.document.filename);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("studentEmail", this.document.student_email);
    formData.append("collegeID", this.document.college_id.toString());

    this.http.post('/api/documents/uploadToS3', formData).subscribe({
      next: () => alert('PDF updated!'),
      error: err => console.error('Upload failed:', err)
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
