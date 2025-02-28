package com.acm.Axis.features.essay;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/essay/ai/")
public class aiController {

    @PostMapping("")
    Map<String, String> completeEssay(@RequestBody String prompt) {
        return Map.of("completion", "your prompt is " + prompt);
    }

}
