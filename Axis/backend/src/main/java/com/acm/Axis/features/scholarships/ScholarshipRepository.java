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
            rs.getString("name"),
            rs.getString("organization"),
            rs.getDate("open_date") != null ? rs.getDate("open_date") : null,
            rs.getDate("close_date") != null ? rs.getDate("close_date") : null,
            rs.getString("description"),
            rs.getFloat("amount"),
            rs.getBoolean("is_essay_required"),
            rs.getBoolean("is_need_based"),
            rs.getBoolean("is_merit_based"),
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




}
