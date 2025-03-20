package com.acm.Axis.features.student;

public record Student(
        String email,
        String first_name,
        String last_name,
        String phone_number,
        Double gpa,
        Integer sat_score,
        Integer act_score,
        String password
) {
    public Student {

        if (email == null) throw new IllegalArgumentException("email cannot be null");
        if (first_name == null) throw new IllegalArgumentException("first_name cannot be null");
        if (last_name == null) throw new IllegalArgumentException("last_name cannot be null");
//        if (phone_number == null) throw new IllegalArgumentException("phone_number cannot be null");
//        if (gpa == null) throw new IllegalArgumentException("GPA cannot be null");
//        if (sat_score == null) throw new IllegalArgumentException("SAT_score cannot be null");
//        if (act_score == null) throw new IllegalArgumentException("ACT_score cannot be null");
        if (password == null) throw new IllegalArgumentException("Password cannot be null");
    }

    public String password() {
        return password;
    }

}
