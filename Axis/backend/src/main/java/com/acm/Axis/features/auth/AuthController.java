package com.acm.Axis.features.auth;

import com.acm.Axis.features.student.Student;
import com.acm.Axis.features.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    private final StudentRepository studentRepository;

    public AuthController(AuthService authService, StudentRepository studentRepository) {
        this.authService = authService;
        this.studentRepository = studentRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {
        System.out.println(student);
        return ResponseEntity.ok(Map.of("message", authService.register(student)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        System.out.println("🔍 Login attempt: Email -> " + email);

        try {
            String token = authService.authenticate(email, password);
            System.out.println("✅ Login successful for email: " + email);
            System.out.println("🔑 Generated Token: " + token);

            Optional<Student> studentOpt = studentRepository.findByEmail(email);
            if (studentOpt.isPresent()) {
                Student student = studentOpt.get();
                Map<String, Object> responseData = Map.of(
                        "token", token,
                        "account", Map.of(
                                "email", student.email(),
                                "first_name", student.first_name(),
                                "last_name", student.last_name(),
                                "phone_number", student.phone_number(),
                                "gpa", student.gpa(),
                                "sat_score", student.sat_score(),
                                "act_score", student.act_score()
                        )
                );
                return ResponseEntity.ok(responseData);
            }
        } catch (RuntimeException e) {
            System.out.println("❌ Login failed for email: " + email + " - Reason: " + e.getMessage());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials!"));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials!"));
    }


}