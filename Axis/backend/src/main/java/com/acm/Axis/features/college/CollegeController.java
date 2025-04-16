package com.acm.Axis.features.college;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/searchByPage/{page}/{colleges_per_page}")
    List<College> getByPage(@PathVariable Integer page, @PathVariable Integer colleges_per_page) {
        return collegeRepository.findByPage(page, colleges_per_page);
    }

    @GetMapping("/searchByID/{college_id}")
    College getById(@PathVariable Integer college_id) {
        return collegeRepository.findById(college_id).orElse(null);
    }

    @GetMapping("/searchByFilters")
    List<College> getByFilters(@RequestParam Map<String, String> filters) {
        System.out.println(filters.entrySet());
        collegeRepository.findByFilters(filters);
        return null;
    }

//    @GetMapping("/searchByKeyword/{keyword}")
//    List<College> getByKeyword(@PathVariable String keyword) {
//        return collegeRepository.findByKeyword(keyword);
//    }
//
//    @GetMapping("/searchByLocation/{location}")
//    List<College> getByLocation(@PathVariable String location) {
//        return collegeRepository.findByLocation(location);
//    }
//
//    @GetMapping("/searchByTuitionRange/{minTuition}/{maxTuition}")
//    List<College> getByTuitionRange(@PathVariable Integer minTuition, @PathVariable Integer maxTuition) {
//        return collegeRepository.findByTuitionRange(minTuition, maxTuition);
//    }

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
