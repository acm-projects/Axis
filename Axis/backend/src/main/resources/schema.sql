-- 1) STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
    email         VARCHAR(255) NOT NULL,
    first_name    VARCHAR(100),
    last_name     VARCHAR(100),
    phone_number  VARCHAR(20),
    GPA           DECIMAL(3,2),
    SAT_score     INT,
    ACT_score     INT,
    PRIMARY KEY (email)
);

-- 2) COLLEGES TABLE
CREATE TABLE IF NOT EXISTS colleges (
                                        college_id    BIGSERIAL,
                                        name          VARCHAR(255) NOT NULL,
    PRIMARY KEY (college_id)
);

-- 3) PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS programs (
                                        program_id    BIGSERIAL,
                                        college_id    BIGINT NOT NULL,
                                        program_name  VARCHAR(255) NOT NULL,
    degree_type   VARCHAR(100),
    PRIMARY KEY (program_id),
    CONSTRAINT unique_program UNIQUE (college_id, program_name),
    CONSTRAINT fk_program_college
    FOREIGN KEY (college_id)
    REFERENCES colleges (college_id)
);

-- 4) APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
                                            application_id   BIGSERIAL,
                                            student_email    VARCHAR(255) NOT NULL,
    college_id       BIGINT NOT NULL,
    program_name     VARCHAR(255) NOT NULL,
    status           VARCHAR(50),
    submission_date  DATE,
    PRIMARY KEY (application_id),
    CONSTRAINT fk_app_student
    FOREIGN KEY (student_email)
    REFERENCES students(email),
    CONSTRAINT fk_app_college
    FOREIGN KEY (college_id)
    REFERENCES colleges(college_id),
    CONSTRAINT fk_app_program
    FOREIGN KEY (college_id, program_name)
    REFERENCES programs(college_id, program_name)
);

-- 5) DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS documents (
                                         document_id      BIGSERIAL,
                                         student_email    VARCHAR(255) NOT NULL,
    application_id   BIGINT NOT NULL,
    upload_date      DATE,
    PRIMARY KEY (document_id),
    CONSTRAINT fk_doc_student
    FOREIGN KEY (student_email)
    REFERENCES students(email),
    CONSTRAINT fk_doc_application
    FOREIGN KEY (application_id)
    REFERENCES applications(application_id)
);