package com.acm.Axis.features.student;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    public final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("")
    List<Student> getAll() {
        return studentRepository.getAll();
    }

    @GetMapping("/{email}")
    Student findByEmail(@PathVariable String email) {
        Optional<Student> student = studentRepository.findByEmail(email);
        if (student.isEmpty()) {
            throw new IllegalArgumentException("Student not found");
        }

        return student.get();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    void create(@RequestBody Student student) {
        studentRepository.create(student);
    }

    @PutMapping("/{email}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void update(@PathVariable String email, @RequestBody Student student) {
        studentRepository.update(student, email);
    }

    @DeleteMapping("/{email}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable String email) {
        studentRepository.delete(email);
    }
}
