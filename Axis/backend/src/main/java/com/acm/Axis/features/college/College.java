package com.acm.Axis.features.college;

import java.util.Date;

public record College(
        Long college_id,
        String name,
        String logo_src,
        Integer undergradPopulation,
        String location,
        String type,
        Float avgTuitionAnnually,
        Float avgTuitionAfterAid,
        Float avgAidPack,
        Float avgHousingCost,
        Float gradeRate,
        Float acceptanceRate,
        Float studentToFacultyRatio,
        String retentionRateMajorsAvail,
        String SATRange,
        String ACTRange,
        Float reqGPA,
        String reqRank,
        String reqACT_SAT,
        String address,
        String phoneNumber,
        String website,
        Date regAppDueDate,
        Date financialAidAppDueDate,
        String applicationLink
) {

    public College {
        if (name == null) {
            throw new IllegalArgumentException("name cannot be null");
        }
    }

}
