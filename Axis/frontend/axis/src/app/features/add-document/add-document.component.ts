import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollegeService} from '../../core/services/college.service';

@Component({
  selector: 'app-upload-overlay',
  templateUrl: './add-document.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DocumentUploadOverlayComponent implements OnInit {
  @Input() isVisible = false;
  @Output() closed = new EventEmitter<void>();
  @Output() uploaded = new EventEmitter<void>();
  // selecting college part
  listOfColleges: {collegeId: string; name: string}[]  = [];
  filteredColleges: {collegeId: string; name: string}[]  = [];
  searchTerm = '';
  // // the college id is stored in a var below

  // file naming
  customFileName: string = '';
  renameTimeout: any;

  // to be sent to post request
  selectedFile: File | null = null;
  studentEmail = '';
  collegeId = '';
  isLoading = false;

  constructor(private http: HttpClient, private collegeService: CollegeService) {}

  ngOnInit() {
    this.collegeService.getColleges().subscribe({
      next: (res) => {
        this.listOfColleges = res;
      },
      error: (err) => {
        console.error("Error:", err);
      },
      complete: () => {
        console.log("Colleges loaded (cached if previously loaded)");
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files?.[0] || null;
      this.customFileName = this.selectedFile?.name || '';
    }
  }

  onCustomFileNameChange(newName: string) {
    this.customFileName = newName;

    if (this.renameTimeout) {
      clearTimeout(this.renameTimeout);
    }

    this.renameTimeout = setTimeout(() => {
      if (this.selectedFile && this.customFileName.trim()) {
        const renamed = this.renameFile(this.selectedFile, this.customFileName.trim());
        this.selectedFile = renamed;
        console.log('Renamed file to:', renamed);
      }
    }, 500); //debounce
  }

  renameFile(file: File, newName: string): File {
    const extension = file.name.split('.').pop();
    return new File([file], `${newName}.${extension}`, { type: file.type });
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
        console.error("Upload error:", err);
        alert("Document upload failed!");
      },
      complete: () => {
        this.isLoading = false;
      }
    });


  }






}
