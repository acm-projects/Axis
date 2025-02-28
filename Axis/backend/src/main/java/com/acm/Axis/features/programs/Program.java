package com.acm.Axis.features.programs;

public record Program(
    Integer program_id,
    Integer college_id,
    String program_name,
    String degree_type
) {
    public Program {
        if (program_name == null) {
            throw new IllegalArgumentException("name cannot be null");
        }
        if (degree_type == null) {
            throw new IllegalArgumentException("degree_type cannot be null");
        }
    }
}
