import { User } from "./user.model";

export interface Task {
    id:           number;
    creationDate: null;
    assignee:     User;
    creator:      User;
    description:  string;
    dateline:     Date;
    priority:     string;
    status:       string;
}
export type FilterBy = 'all'| 'pending' | 'completed'