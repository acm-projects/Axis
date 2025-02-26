package com.acm.Axis.features.college;

public record College(
        Integer college_id,
        String name
) {

    public College {
        if (name == null) {
            throw new IllegalArgumentException("name cannot be null");
        }
    }

}
