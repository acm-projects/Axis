package com.acm.Axis.features.applications;

import java.util.Date;

public record Application(
        Integer application_id,
        String student_email,
        Integer college_id,
        String program_name,
        String status,
        Date submission_date
) {
    public Application {
        if (student_email == null) {
            throw new IllegalArgumentException("student_email cannot be null");
        }
        if (college_id == null) {
            throw new IllegalArgumentException("college_id cannot be null");
        }
        if (program_name == null) {
            throw new IllegalArgumentException("program_name cannot be null");
        }
        if (status == null) {
            throw new IllegalArgumentException("status cannot be null");
        }
        if (submission_date == null) {
            throw new IllegalArgumentException("submission_date cannot be null");
        }
    }
}