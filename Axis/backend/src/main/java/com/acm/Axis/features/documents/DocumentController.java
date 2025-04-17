package com.acm.Axis.features.documents;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final S3Service s3Service;
    private final DocumentRepository documentRepository;

    DocumentController(S3Service s3Service, DocumentRepository documentRepository) {
        this.s3Service = s3Service;
        this.documentRepository = documentRepository;
    }

    @PostMapping("/uploadToS3")
    public ResponseEntity<String> uploadDocument(@RequestParam("file") MultipartFile file,
                                                 @RequestParam("studentEmail") String studentEmail,
                                                 @RequestParam("collegeID") String collegeID) {
        try {
            System.out.println("Uploading file: " + file.getOriginalFilename());
            String fileUrl = s3Service.uploadFile(file, studentEmail, collegeID);

            String fileName = file.getOriginalFilename();

            int collegeIdInt = Integer.parseInt(collegeID);
            Document document = new Document(-1, studentEmail, collegeIdInt, fileName);

            documentRepository.uploadDocument(document);

            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }

    @PostMapping("/uploadAndGetId")
    public ResponseEntity<String> uploadDocumentAndGetId(@RequestParam("file") MultipartFile file,
                                                 @RequestParam("studentEmail") String studentEmail,
                                                 @RequestParam("collegeID") String collegeID) {
        try {
            s3Service.uploadFile(file, studentEmail, collegeID);

            String fileName = file.getOriginalFilename();

            int collegeIdInt = Integer.parseInt(collegeID);
            Document document = new Document(-1, studentEmail, collegeIdInt, fileName);
            System.out.println(fileName);
            long documentId = documentRepository.uploadDocumentAndGetId(document);
            System.out.println(documentId);
            return ResponseEntity.ok(String.valueOf(documentId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }


    //    GET THE INFORMATION FROM THE LOCAL DATABASE
    @GetMapping("/get/{document_id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable int document_id) {
        Document document = documentRepository.getByID(document_id);
        return ResponseEntity.ok(document);
    }


    @GetMapping("/getDocuments/{student_email}")
    public ResponseEntity<List<Document>> getDocumentByEmail(@PathVariable String student_email) {
        List<Document> documents = documentRepository.getByEmail(student_email);
        return ResponseEntity.ok(documents);
    }

//    @GetMapping("/get/{student_email}/{college_id}")
//    public ResponseEntity<List<Document>> getDocumentByEmailAndCollegeID(@PathVariable String student_email, @PathVariable int college_id) {
//        List<Document> documents = documentRepository.getByEmailAndCollegeID(student_email, college_id);
//        return ResponseEntity.ok(documents);
//    }

}
