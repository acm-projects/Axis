package com.acm.Axis.features.chats;

import java.util.Date;

public record Chat(
        int message_id,
        int document_id,
        String student_email,
        String message_text,
        Date timestamp
) {
}
