package com.acm.Axis.features.documents;

public record Document(
        int document_id,
        String student_email,
        int college_id,
        String document_name
) {
}
