package com.acm.Axis.features.college;

public class CollegeDTO {

    private String collegeId;
    private String name;

    public CollegeDTO() {}
    public CollegeDTO(String collegeId, String name) {
        this.collegeId = collegeId;
        this.name = name;
    }

    public String getCollegeId() {
        return collegeId;
    }
    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

}
