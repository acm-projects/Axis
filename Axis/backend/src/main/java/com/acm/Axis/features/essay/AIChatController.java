package com.acm.Axis.features.essay;

import com.acm.Axis.features.documents.Document;
import com.acm.Axis.features.documents.S3Service;
import com.acm.Axis.features.documents.DocumentRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import org.springframework.http.codec.ServerSentEvent;


import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api/essay")
public class AIChatController {

    private final ChatClient chatClient;
    private final S3Service s3Service;
    private final DocumentRepository documentRepository;

    public AIChatController(ChatClient.Builder builder, S3Service s3Service, DocumentRepository documentRepository) {
        this.s3Service = s3Service;
        this.chatClient = builder.build();
        this.documentRepository = documentRepository;
    }

    @PostMapping("/postMessage")
    public String chat(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }

    @PostMapping("/postEssay")
    public String getEssayFeedback(@RequestParam String studentEmail,
                                   @RequestParam int collegeId,
                                   @RequestParam String documentName) {

        try {
            // Retrieve the PDF file from S3
            InputStream s3FileStream = s3Service.getFileInputStream(studentEmail, collegeId, documentName);

            // Use PDFBox to load the document and extract text
            PDDocument pdfDocument = PDDocument.load(s3FileStream);
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String essayText = pdfStripper.getText(pdfDocument);
            pdfDocument.close();

            // Build the prompt text including the extracted essay content
            // String promptText = "Help me make this better: " + essayText;
            String promptText = "Summarize this text in 1 sentence: " + essayText;

            // Send the prompt text to the chat API
            String content = chatClient.prompt()
                    .user(promptText)
                    .call()
                    .content();

            return content;
        } catch (IOException e) {
            return "Failed to process essay: " + e.getMessage();
        }
    }

    @GetMapping("/getFlux")
    public Flux<ServerSentEvent<String>> getEssayFeedback(@RequestParam int document_id,
                                         @RequestParam String message,
                                         @RequestParam String context) {
        try {
            Document currentDoc = documentRepository.getByID(document_id);
            System.out.println(currentDoc.student_email());
            System.out.println(currentDoc.document_name());
            System.out.println(context);
            // Retrieve the PDF file from S3
            InputStream s3FileStream = s3Service.getFileInputStream(currentDoc.student_email()
                    , currentDoc.college_id(), currentDoc.document_name());

            // Use PDFBox to load the document and extract text
            PDDocument pdfDocument = PDDocument.load(s3FileStream);
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String essayText = pdfStripper.getText(pdfDocument);
            pdfDocument.close();

            // Send the prompt text to the chat API
            return chatClient.prompt()
                    .system(spec -> spec
                            .text("Look at this document {document}. Answer in the style of a {role}. Additional context: {context}")
                            .param("role", "advisor for highschool students applying for colleges")
                            .param("context", context)
                            .param("document", essayText)
                    )
                    .user(message)
                    .stream()
                    .content()
                    .map(data -> ServerSentEvent.builder(data).build()) // Wrap data in SSE events
                    .concatWith(Flux.just(
                            ServerSentEvent.builder("[END]").event("end").build() // Final event
                    ));
        } catch (Exception e) {
            return Flux.just(
                    ServerSentEvent.builder("Failed to process essay: " + e.getMessage())
                            .event("error")
                            .build()
            );

        }
    }
}
