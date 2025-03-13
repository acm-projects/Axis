package com.acm.Axis.features.auth;

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
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(Map.of("message", authService.register(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        System.out.println("🔍 Login attempt: Username -> " + username);

        try {
            Map<Long, String> authentication = authService.authenticate(username, password);
            Long id = authentication.keySet().iterator().next();
            System.out.println("✅ Login successful for username: " + username);
            System.out.println("🔑 Generated Token: " + authentication.get(id));
            return ResponseEntity.ok(Map.of("id", id.toString(), "token", authentication.get(id)));
        } catch (RuntimeException e) {
            System.out.println("❌ Login failed for username: " + username + " - Reason: " + e.getMessage());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials!"));
        }
    }
}