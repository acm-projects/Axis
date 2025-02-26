package com.acm.Axis.features.student;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;


@Repository
public class StudentRepository {
    private static final Logger log = LoggerFactory.getLogger(StudentRepository.class);
    private final JdbcClient jdbcClient;

    public StudentRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }


    public List<Student> getAll() {
        return jdbcClient.sql("SELECT * FROM students").query(Student.class).list();
    }

    public Optional<Student> findByEmail(String email) {
        return jdbcClient.sql("SELECT * FROM students WHERE email = :email")
                .param("email", email)
                .query(Student.class)
                .optional();
    }

    public void create(Student student) {
        var created = jdbcClient.sql("INSERT INTO students(email, first_name, last_name, phone_number, GPA, sat_score, act_score) VALUES(?, ?, ?, ?, ?, ?, ?)")
                .params(List.of(student.email(), student.first_name(), student.last_name(), student.phone_number(), student.gpa(), student.sat_score(), student.act_score()))
                .update();
        Assert.state(created == 1, "Failed to insert student");
    }
    public void update(Student student, String email) {
        var updated = jdbcClient.sql("UPDATE students SET email = ?, first_name = ?, last_name = ?, phone_number = ?, GPA = ?, sat_score = ?, act_score = ? WHERE email = ?")
                .params(List.of(student.email(), student.first_name(), student.last_name(), student.phone_number(), student.gpa(), student.sat_score(), student.act_score(), email))
                .update();
        Assert.state(updated == 1, "Failed to update student");
    }
    public void delete(String email) {
        var deleted = jdbcClient.sql("DELETE FROM Students WHERE email = :email")
                .param("email", email)
                .update();
        Assert.state(deleted == 1, "Failed to delete student");
    }
    public int count() {
        return jdbcClient.sql("SELECT COUNT(*) FROM students").query().listOfRows().size();
    }


}
