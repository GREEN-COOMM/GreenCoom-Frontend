import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../../components/auth/login/login.component";
import { RegisterComponent } from '../../components/auth/register/register.component';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    imports: [CommonModule, LoginComponent,RegisterComponent]
})
export class AuthComponent {
  showLogin: boolean = true;

  constructor(private route: ActivatedRoute) { 
    this.route.url.subscribe(url => {
      this.showLogin = url.toString().includes('login');
    });
  }

  toggleForm(){
    this.showLogin = !this.showLogin;
  }

}
