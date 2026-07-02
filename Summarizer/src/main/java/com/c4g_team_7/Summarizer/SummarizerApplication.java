package com.c4g_team_7.Summarizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@SpringBootApplication
@RestController
public class SummarizerApplication {

    private static final String API_KEY = "put your key here";

    public static void main(String[] args) {
        SpringApplication.run(SummarizerApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Summarizer App</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                input[type="text"] { width: 300px; padding: 8px; font-size: 16px; }
                #result { margin-top: 20px; font-weight: bold; white-space: pre-wrap; }
            </style>
        </head>
        <body>
            <h2>Ask Question</h2>
            <form id="aiForm">
                <input type="text" id="question" placeholder="Type your question and press Enter..." required>
            </form>
            <div id="result"></div>

            <script>
                document.getElementById('aiForm').addEventListener('submit', function(e) {
                    e.preventDefault(); 
                    const question = document.getElementById('question').value;
                    const resultDiv = document.getElementById('result');
                    
                    resultDiv.textContent = "Thinking...";
                    
                    fetch('/ask?question=' + encodeURIComponent(question))
                        .then(response => response.text())
                        .then(data => {
                            resultDiv.textContent = data;
                        })
                        .catch(error => {
                            resultDiv.textContent = "Error fetching response.";
                            console.error(error);
                        });
                });
            </script>
        </body>
        </html>
        """;
    }


    @GetMapping("/ask")
    public String askAI(@RequestParam String question) {
        String escapedQuestion = question.replace("\"", "\\\""); 
        String jsonBody = "{"
                + "\"model\": \"openrouter/free\","
                + "\"messages\": ["
                + "  {"
                + "    \"role\": \"user\","
                + "    \"content\": \"" + escapedQuestion + "\""
                + "  }"
                + "]"
                + "}";

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://openrouter.ai/api/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body(); 
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Error calling OpenRouter API: " + e.getMessage();
        }
    }
}