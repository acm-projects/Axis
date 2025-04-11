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

    // Using column aliases to match the College record's component names
    private static final String SELECT_COLUMNS = """
        SELECT
            college_id,
            name,
            logo_src,
            undergrad_pop AS undergradPopulation,
            location,
            type,
            avg_tuition_annually AS avgTuitionAnnually,
            avg_tuition_after_aid AS avgTuitionAfterAid,
            avg_aid_pack AS avgAidPack,
            avg_housing_cost AS avgHousingCost,
            grad_rate AS gradeRate,
            acceptance_rate AS acceptanceRate,
            student_to_faculty_ratio AS studentToFacultyRatio,
            retention_rate_majors_avail AS retentionRateMajorsAvail,
            SAT_range AS SATRange,
            ACT_range AS ACTRange,
            required_GPA AS reqGPA,
            required_rank AS reqRank,
            required_ACT_SAT AS reqACT_SAT,
            address,
            phone_number AS phoneNumber,
            website,
            reg_app_due_date AS regAppDueDate,
            financial_aid_app_due_date AS financialAidAppDueDate,
            application_link AS applicationLink,
            campus_life AS campusLife,
            majors_available AS majorsAvailable,
            "desc" AS description
        FROM colleges
        """;

    public List<College> getAll() {
        return jdbcClient.sql(SELECT_COLUMNS).query(College.class).list();
    }

    public Optional<College> findById(Integer id) {
        log.info("Finding college by ID {}", id);
        return jdbcClient.sql(SELECT_COLUMNS + " WHERE college_id = :id")
                .param("id", id)
                .query(College.class)
                .optional();
    }

    public List<College> findByName(String name) {
        log.info("Finding college by name {}", name);
        return jdbcClient.sql(SELECT_COLUMNS + " WHERE name LIKE :name")
                .param("name", "%" + name + "%")
                .query(College.class)
                .list();
    }

    public List<College> findByLocation(String location) {
        log.info("Finding college by location {}", location);
        return jdbcClient.sql(SELECT_COLUMNS + " WHERE location LIKE :location")
                .param("location", "%" + location + "%")
                .query(College.class)
                .list();
    }

    public List<College> findByPage(Integer page, Integer collegesPerPage) {
        log.info("Finding {} colleges by page {}", collegesPerPage, page);

        int offset = (page - 1) * collegesPerPage;

        return jdbcClient.sql(SELECT_COLUMNS + " LIMIT :limit OFFSET :offset")
                .param("limit", collegesPerPage)
                .param("offset", offset)
                .query(College.class)
                .list();
    }


    public void insertCollege(College college) {
        String sql = """
            INSERT INTO colleges (
                name, logo_src, undergrad_pop, location, type, avg_tuition_annually, avg_tuition_after_aid,
                avg_aid_pack, avg_housing_cost, grad_rate, acceptance_rate, student_to_faculty_ratio,
                retention_rate_majors_avail, SAT_range, ACT_range, required_GPA, required_rank,
                required_ACT_SAT, address, phone_number, website, reg_app_due_date,
                financial_aid_app_due_date, application_link, desc
            )
            VALUES (
                :name, :logo_src, :undergrad_pop, :location, :type, :avg_tuition_annually, :avg_tuition_after_aid,
                :avg_aid_pack, :avg_housing_cost, :grad_rate, :acceptance_rate, :student_to_faculty_ratio,
                :retention_rate_majors_avail, :SAT_range, :ACT_range, :required_GPA, :required_rank,
                :required_ACT_SAT, :address, :phone_number, :website, :reg_app_due_date,
                :financial_aid_app_due_date, :application_link, :description
            )
        """;

        jdbcClient.sql(sql)
                .param("name", college.name())
                .param("logo_src", college.logo_src())
                .param("undergrad_pop", college.undergradPopulation())
                .param("location", college.location())
                .param("type", college.type())
                .param("avg_tuition_annually", college.avgTuitionAnnually())
                .param("avg_tuition_after_aid", college.avgTuitionAfterAid())
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
                .param("description", college.description())
                .update();
    }

    public void update(College college, Integer college_id) {
        var updated = jdbcClient.sql("UPDATE colleges SET name = ? WHERE college_id = ?")
                .params(List.of(college.name(), college_id))
                .update();
        Assert.state(updated == 1, "Failed to update college");
    }

    public void delete(Integer college_id) {
        var deleted = jdbcClient.sql("DELETE FROM colleges WHERE college_id = :college_id")
                .param("college_id", college_id)
                .update();
        Assert.state(deleted == 1, "Failed to delete college");
    }

    public Integer count() {
        // A more typical approach would be to extract the count from the result.
        return jdbcClient.sql("SELECT COUNT(*) FROM colleges")
                .query(Integer.class).single();
    }
}
