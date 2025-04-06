package com.acm.Axis.features.scholarships;

import com.acm.Axis.features.college.College;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ScholarshipRepository {

    private static final Logger log = LoggerFactory.getLogger(ScholarshipRepository.class);
    private final JdbcClient jdbcClient;

    public ScholarshipRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    // used to map the retrieved SQL objects to Java objects withtin the below methods
    private final RowMapper<Scholarship> scholarshipRowMapper = (rs, rowNum) -> new Scholarship(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("logo_src"),
            rs.getString("organization"),
            rs.getString("open_date"),
            rs.getString("close_date"),
            rs.getString("description"),
            rs.getString("amount"),
            rs.getString("is_essay_required"),
            rs.getString("is_need_based"),
            rs.getString("is_merit_based"),
            rs.getString("website"),
            rs.getString("requirements"),
            rs.getString("location")
    );

    public Scholarship getByID(int id) {
        log.info("Fetching scholarship with ID {}", id);
        return jdbcClient.sql("SELECT * FROM scholarships WHERE id = :id")
                .param("id", id)
                .query(scholarshipRowMapper)
                .single();
    }

    public List<Scholarship> getByName(String name) {
        log.info("Fetching scholarships with name LIKE '{}'", name);
        return jdbcClient.sql("SELECT * FROM scholarships WHERE name ILIKE :name")
                .param("name", "%" + name + "%")
                .query(scholarshipRowMapper)
                .list();
    }

    public List<Scholarship> getByOrganization(String organization) {
        log.info("Fetching scholarships from organization LIKE '{}'", organization);
        return jdbcClient.sql("SELECT * FROM scholarships WHERE organization ILIKE :organization")
                .param("organization", "%" + organization + "%")
                .query(scholarshipRowMapper)
                .list();
    }

    public List<Scholarship> findByPage(Integer page, Integer scholarshipsPerPage) {
        log.info("Finding {} scholarships by page {}", scholarshipsPerPage, page);
        return jdbcClient.sql("SELECT * FROM scholarships WHERE id BETWEEN :start_id AND :end_id")
                .param("start_id", (page - 1) * scholarshipsPerPage + 1)
                .param("end_id", page * scholarshipsPerPage)
                .query(Scholarship.class)
                .list();
    }

    public Integer count() {
        // A more typical approach would be to extract the count from the result.
        return jdbcClient.sql("SELECT COUNT(*) FROM scholarships")
                .query(Integer.class).single();
    }
}
