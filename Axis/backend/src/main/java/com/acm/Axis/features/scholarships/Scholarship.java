package com.acm.Axis.features.scholarships;

import java.util.Date;

public record Scholarship(
        String name,
        String organization,
        Date openDate,
        Date closeDate,
        String description,
        Float amount,
        Boolean essayRequired,
        Boolean needBased,
        Boolean meritBased,
        String website,
        String requirements,
        String location
) {

    public Scholarship {
        if (name == null) throw new IllegalArgumentException("name cannot be null");
        if (organization == null) throw new IllegalArgumentException("organization cannot be null");
    }

}