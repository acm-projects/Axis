package com.acm.Axis.features.college;

import com.acm.Axis.features.student.Student;
import com.acm.Axis.features.student.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Repository
public class CollegeRepository {

    private static final Logger log = LoggerFactory.getLogger(CollegeRepository.class);
    private final JdbcClient jdbcClient;

    public CollegeRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<College> getAll() {
        return jdbcClient.sql("SELECT * FROM colleges").query(College.class).list();
    }

    public Optional<College> findById(Integer id) {
        return jdbcClient.sql("SELECT * FROM colleges WHERE college_id = :id")
                .param("id", id)
                .query(College.class)
                .optional();
    }

    public void create(College college) {
        var created = jdbcClient.sql("INSERT INTO colleges (name) VALUES(:name)")
                .param("name", college.name())
                .update();
        Assert.state(created == 1, "Failed to insert student");
    }

    public void update(College college, Integer college_id) {
        var updated = jdbcClient.sql("UPDATE colleges SET name = ? WHERE college_id = ?")
                .params(List.of(college.name(), college_id))
                .update();
        Assert.state(updated == 1, "Failed to update student");
    }
    public void delete(Integer college_id) {
        var deleted = jdbcClient.sql("DELETE FROM colleges WHERE college_id = :college_id")
                .param("college_id", college_id)
                .update();
        Assert.state(deleted == 1, "Failed to delete student");
    }
    public int count() {
        return jdbcClient.sql("SELECT COUNT(*) FROM colleges").query().listOfRows().size();
    }




}
