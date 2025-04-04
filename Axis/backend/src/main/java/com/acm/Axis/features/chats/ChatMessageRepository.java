package com.acm.Axis.features.chats;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChatMessageRepository {

    private final JdbcClient jdbcClient;

    public ChatMessageRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<ChatMessage> getDocumentChatMessages(String user_email, Integer document_id) {
        String sql = "SELECT message_id, document_id, student_email, message_text, response_text, timestamp " +
                "FROM chats WHERE student_email = ? AND document_id = ? ORDER BY timestamp ASC";

        return jdbcClient.sql(sql).params(List.of(user_email, document_id)).query(ChatMessage.class).list();
    }

    public void postChatAndResponse(ChatMessage chat) {
        String sql = "INSERT INTO chats (document_id, student_email, message_text, response_text, timestamp) VALUES (?, ?, ?, ?, ?)";
        jdbcClient.sql(sql).params(List.of(chat.getDocument_id(), chat.getStudent_email(), chat.getMessage_text(), chat.getResponse_text(), chat.getTimestamp())).update();
    }

    public void postChatsAndResponses(List<ChatMessage> chats) {
        String sql = "INSERT INTO chats (document_id, student_email, message_text, response_text, timestamp) VALUES (?, ?, ?, ?, ?)";
        for (ChatMessage chat: chats) {
            jdbcClient.sql(sql).params(List.of(chat.getDocument_id(), chat.getStudent_email(), chat.getMessage_text(), chat.getResponse_text(), chat.getTimestamp())).update();
        }
    }


    //    set chat and responses

}
