import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import {Router} from '@angular/router';
import { ResponseI } from '../../models/response.model';
import { TaskService } from '../../services/tasks/task.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { TaskCreate } from '../../models/taskCreate.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit {
  users: User[] = []; // Use a simple array
  filteredUsers: User[] = []; // Array to store filtered users
  usernameToFilter: string = ''; // Store the username for filtering

  taskForm = new FormGroup({
    description: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    dateline: new FormControl('', Validators.required),
    assigneeId: new FormControl('')
  });

  constructor(private api: TaskService, private api2: UserService, router: Router) {}

  ngOnInit(): void {
    this.api2.getAll()
      .subscribe({
        next: (data) => {
          this.users = data.data; // Store all users
        },
        error: () => console.error('Error fetching users')
      });
  }

  filterUsers(username: string) {
    this.usernameToFilter = username;
    this.filteredUsers = this.users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()));
  }

  /*onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value; // Get form values
  
      // Generate a random ID (assuming a numeric ID format)
      const randomId = Math.floor(Math.random() * 100000) + 1; // Adjust range as needed
  
      // Get creator ID from local storage (assuming you have a storage key)
      const userIdFromStorage = localStorage.getItem('userId');
      let creatorId: number;
  
      try {
        // Parse the user ID as a number, assuming it's stored as a string
        creatorId = parseInt(userIdFromStorage, 10);
      } catch (error) {
        console.error('Error parsing user ID from local storage:', error);
        // Handle the error gracefully, potentially display a message to the user
        return; // Exit the function if parsing fails
      }
  
      // Create a new object with the required properties
      const completeTaskData: TaskCreate = {
        id: randomId,
        creationDate: new Date().toISOString(),
        assigneeId: taskData.assigneeId, // Assuming this is already a number
        creatorId,
        description: taskData.description,
        dateline: taskData.dateline, // Assuming this is already a Date object
        priority: taskData.priority,
        status: taskData.status
      };
  
      this.api.createTask(completeTaskData)
        .subscribe(data => {
          const dataResponse: ResponseI = data;
          if (dataResponse.status === 'OK') {
            this.router.navigate(['home']);
          }
        });
    } else {
      console.error('Form is invalid');
    }
  }*/
}
