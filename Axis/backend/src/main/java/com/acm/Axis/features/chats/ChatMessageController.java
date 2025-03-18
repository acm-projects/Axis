package com.acm.Axis.features.chats;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatMessageController {

    private final ChatMessageRepository chatRepository;

    public ChatMessageController(ChatMessageRepository chatRepository) {
        this.chatRepository = chatRepository;
    }


    @GetMapping("/get/{document_id}/{user_email}")
    public List<ChatMessage> getChatMessages(@PathVariable Integer document_id, @PathVariable String user_email) {

        try {
            return chatRepository.getDocumentChatMessages(user_email, document_id);
        } catch (Exception e) {
            e.printStackTrace();
        }


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

        return null;
    }


    @PostMapping("/post/{document_id}/{user_email}")
    public void postChat(@PathVariable Integer document_id, @PathVariable String user_email, @RequestBody List<ChatMessage> chats) {
        List<ChatMessage> chatHistoryInRepo = chatRepository.getDocumentChatMessages(user_email, document_id);

        chats.forEach(chat -> {
            chat.setDocument_id(document_id);
            chat.setStudent_email(user_email);
        });

        chatRepository.postChatsAndResponses(chats);
    }


}
