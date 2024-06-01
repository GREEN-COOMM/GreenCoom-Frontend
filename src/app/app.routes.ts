import { Routes } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';


export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'auth/login', component: AuthComponent},
    {path: 'auth/register', component: AuthComponent},
];
