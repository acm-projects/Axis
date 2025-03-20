package com.acm.Axis.features.auth;

import com.acm.Axis.features.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {
        return ResponseEntity.ok(Map.of("message", authService.register(student)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        System.out.println("🔍 Login attempt: Email -> " + email);

        try {
            Map<String, String> authentication = authService.authenticate(email, password);
            String studentEmail = authentication.keySet().iterator().next();
            System.out.println("✅ Login successful for email: " + studentEmail);
            System.out.println("🔑 Generated Token: " + authentication.get(studentEmail));

            return ResponseEntity.ok(Map.of("email", studentEmail, "token", authentication.get(studentEmail)));
        } catch (RuntimeException e) {
            System.out.println("❌ Login failed for email: " + email + " - Reason: " + e.getMessage());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials!"));
        }
    }

}