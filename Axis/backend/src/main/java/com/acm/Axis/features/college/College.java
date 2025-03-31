package com.acm.Axis.features.college;

import java.util.Date;

public record College(
        Integer college_id,
        String name,
        String logo_src,
        String undergradPopulation,
        String location,
        String type,
        String avgTuitionAnnually,
        String avgTuitionAfterAid,
        String avgAidPack,
        String avgHousingCost,
        String gradeRate,
        String acceptanceRate,
        String studentToFacultyRatio,
        String retentionRateMajorsAvail,
        String SATRange,
        String ACTRange,
        String reqGPA,
        String reqRank,
        String reqACT_SAT,
        String address,
        String phoneNumber,
        String website,
        String regAppDueDate,
        String financialAidAppDueDate,
        String applicationLink,
        String campusLife,
        String majorsAvailable,
        String description
) {

    public College {
        if (name == null) {
            throw new IllegalArgumentException("name cannot be null");
        }
    }

}
