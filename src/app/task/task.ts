export interface TaskAttributes {

    uuid: string;
    title: string;
    description: string;

}

export class Task implements TaskAttributes {

    description: string;
    title: string;
    uuid: string;

    constructor(attr: Partial<TaskAttributes> = {}) {
        this.uuid = attr.uuid;
        this.title = attr.title;
        this.description = attr.description;
    }

}
