package com.acm.Axis.features.auth;

import com.acm.Axis.features.student.Student;
import com.acm.Axis.features.student.StudentRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final StudentRepository studentRepository;

    public CustomUserDetailsService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Student> studentOptional = studentRepository.findByEmail(email);

        if (studentOptional.isEmpty()) {
            throw new UsernameNotFoundException("Student not found: " + email);
        }

        Student student = studentOptional.get();

        return org.springframework.security.core.userdetails.User
                .withUsername(student.email())
                .password(student.password())
                .roles("STUDENT") // ✅ Future-proof by making this dynamic if needed
                .build();
    }

}
