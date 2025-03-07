package com.acm.Axis.features.essay;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/essay")
public class ChatController {

    private final ChatClient chatClient;
    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder
                .build();
    }

    @PostMapping("")
    public String chat(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }

    @GetMapping("")
    public Flux<String> chatWithStream(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .stream()
                .content();
    }

}
