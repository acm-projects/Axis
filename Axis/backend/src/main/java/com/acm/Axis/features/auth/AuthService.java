package com.acm.Axis.features.auth;

import com.acm.Axis.features.student.Student;
import com.acm.Axis.features.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public String register(Student student) {
        if (studentRepository.findByEmail(student.email()).isPresent()) {
            throw new RuntimeException("Student already exists!");
        }
        Student newStudent = new Student(
                student.email(), student.first_name(), student.last_name(), student.phone_number(),
                student.gpa(), student.sat_score(), student.act_score(),
                passwordEncoder.encode(student.password()) // ✅ Hash password before saving
        );
        studentRepository.create(newStudent);
        return "Student registered successfully!";
    }


    public Map<String, String> authenticate(String email, String password) {
        Optional<Student> studentOpt = studentRepository.findByEmail(email);

        if (studentOpt.isEmpty()) {
            throw new RuntimeException("Student with this email not found!");
        }

        Student student = studentOpt.get();

        if (!passwordEncoder.matches(password, student.password())) {
            throw new RuntimeException("Incorrect password!");
        }

        return Map.of("email", student.email(), "token", jwtUtils.generateToken(email));
    }

}
