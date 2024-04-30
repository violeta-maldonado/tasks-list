export interface TaskCreate {
    id:           number;
    creationDate: null;
    assigneeId:   number;
    creatorId:    number;
    description:  string;
    dateline:     Date;
    priority:     string;
    status:       string;
}