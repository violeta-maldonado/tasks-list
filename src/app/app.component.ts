import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks =  [
    {
      "id": 4,
      "creationDate": null,
      "assignee": {
        "userId": 1,
        "username": "user1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "user1@example.com",
        "password": "hashed_password1"
      },
      "creator": {
        "userId": 1,
        "username": "user1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "user1@example.com",
        "password": "hashed_password1"
      },
      "description": "Example task description",
      "dateline": "2024-05-01T05:00:00.000+00:00",
      "priority": "low",
      "status": "pending"
    },
    {
      "id": 5,
      "creationDate": "2024-04-29T10:12:36.373436",
      "assignee": {
        "userId": 1,
        "username": "user1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "user1@example.com",
        "password": "hashed_password1"
      },
      "creator": {
        "userId": 2,
        "username": "user2",
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "user2@example.com",
        "password": "hashed_password2"
      },
      "description": "string",
      "dateline": "2024-04-29T05:00:00.000+00:00",
      "priority": "low",
      "status": "pending"
    }
  ]
}
