import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-upload-overlay',
  templateUrl: './add-document.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DocumentUploadOverlayComponent {
  @Input() isVisible = false;
  @Output() closed = new EventEmitter<void>();
  @Output() uploaded = new EventEmitter<void>();

  selectedFile: File | null = null;
  studentEmail = '';
  collegeId = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  close() {
    this.isVisible = false;
    this.isLoading = false
    this.closed.emit();
  }

  upload() {
    if (!this.selectedFile || !this.studentEmail || !this.collegeId) {return;}

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('studentEmail', this.studentEmail);
    formData.append('collegeID', this.collegeId);

    this.isLoading = true;
    this.http.post("http://localhost:8080/api/documents/uploadToS3", formData, {
      responseType: 'text'
    }).subscribe({

      next: (res) => {
        console.log("Upload success:", res);
        alert("Document uploaded successfully!");
        this.uploaded.emit();
        this.close();
      },
      error: (err) => {
        console.error("Upload error:", err); // ✅ Print full error
        alert("Document upload failed!");
      },
      complete: () => {
        this.isLoading = false;
      }
    });


  }






}
