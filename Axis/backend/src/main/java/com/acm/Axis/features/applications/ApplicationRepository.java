package com.acm.Axis.features.applications;

import com.acm.Axis.features.student.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Repository
public class ApplicationRepository {

    private static final Logger log = LoggerFactory.getLogger(ApplicationRepository.class);
    private final JdbcClient jdbcClient;
    public ApplicationRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Application> getAll() {
        return jdbcClient.sql("SELECT * FROM applications").query(Application.class).list();
    }

    public Optional<Application> findByApplicationId(Integer id) {
        return jdbcClient.sql("SELECT * FROM applications WHERE application_id = :id")
                .param("id", id)
                .query(Application.class)
                .optional();
    }

    public Optional<Application> findByEmailAndCollegeId(String email, Integer college_id) {
        return jdbcClient.sql("SELECT * FROM applications WHERE student_email = ? AND college_id = ?")
                .params(List.of(email, college_id))
                .query(Application.class)
                .optional();
    }

    public void create(Application application) {
        var created = jdbcClient.sql("INSERT INTO applications(student_email, college_id, program_name, status, submission_date) VALUES(?, ?, ?, ?, ?)")
                .params(List.of(application.student_email(), application.college_id(), application.program_name(), application.status(), application.submission_date()))
                .update();
        Assert.state(created == 1, "Failed to insert student");
    }
    public void updateByApplicationId(Application application, Integer id) {
        var updated = jdbcClient.sql("UPDATE applications SET student_email = ?, college_id = ?, program_name = ?, status = ?, submission_date = ? WHERE application_id = ?")
                .params(List.of(application.student_email(), application.college_id(), application.program_name(), application.status(), application.submission_date(), id))
                .update();
        Assert.state(updated == 1, "Failed to update student");
    }

    public void updateByEmailAndCollegeId(Application application, String email, Integer college_id) {
        var updated = jdbcClient.sql("UPDATE applications SET program_name = ?, status = ?, submission_date = ? WHERE student_email = ? AND college_id = ?")
                .params(List.of(application.program_name(), application.status(), application.submission_date(), email, college_id))
                .update();
        Assert.state(updated == 1, "Failed to update student");
    }

    public void delete(Integer id) {
        var deleted = jdbcClient.sql("DELETE FROM applications WHERE application_id = :id")
                .param("id", id)
                .update();
        Assert.state(deleted == 1, "Failed to delete student");
    }
    public int count() {
        return jdbcClient.sql("SELECT COUNT(*) FROM applications").query().listOfRows().size();
    }


}
