package com.acm.Axis.features.documents;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
            String fileUrl = s3Service.uploadFile(file, studentEmail, collegeID);

            String fileName = file.getOriginalFilename();

            int collegeIdInt = Integer.parseInt(collegeID);
            Document document = new Document(studentEmail, collegeIdInt, fileName);

            documentRepository.uploadDocument(document);

            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }


    //    GET THE INFORMATION FROM THE LOCAL DATABASE
    @GetMapping("/getByID/{document_id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable int document_id) {
        Document document = documentRepository.getByID(document_id);
        return ResponseEntity.ok(document);
    }


    @GetMapping("/getByEmail/{student_email}")
    public ResponseEntity<List<Map<String, String>>> getDocumentByEmailAndCollegeID(@PathVariable String student_email) {
        System.out.println("hitting the get doc enpoint");
        List<Document> rawDocs = documentRepository.getByEmail(student_email);
        List<Map<String, String>> docsWithUrls = rawDocs.stream().map(doc -> {
            String fileUrl = s3Service.getFileUrl(doc.student_email(), doc.college_id(), doc.document_name());
            return Map.of(
                    "student_email", doc.student_email(),
                    "college_id", String.valueOf(doc.college_id()),
                    "filename", doc.document_name(),
                    "fileUrl", fileUrl
            );
        }).toList();

        return ResponseEntity.ok(docsWithUrls);

    }

    @GetMapping("/getGroupedByCollege/{student_email}")
    public ResponseEntity<Map<String, List<Map<String, String>>>> getDocumentsGrouped(@PathVariable String student_email) {
        List<Map<String, String>> documents = documentRepository.getDocumentsWithCollegeName(student_email);

        Map<String, List<Map<String, String>>> grouped = documents.stream()
                .collect(Collectors.groupingBy(doc -> doc.get("college_name")));

        return ResponseEntity.ok(grouped);
    }



    @GetMapping("/getByEmailAndCollegeID/{student_email}/{college_id}")
    public ResponseEntity<List<Document>> getDocumentByEmailAndCollegeID(@PathVariable String student_email, @PathVariable int college_id) {
        List<Document> documents = documentRepository.getByEmailAndCollegeID(student_email, college_id);
        return ResponseEntity.ok(documents);
    }

}
