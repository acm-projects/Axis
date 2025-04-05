export type StudentInfo = {
    email : string,
    first_name : string,
    last_name : string,
    phone_number : string,
    gpa: number,
    sat_score : number,
    act_score : number,
    password : string
}

export class Student {
    studentInfo: StudentInfo;
    constructor({
        email = "",
        first_name = "",
        last_name = "",
        phone_number = "",
        gpa = 0,
        sat_score = 0,
        act_score = 0,
        password = "",
    }: Partial<StudentInfo> = {}) {
        this.studentInfo = {
            email,
            first_name,
            last_name,
            phone_number,
            gpa,
            sat_score,
            act_score,
            password,
        };
    }
    getFirst() {return this.studentInfo.first_name}
    getLast() {return this.studentInfo.last_name}
    getUsername() {return this.studentInfo.email.split("@")[0]}
}