package com.acm.Axis.features.programs;

import com.acm.Axis.features.college.College;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Repository
public class ProgramRepository {

    private static final Logger log = LoggerFactory.getLogger(ProgramRepository.class);
    private final JdbcClient jdbcClient;

    public ProgramRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public List<Program> getAll() {
        return jdbcClient.sql("SELECT * FROM programs").query(Program.class).list();
    }



    public Optional<Program> findById(Integer program_id) {
        return jdbcClient.sql("SELECT * FROM programs WHERE program_id = :program_id")
                .param("program_id", program_id)
                .query(Program.class)
                .optional();
    }


    public void create(Program program) {
        var created = jdbcClient.sql("INSERT INTO programs (college_id, program_name, degree_type) VALUES(?,?,?)")
                .params(List.of(program.college_id(), program.program_name(), program.degree_type()))
                .update();
        Assert.state(created == 1, "Failed to insert program");
    }

    public void update(Program program, Integer college_id, Integer program_id) {
        var updated = jdbcClient.sql("UPDATE programs SET (name = ?, degree_type = ?) WHERE college_id = ? AND program_id = ?")
                .params(List.of(program.program_name(), program.degree_type(), college_id, program_id))
                .update();
        Assert.state(updated == 1, "Failed to update program");
    }
    public void delete(Integer college_id, Integer program_id) {
        var deleted = jdbcClient.sql("DELETE FROM programs WHERE college_id = ? AND program_id = ?")
                .params(List.of(college_id, program_id))
                .update();
        Assert.state(deleted == 1, "Failed to delete student");
    }
    public int count() {
        return jdbcClient.sql("SELECT COUNT(*) FROM programs").query().listOfRows().size();
    }
}
