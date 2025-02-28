package com.acm.Axis.features.applications;


import com.acm.Axis.features.student.Student;
import org.springframework.context.ApplicationListener;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;

    public ApplicationController(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @GetMapping("")
    List<Application> getAll() {
        return applicationRepository.getAll();
    }

    @GetMapping("/{application_id}")
    Application findByApplicationId(@PathVariable Integer application_id) {
        Optional<Application> application = applicationRepository.findByApplicationId(application_id);
        if (application.isEmpty()) {
            throw new IllegalArgumentException("Student not found");
        }

        return application.get();
    }

    @GetMapping("/{email}/{college_id}")
    Application findByEmailAndCollegeId(@PathVariable String email, @PathVariable Integer college_id) {
        Optional<Application> application = applicationRepository.findByEmailAndCollegeId(email, college_id);
        if (application.isEmpty()) {
            throw new IllegalArgumentException("Student not found");
        }
        return application.get();
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    void create(@RequestBody Application application) {
        applicationRepository.create(application);
    }

    @PutMapping("/{application_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void updateByApplicationId(@PathVariable Integer application_id, @RequestBody Application application) {
        applicationRepository.updateByApplicationId(application, application_id);
    }

    @PutMapping("/{student_email}/{college_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void updateByEmailAndCollegeId(@PathVariable String student_email, @PathVariable Integer college_id, @RequestBody Application application) {
        applicationRepository.updateByEmailAndCollegeId(application, student_email, college_id);
    }

    @DeleteMapping("/{application_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Integer application_id) {
        applicationRepository.delete(application_id);
    }

}
