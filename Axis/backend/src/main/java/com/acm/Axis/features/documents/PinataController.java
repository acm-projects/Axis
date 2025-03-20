package com.acm.Axis.features.documents;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/documents")
public class PinataController {

    private final PinataService pinataService;

    public PinataController(PinataService pinataService) {
        this.pinataService = pinataService;
    }

    @PostMapping("")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Convert MultipartFile to File
            File tempFile = new File(file.getOriginalFilename());
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(file.getBytes());
            }

            // Upload to Pinata
            String ipfsHash = pinataService.uploadFileToPinata(tempFile);

            // Delete temp file
            tempFile.delete();

            return ResponseEntity.ok("File uploaded to IPFS: " + ipfsHash);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }
    }
}