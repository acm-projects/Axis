package com.acm.Axis.features.chats;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public class ChatRepository {

    private final JdbcClient jdbcClient;

    public ChatRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }


    public List<ChatMessage> getByDocumentId(@RequestParam Integer document_id) {
        return jdbcClient.sql("SELECT * FROM chats WHERE document_id = :document_id")
                .param("document_id", document_id)
                .query(ChatMessage.class)
                .list();
    }


    public void create(ChatMessage chat) {
        var created = jdbcClient.sql("INSERT INTO chats (document_id, student_email, message_text, timestamp) VALUES(?, ?, ?, ?)")
                .params(List.of(chat.document_id(), chat.student_email(), chat.message_text(), chat.timestamp()))
                .update();
    }

}
