package com.acm.Axis.features.chats;

import java.time.LocalDateTime;

public class ChatMessage {
    private Integer document_id;
    private String student_email;
    private String message_text;
    private LocalDateTime timestamp;
    private String response_text;

    public ChatMessage(Integer document_id, String student_email, String message_text, LocalDateTime timestamp, String response_text) {
        this.document_id = document_id;
        this.student_email = student_email;
        this.message_text = message_text;
        this.timestamp = timestamp;
        this.response_text = response_text;
    }

    public Integer getDocument_id() {
        return document_id;
    }

    public void setDocument_id(Integer document_id) {
        this.document_id = document_id;
    }

    public String getStudent_email() {
        return student_email;
    }

    public void setStudent_email(String student_email) {
        this.student_email = student_email;
    }

    public String getMessage_text() {
        return message_text;
    }

    public void setMessage_text(String message_text) {
        this.message_text = message_text;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getResponse_text() {
        return response_text;
    }

    public void setResponse_text(String response_text) {
        this.response_text = response_text;
    }
}