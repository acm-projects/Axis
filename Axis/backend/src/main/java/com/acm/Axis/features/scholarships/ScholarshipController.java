package com.acm.Axis.features.scholarships;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scholarships")
public class ScholarshipController {

    private final ScholarshipRepository scholarshipRepository;

    public ScholarshipController(ScholarshipRepository scholarshipRepository) {
        this.scholarshipRepository = scholarshipRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Scholarship> getScholarshipById(@PathVariable int id) {
        Scholarship scholarship = scholarshipRepository.getByID(id);
        return ResponseEntity.ok(scholarship);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Scholarship>> searchScholarships(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "organization", required = false) String organization) {

        if (name != null) {
            List<Scholarship> scholarships = scholarshipRepository.getByName(name);
            return ResponseEntity.ok(scholarships);
        } else if (organization != null) {
            List<Scholarship> scholarships = scholarshipRepository.getByOrganization(organization);
            return ResponseEntity.ok(scholarships);
        } else {
            // Return a 400 Bad Request if no search parameter is provided.
            return ResponseEntity.badRequest().build();
        }
    }
}
