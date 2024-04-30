import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from '@angular/core';
import { ResponseI } from "../../models/response.model";
import { Task } from "../../models/task.model";
import { TaskCreate } from "../../models/taskCreate.model";

@Injectable({
    providedIn: "root"
})
export class TaskService{
    private http = inject(HttpClient);
    private path:string = "http://localhost:8085/app-tasks/api/tasks";
    
    constructor(){}

    getAll(){
        return this.http.get<ResponseI>(this.path+'/all')
    }
    getByStatus(status: string){
        return this.http.get<ResponseI>(this.path+`/status/${status}`)
    }
    delete(id:number){
        return this.http.delete<ResponseI>(this.path+`/${id}`)
    }
    createTask(task:TaskCreate){
        return this.http.post<ResponseI>(this.path+`/create`,task)
    }
    updateTask(task:TaskCreate){
        return this.http.post<ResponseI>(this.path+`/${task.id}`,task)
    }
    
}