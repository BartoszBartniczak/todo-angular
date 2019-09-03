export interface StatusAttributes {
    id: string;
}

export enum StatusEnum {
    'TO_DO' = 'TO_DO',
    'IN_PROGRESS' = 'IN_PROGRESS',
    'DONE' = 'DONE'
}

export class Status implements StatusAttributes {
    id: string;
    status: StatusEnum;

    constructor(attr: Partial<StatusAttributes> = {}) {
        this.id = attr.id;
        this.status = StatusEnum[attr.id];
    }

    color(): string {

        switch (this.status) {

            case StatusEnum.IN_PROGRESS:
                return 'accent';

            case StatusEnum.DONE:
                return 'primary';
            default:
                return null;
        }

    }

    isSelected(): boolean {
        return this.status !== StatusEnum.TO_DO;
    }

    title(): string {
        return this.status.toString().replace('_', ' ');
    }

}
