package com.acm.Axis.features.documents;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Repository
public class DocumentRepository {

    private static final Logger log = LoggerFactory.getLogger(DocumentRepository.class);
    private final JdbcClient jdbcClient;
    public DocumentRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }


    public Document getByID(int document_id) {
        try {
            return jdbcClient.sql("SELECT * FROM documents WHERE document_id = :id")
                    .param("id", document_id)
                    .query(Document.class)
                    .single();
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    public List<Document> getByEmail(String email) {
        return jdbcClient.sql("SELECT * FROM documents WHERE student_email = ?")
                .params(List.of(email))
                .query(Document.class)
                .list();
    }

    public List<Document> getByEmailAndCollegeID(String email, Integer college_id) {
        return jdbcClient.sql("SELECT * FROM applications WHERE student_email = ? AND college_id = ?")
                .params(List.of(email, college_id))
                .query(Document.class)
                .list();
    }

    public void uploadDocument(Document document) {
        var created = jdbcClient.sql("INSERT INTO documents(student_email, college_id, document_name) VALUES(?, ?, ?)")
                .params(List.of(document.student_email(), document.college_id(), document.document_name()))
                .update();
        Assert.state(created == 1, "Failed to insert student");
    }

    public long uploadDocumentAndGetId(Document document) {

        Long documentId = jdbcClient.sql(
                        "INSERT INTO documents(student_email, college_id, document_name) VALUES (?, ?, ?) RETURNING document_id"
                )
                .params(List.of(document.student_email(), document.college_id(), document.document_name()))
                .query(Long.class)
                .single();
        System.out.println(documentId);
        Assert.notNull(documentId, "Failed to retrieve document_id");
        return documentId;
    }


}