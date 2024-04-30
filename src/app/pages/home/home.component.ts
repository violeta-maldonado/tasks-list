import { Component, signal, computed, effect, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterBy, Task} from './../../models/task.model'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import { TaskService } from '../../services/tasks/task.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);
  filter = signal<FilterBy>('all');
  private taskService = inject(TaskService)

  private previousFilter: FilterBy = this.filter(); // Store initial filter
  constructor( private router:Router){}

  ngOnInit() {
    this.taskService.getAll()
          .subscribe({
            next: (data) => this.tasks.set(data.data),
            error: () => console.error('Error fetching all tasks')
          });
  }

  tasksByFilter = computed(() => {
    const currentFilter = this.filter();
    const tasks = this.tasks();

    if (this.previousFilter !== currentFilter) { // Trigger only on filter change
      this.previousFilter = currentFilter;
      if (currentFilter === 'all') {
        this.taskService.getAll()
          .subscribe({
            next: (data) => this.tasks.set(data.data),
            error: () => console.error('Error fetching all tasks')
          });
      } else {
        this.taskService.getByStatus(currentFilter)
          .subscribe({
            next: (data) => this.tasks.set(data.data),
            error: () => console.error('Error fetching tasks by status')
          });
      }
    }

    return tasks;
  });
 
  changeFilter(filter: FilterBy){
    this.filter.set(filter);
  }
  newTask(){
    this.router.navigate(['home']);
  }
  deleteTask(index:number){
    const currentTasks = this.tasks(); // Get the current tasks state
    const taskToDelete = currentTasks[index];
    
    this.taskService.delete(taskToDelete.id)
      .subscribe({
        next:(data) =>{
          this.tasks.update((tasks) => tasks.filter((task, position) => position !==index ));
        },
        error:() => {
          
        }
      })
  }
  /*
  
  injector = inject(Injector);
  
  trackTasks(){
    effect(()=>{
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks))
    },{injector: this.injector});
  }

  changeHandler(){
    if(this.newTaskCtrl.valid){
      // trim limpia los espacios al inicio y final del string
      const value = this.newTaskCtrl.value.trim();
      if(value !== ''){
        this.addTask(value)
        this.newTaskCtrl.setValue('');
      }
    }
  }
  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks,newTask])
  }
  
  updateTask(index: number){
    this.tasks.update((tasks)=>{
      return tasks.map((task, position)=>{
        if(position === index){
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }
  updateTaskEditingMode(index: number){
    this.tasks.update((prevState)=>{
      return prevState.map((task, position)=>{
        if(position === index){
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }
  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState)=>{
      return prevState.map((task, position)=>{
        if(position === index){
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }
  */
}
