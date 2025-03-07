package com.acm.Axis.features.chats;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    private final ChatMessageRepository chatRepository;

    public ChatController(ChatMessageRepository chatRepository) {
        this.chatRepository = chatRepository;
    }


    @GetMapping("/get/{document_id}/{user_email}")
    public List<ChatMessage> getChatMessages(@PathVariable Integer document_id, @PathVariable String user_email) {
        List<ChatMessage> chatHistoryInRepo = chatRepository.getDocumentChatMessages(user_email, document_id);

        /* OPTIONAL
        * We are converting each object in table to like so, then joining them all tohether to form many User and AI messages
        *          Chat {
        *               message_id
        *               doc_id                        User: <message>
        *               email             ----->      AI:   <response>
        *               message
        *               response
        *               timestamp
        *          }
        * */

        // OPTIONAL DEPENDS ON USE CASE
//        String formattedHistory = chatHistoryInRepo
//                .stream()
//                .map(msg -> "User: " + msg.message_text() + "\nAI: " + msg.response_text())
//                .collect(Collectors.joining("\n"));

        return chatHistoryInRepo;

    }


    @PostMapping("/post/{document_id}/{user_email}")
    public void postChat(@PathVariable Integer document_id, @PathVariable String user_email, @RequestBody List<ChatMessage> chats) {
        List<ChatMessage> chatHistoryInRepo = chatRepository.getDocumentChatMessages(user_email, document_id);

        chats.forEach(chat -> {
            chat.setDocumentId(document_id);
            chat.setStudentEmail(user_email);
        });

        chatRepository.postChats(chats);
        return ResponseEntity.ok().build();
    }





}
