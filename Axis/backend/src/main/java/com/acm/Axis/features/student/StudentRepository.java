package com.acm.Axis.features.student;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.ArrayList;
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
        return jdbcClient.sql("SELECT email, first_name, last_name, phone_number, gpa, sat_score, act_score, password FROM students WHERE email = :email")
                .param("email", email)
                .query((rs, rowNum) -> new Student(
                        rs.getString("email"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("phone_number"),
                        rs.getDouble("gpa"),
                        rs.getInt("sat_score"),
                        rs.getInt("act_score"),
                        rs.getString("password")
                ))
                .optional();
    }


    public void create(Student student) {
        if (!student.password().startsWith("$2a$")) { // ✅ Check if password is already hashed
            throw new IllegalStateException("Password must be hashed before saving!");
        }

        List<Object> queryParams = new ArrayList<Object>();
        queryParams.add(student.email());
        queryParams.add(student.first_name());
        queryParams.add(student.last_name());
        queryParams.add(student.phone_number());
        queryParams.add(student.gpa());
        queryParams.add(student.sat_score());
        queryParams.add(student.act_score());
        queryParams.add(student.password());

        var created = jdbcClient.sql("""
            INSERT INTO students(email, first_name, last_name, phone_number, gpa, sat_score, act_score, password) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?)
            """)
                .params(queryParams).update();
        Assert.state(created == 1, "Failed to insert student");
    }


    public void update(Student student, String email) {
        var updated = jdbcClient.sql("""
                UPDATE students SET email = ?, first_name = ?, last_name = ?, phone_number = ?, gpa = ?, 
                sat_score = ?, act_score = ?, password = ? WHERE email = ?
                """)
                .params(List.of(student.email(), student.first_name(), student.last_name(), student.phone_number(),
                        student.gpa(), student.sat_score(), student.act_score(), student.password(), email)) // ✅ Update password
                .update();
        Assert.state(updated == 1, "Failed to update student");
    }

    public void delete(String email) {
        var deleted = jdbcClient.sql("DELETE FROM students WHERE email = :email")
                .param("email", email)
                .update();
        Assert.state(deleted == 1, "Failed to delete student");
    }
}
