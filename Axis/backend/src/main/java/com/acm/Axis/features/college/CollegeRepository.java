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

    public void insertCollege(College college) {
        String sql = """
            INSERT INTO colleges (
                name, logo_src, undergrad_pop, location, type, avg_tuition_annually, avg_tuition_after_aid,
                avg_aid_pack, avg_housing_cost, grad_rate, acceptance_rate, student_to_faculty_ratio,
                retention_rate_majors_avail, SAT_range, ACT_range, required_GPA, required_rank,
                required_ACT_SAT, address, phone_number, website, reg_app_due_date,
                financial_aid_app_due_date, application_link
            )
            VALUES (
                :name, :logo_src, :undergrad_pop, :location, :type, :avg_tuition_annually, :avg_tuition_after_aid,
                :avg_aid_pack, :avg_housing_cost, :grad_rate, :acceptance_rate, :student_to_faculty_ratio,
                :retention_rate_majors_avail, :SAT_range, :ACT_range, :required_GPA, :required_rank,
                :required_ACT_SAT, :address, :phone_number, :website, :reg_app_due_date,
                :financial_aid_app_due_date, :application_link
            )
        """;


        jdbcClient.sql(sql)
                .param("name", college.name())
                .param("logo_src", college.logo_src())
                .param("undergrad_pop", college.undergradPopulation())
                .param("location", college.location())
                .param("type", college.type())
                .param("avg_tuition_annually", college.avgTuitionAnnually())
                .param("avg_tuition_after_aid", (college.avgTuitionAfterAid()))
                .param("avg_aid_pack", college.avgAidPack())
                .param("avg_housing_cost", college.avgHousingCost())
                .param("grad_rate", college.gradeRate())
                .param("acceptance_rate", college.acceptanceRate())
                .param("student_to_faculty_ratio", college.studentToFacultyRatio())
                .param("retention_rate_majors_avail", college.retentionRateMajorsAvail())
                .param("SAT_range", college.SATRange())
                .param("ACT_range", college.ACTRange())
                .param("required_GPA", college.reqGPA())
                .param("required_rank", college.reqRank())
                .param("required_ACT_SAT", college.reqACT_SAT())
                .param("address", college.address())
                .param("phone_number", college.phoneNumber())
                .param("website", college.website())
                .param("reg_app_due_date", college.regAppDueDate())
                .param("financial_aid_app_due_date", college.financialAidAppDueDate())
                .param("application_link", college.applicationLink())
                .update();
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
