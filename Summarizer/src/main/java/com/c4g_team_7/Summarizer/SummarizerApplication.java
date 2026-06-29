package com.c4g_team_7.Summarizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class SummarizerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SummarizerApplication.class, args);
    }

    @GetMapping("/")
    String home() {
        return "Hello, this is Ammar.";
    }
}