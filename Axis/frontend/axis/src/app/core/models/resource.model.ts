export type ResourceResponse = {
    id: number,
    name: string;
    organization?: string;
    dateCreated: Date;
    deadlineDate?: Date;
    information?: string;
}

export class Resource {
    id: number;
    name: string;
    organization: string;
    dateCreated: Date;
    deadlineDate?: Date;
    information: string;

    constructor(res: ResourceResponse) {
        this.id = res.id;
        this.name = res.name;
        this.organization = res.organization ?? "No Organization Found";
        this.dateCreated = res.dateCreated;
        this.deadlineDate = res.deadlineDate ?? undefined;
        this.information = res.information ?? "No additional information";
    }
}