package com.acm.Axis.features.college;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colleges")
public class CollegeController {

    private final CollegeRepository collegeRepository;

    @Autowired
    public CollegeController(CollegeRepository collegeRepository) {
        this.collegeRepository = collegeRepository;
    }

    @GetMapping("")
    List<College> getAll() {
        return collegeRepository.getAll();
    }

    @GetMapping("/{college_id}")
    College getById(@PathVariable Integer college_id) {
        return collegeRepository.findById(college_id).orElse(null);
    }

    @GetMapping("/{name}")
    List<College> getByName(@PathVariable String name) {
        return collegeRepository.findByName(name);
    }

    @PostMapping("")
    void create(@RequestBody College college) {
        collegeRepository.insertCollege(college);
    }

    @PutMapping("/{college_id}")
    void update(@PathVariable Integer college_id, @RequestBody College college) {
        collegeRepository.update(college, college_id);
    }

    @DeleteMapping("/{college_id}")
    void delete(@PathVariable Integer college_id) {
        collegeRepository.delete(college_id);
    }

}
