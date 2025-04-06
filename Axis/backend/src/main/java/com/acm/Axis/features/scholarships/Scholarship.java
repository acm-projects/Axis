package com.acm.Axis.features.scholarships;

import java.util.Date;

public record Scholarship(
        Integer id,
        String name,
        String logo_src,
        String organization,
        String openDate,
        String closeDate,
        String description,
        String amount,
        String is_essay_required,
        String is_need_based,
        String is_merit_based,
        String website,
        String requirements,
        String location
) {

    public Scholarship {
        if (name == null) throw new IllegalArgumentException("name cannot be null");
        if (organization == null) throw new IllegalArgumentException("organization cannot be null");
    }

}