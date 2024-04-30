import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
        
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'newTask',
        component: NewTaskComponent
    }
];
