package com.acm.Axis.features.essay;

import com.acm.Axis.features.documents.S3Service;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import com.acm.Axis.features.documents.DocumentRepository;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import com.acm.Axis.features.documents.Document;
import org.springframework.web.bind.annotation.*;
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
            String promptText = "Please analyze the following college essay, first, give me a sentence telling me what it's about, then give detailed feedback:\n" + essayText;

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
    public Flux<ServerSentEvent<String>> getEssayFeedback(@RequestParam String essayText,
                                                          @RequestParam String message,
                                                          @RequestParam String context) {
        try {
            // Send the prompt text to the chat API
            return chatClient.prompt()
                    .system(spec -> spec
                            .text("""
You are a college admissions advisor. Respond as concisely as possible trying to stay under 200 words, but if need be you can go over that.

I want your response to be formatted with multiple headings and body text only; for each heading and body, i want it in the following format:

\n<div>
<h1 class='text-md font-bold pb-1'></h1>
<p class='text-md'></p>
</div>

so the resulting html should look like a couple of these above


I want your response to be formatted as follows:
The response should only consist of headings and body text so that the template above is easy to follow.

Essay:
{document}

Context:
{context}
""")

                            .param("role", "advisor for highschool students applying for colleges")
                            .param("context", context)
                            .param("document", essayText)
                    )
                    .user(message)
                    .stream()
                    .content()
                    .map(data -> ServerSentEvent.builder(data).build())
                    .concatWith(Flux.just(
                            ServerSentEvent.builder("[END]").event("end").build()
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
