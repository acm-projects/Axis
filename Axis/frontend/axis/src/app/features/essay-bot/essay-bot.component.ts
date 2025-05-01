import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Component, NgZone, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { EditorModule } from '@tinymce/tinymce-angular';
import html2pdf from 'html2pdf.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';




@Component({
  selector: 'app-essay-bot',
  imports: [NgFor, NgIf, FormsModule, EditorModule],
  templateUrl: './essay-bot.component.html',
  styleUrl: './essay-bot.component.css',
  standalone: true
})
export class EssayBotComponent implements OnInit{
  chatLog: { role: 'user' | 'assistant'; content: string | SafeHtml }[] = [
    { role: 'assistant', content: 'Hi, I\'m BRYCE! How can I help?' }
  ];

  message: string = "";
  apiUrl = "http://localhost:8080/api/essay";
  document: any;
  essayText: string = "";
  essayTitle: string = "";
  student_email: string = "";
  college_id: number = -1;
  loadingDotsInterval: any = null;
  isTitleLoading: boolean = true;


  editorConfig = {
    height: 700,
    menubar: false,
    skin: 'oxide-dark',
    content_css: 'dark',
    content_style: `
    body {
      background: transparent !important;
      font-family: 'Satoshi', sans-serif;
      font-size: 16px;
      padding: 16px;
      padding-top: 64px;
      border: none;
      text-shadow: 1px 1px 3px rgba(0, 0,0, 0.5);
    }
    p {
      margin: 0 0 10px;
    }
  `,
    toolbar:
      'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    setup: (editor: any) => {
      editor.on('init', () => {
        const style = document.createElement('style');
        style.innerHTML = `
      .tox-editor-container {
        border: none !important;
        background-color: transparent !important;
      }

      .tox-editor-header {
        position: absolute !important;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        background-color: rgba(30, 30, 30, 0.8) !important;
        backdrop-filter: blur(8px);
        border: none;
      }

      .tox-sidebar-wrap,
      .tox-edit-area,
      .tox-edit-area__iframe {
        background: transparent !important;
        border: none !important;
      }

      .tox-statusbar,
      .tox-bottom-anchorbar,
      .tox-anchorbar,
      .tox-throbber,
      .tox-view-wrap {
        display: none !important;

      }

      .tox tox-tinymce tox-edit-focus,
      .tox tox-tinymce tox-platform-touch,
      .ng-untouched ng-valid ng-dirty {
        border: none !important;
        border-radius: 0px !important;
      }

      .tox-tinymce {
        border: none !important;
        border-radius: 0px !important;
      }

      .tox-editor-header {
        border-radius: 15px;

      }


      .tox .tox-toolbar, .tox .tox-toolbar__overflow, .tox .tox-toolbar__primary, .tox, .tox-tbtn, .tox .tox-toolbar-overlord {
        background-color: rgba(0,0,0,0) !important;

      }

      .tox:not(.tox-tinymce-inline) .tox-editor-header {
        border-bottom: none;
      }

      .tox .tox-edit-area::before {
        border: none !important;
      }

    `;
        document.head.appendChild(style);
      });
    }
  };



  constructor (private http: HttpClient,
               private zone: NgZone,
               private router: Router,
               private sanitizer: DomSanitizer
  ) {
    const nav = this.router.getCurrentNavigation();
    this.document = nav?.extras.state?.['document'];

  }

  ngOnInit() {
    if (this.document) {
      this.loadDocumentText();
    } else {
      console.error("Document not found in navigation state.");
    }
  }

  loadDocumentText() {
    const { student_email, college_id, filename } = this.document;
    this.student_email = student_email;
    this.college_id = college_id;

    this.http.get('http://localhost:8080/api/documents/getFileText', {
      responseType: 'text',
      params: {
        student_email,
        college_id: college_id.toString(),
        filename
      }
    }).subscribe({
      next: text => {
        this.essayText = text;
        this.getTitleFromEssay(this.essayText);
      },
      error: err => {
        console.error('Could not load essay:', err);
        this.essayText = '[Failed to load document]';
      }
    });

  }
  getTitleFromEssay(essay: string) {
    const prompt = `Based on the following essay, give me a short and concise and suitable title that is max a couple of words and return nothing but the title. Here is the essay:\n${essay}`;

    this.http.post('http://localhost:8080/api/essay/postMessage', null, {
      params: {
        message: prompt
      },
      responseType: 'text'
    }).subscribe({
      next: response => {
        this.essayTitle = response.trim();
        this.isTitleLoading = false; // ✅ Stop loading animation
      },
      error: err => {
        console.error('Failed to get AI-generated title:', err);
        this.essayTitle = this.document.filename; // fallback title
        this.isTitleLoading = false; // ✅ Still stop loading animation
      }
    });
  }






  downloadEssay() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <div style="
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        font-size: 12pt;
        color: #000;
        max-width: 800px;
        padding: 20px;
      ">
        ${this.essayText}
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: this.document.filename || 'download.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(wrapper).set(opt).save();
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
    if (!this.message.trim()) return;

    const sentMessage = this.message;
    const context = this.chatLog.map(log => ({
      role: log.role,
      content: (log.content as string)
    }));

    this.chatLog.push({ role: 'user', content: sentMessage });
    this.message = '';

    // Start loading dots
    const loadingIndex = this.chatLog.push({ role: 'assistant', content: 'Thinking' }) - 1;
    let dotCount = 0;

    this.loadingDotsInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      const dots = '.'.repeat(dotCount);
      this.zone.run(() => {
        this.chatLog[loadingIndex].content = `Thinking${dots}`;
      });
    }, 400);

    // Start streaming AI response
    this.passUserMessage(sentMessage, context).subscribe({
      next: chunk => {
        this.zone.run(() => {
          if (this.loadingDotsInterval) {
            clearInterval(this.loadingDotsInterval);
            this.loadingDotsInterval = null;
            this.chatLog[loadingIndex].content = ''; // reset to empty
          }
          this.chatLog[loadingIndex].content += chunk;
        });
      },
      error: err => console.error('SSE error:', err),
      complete: () => {
        const raw = this.chatLog[loadingIndex].content as string;
        this.chatLog[loadingIndex].content = this.sanitizer.bypassSecurityTrustHtml(raw);
      }
    });
  }





  passUserMessage(message: string, context: {role: "user"|"assistant", content: string}[]): Observable<string> {
    return new Observable<string>(observer => {
      const jsonContext = JSON.stringify(context);

      const url = new URL(`${this.apiUrl}/getFlux`);
      url.searchParams.set('essayText', this.essayText);
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
