package com.acm.Axis.features.documents;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class DocumentRepository {

    private static final Logger log = LoggerFactory.getLogger(DocumentRepository.class);
    private final JdbcClient jdbcClient;
    private final S3Service s3Service;
    public DocumentRepository(JdbcClient jdbcClient, S3Service s3Service) {
        this.jdbcClient = jdbcClient;
        this.s3Service = s3Service;
    }


    public Document getByID(int document_id) {
        return jdbcClient.sql("SELECT * FROM documents WHERE application_id = :id")
                .param("id", document_id)
                .query(Document.class)
                .single();
    }

    public List<Document> getByEmail(String email) {
        return jdbcClient.sql("SELECT * FROM documents WHERE student_email = ?")
                .params(List.of(email))
                .query(Document.class)
                .list();
    }

    public List<Map<String, String>> getDocumentsWithCollegeName(String student_email) {
        return jdbcClient.sql("""
        SELECT d.student_email, d.college_id, d.document_name, c.name AS college_name
        FROM documents d
        JOIN colleges c ON d.college_id = c.college_id
        WHERE d.student_email = ?
    """)
                .params(List.of(student_email))
                .query((rs, rowNum) -> Map.of(
                        "student_email", rs.getString("student_email"),
                        "college_id", String.valueOf(rs.getInt("college_id")),
                        "filename", rs.getString("document_name"),
                        "college_name", rs.getString("college_name"),
                        "fileUrl", s3Service.getFileUrl(rs.getString("student_email"), rs.getInt("college_id"), rs.getString("document_name"))
                ))
                .list();
    }


    public List<Document> getByEmailAndCollegeID(String email, Integer college_id) {
        return jdbcClient.sql("SELECT * FROM documents WHERE student_email = ? AND college_id = ?")
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

}