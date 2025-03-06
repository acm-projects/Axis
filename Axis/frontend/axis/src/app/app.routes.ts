import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { ResourceInfoComponent } from './features/resource-info/resource-info.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: "resources/:id",
        component: ResourceInfoComponent
    }
];