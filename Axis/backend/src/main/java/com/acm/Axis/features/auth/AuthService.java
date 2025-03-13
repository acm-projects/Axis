package com.acm.Axis.features.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public String register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully!";
    }

    public Map<Long, String> authenticate(String username, String password) {
        System.out.println("🔍 Checking credentials for username: " + username);

        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            System.out.println("❌ Username not found: " + username);
            throw new RuntimeException("Invalid credentials!");
        }

        User user = userOpt.get();
        System.out.println("✅ Username found. Stored password: " + user.getPassword());

        if (!passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("❌ Password does not match for username: " + username);
            throw new RuntimeException("Invalid credentials!");
        }

        System.out.println("✅ Password matches! Generating JWT...");
        return Map.of(user.getId(), jwtUtils.generateToken(username));
    }
}