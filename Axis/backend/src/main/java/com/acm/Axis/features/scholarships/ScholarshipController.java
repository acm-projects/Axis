package com.acm.Axis.features.scholarships;

import com.acm.Axis.features.college.College;
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

    @GetMapping("/total")
    public Integer getTotal() { return scholarshipRepository.count(); }

    @GetMapping("/searchByID/{id}")
    public ResponseEntity<Scholarship> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(scholarshipRepository.getByID(id));
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

    @GetMapping("/searchByPage/{page}/{scholarships_per_page}")
    public ResponseEntity<List<Scholarship>> getByPage(@PathVariable Integer page, @PathVariable Integer scholarships_per_page) {
        return ResponseEntity.ok(scholarshipRepository.findByPage(page, scholarships_per_page));
    }
}
