package com.acm.Axis.features.essay;


import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/essay/ai/")
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @PostMapping("")
    Map<String, String> completeEssay(@RequestBody Prompt prompt) {
        return Map.of("completion", chatClient.prompt().user(prompt.message()));
    }

}
