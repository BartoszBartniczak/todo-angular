import {Status, StatusAttributes} from '../status/status';

export interface TaskAttributes {

    id: string;
    title: string;
    description: string;
    status: StatusAttributes;

}

export class Task implements TaskAttributes {

    description: string;
    title: string;
    id: string;
    status: Status;

    constructor(attr: Partial<TaskAttributes> = {}) {
        this.id = attr.id;
        this.title = attr.title;
        this.description = attr.description;
        this.status = new Status(attr.status);
    }

}
