package com.acm.Axis.features.bookmark;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
import java.util.List;

@Repository
public class BookmarkRepository {

    private final JdbcClient jdbcClient;

    public BookmarkRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }


    public List<Bookmark> getBookmarks(String email) {
        String sql = "SELECT id, bookmark_type FROM bookmarks WHERE student_email = :email";
        return jdbcClient.sql(sql)
                .param("email", email)
                .query(Bookmark.class)
                .list();
    }
    public List<Bookmark> getCollegeBookmarks(String email) {
        String sql = "SELECT id, bookmark_type FROM bookmarks WHERE student_email = :email AND bookmark_type = 'college'";
        return jdbcClient.sql(sql)
                .param("email", email)
                .query(Bookmark.class)
                .list();
    }

    public List<Bookmark> getScholarshipBookmarks(String email) {
        String sql = "SELECT id, bookmark_type FROM bookmarks WHERE student_email = :email AND bookmark_type = 'scholarship'";
        return jdbcClient.sql(sql)
                .param("email", email)
                .query(Bookmark.class)
                .list();
    }

    public void addBookmarkScholarship(String student_email, Long id) {
        jdbcClient.sql("INSERT INTO bookmarks (student_email, id, bookmark_type) VALUES (?, ?, ?)")
                .params(student_email, id, "scholarship")
                .update();
    }

    public void addBookmarkCollege(String student_email, Long id) {
        jdbcClient.sql("INSERT INTO bookmarks (student_email, id, bookmark_type) VALUES (?, ?, ?)")
                .params(student_email, id, "college")
                .update();
    }


    public void removeBookmarkCollege(String student_email, Long id) {
        jdbcClient.sql("DELETE FROM bookmarks WHERE student_email = ? AND id = ? AND bookmark_type = 'college'")
                .params(student_email, id)
                .update();
    }

    public void removeBookmarkScholarship(String student_email, Long id) {
        jdbcClient.sql("DELETE FROM bookmarks WHERE student_email = ? AND id = ? AND bookmark_type = 'scholarship'")
                .params(student_email, id)
                .update();
    }

}
