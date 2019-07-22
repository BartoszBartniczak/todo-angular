export interface TaskAttributes {

    id: string;
    title: string;
    description: string;

}

export class Task implements TaskAttributes {

    description: string;
    title: string;
    id: string;

    constructor(attr: Partial<TaskAttributes> = {}) {
        this.id = attr.id;
        this.title = attr.title;
        this.description = attr.description;
    }

}
