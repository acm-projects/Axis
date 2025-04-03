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

    @GetMapping("")
    public ResponseEntity<String> getAllFiles(
            @RequestParam(required = false, defaultValue = "ipfs") String network,
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset) {
        try {
            String files = pinataService.getAllFiles(network, limit, offset);
            System.out.println("Something is happening: " + files);
            return ResponseEntity.ok(files);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error retrieving files: " + e.getMessage());
        }
    }
    /*
    @GetMapping("")
    public ResponseEntity<String> authTest () {
        try {
            String res = pinataService.testAuth();
            System.out.println(res);
            return ResponseEntity.ok(res);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error retrieving files: " + e.getMessage());
        }
    }
    */

}