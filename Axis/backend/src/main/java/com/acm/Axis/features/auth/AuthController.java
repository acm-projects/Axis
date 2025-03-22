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
            String token = authService.authenticate(email, password);
            System.out.println("✅ Login successful for email: " + email);
            System.out.println("🔑 Generated Token: " + token);

            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException e) {
            System.out.println("❌ Login failed for email: " + email + " - Reason: " + e.getMessage());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials!"));
        }
    }

}