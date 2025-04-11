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

    @GetMapping("/total")
    Integer getTotal() { return collegeRepository.count(); }

    @GetMapping("")
    List<College> getAll() {
        return collegeRepository.getAll();
    }

    @GetMapping("/searchByID/{college_id}")
    College getById(@PathVariable Integer college_id) {
        return collegeRepository.findById(college_id).orElse(null);
    }

    @GetMapping("/searchByName/{name}")
    List<College> getByName(@PathVariable String name) {
        return collegeRepository.findByName(name);
    }

    @GetMapping("/searchByLocation/{location}")
    List<College> getByLocation(@PathVariable String location) {
        return collegeRepository.findByLocation(location);
    }

    @GetMapping("/searchByPage/{page}/{colleges_per_page}")
    List<College> getByPage(@PathVariable Integer page, @PathVariable Integer colleges_per_page) {
        return collegeRepository.findByPage(page, colleges_per_page);
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
