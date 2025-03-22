import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignInComponent } from './features/sign-in/sign-in.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { ResourceInfoComponent } from './features/resource-info/resource-info.component';
import { ResourcesPageComponent } from './features/resources-page/resources-page.component';
import { DiscoverPageComponent } from './features/discover-page/discover-page.component';
import { CollegeInfoComponent } from './features/college-info/college-info.component';
import { UserAccountComponent } from './features/user-account/user-account.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

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
      path: 'sign-up',
      component: SignUpComponent
    },
    {
        path: "resources/:id",
        component: ResourceInfoComponent
    },
    {
        path: "resources",
        component: ResourcesPageComponent
    },
    {
        path: "discover",
        component: DiscoverPageComponent
    },
    {
        path: "discover/:id",
        component: CollegeInfoComponent
    },
    {
        path: "account/:id",
        component: UserAccountComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    }
];
