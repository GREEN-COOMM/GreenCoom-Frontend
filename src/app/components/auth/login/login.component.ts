import { Component, Output, EventEmitter} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  @Output() toggle = new EventEmitter<void>();

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        alert("Usuario Iniciado Correctamente");
        this.redirectUser();
        console.log(localStorage.getItem('token'))
        console.log("Hasta aca todo good")
        
      },
      error: (error) => {
        console.log(error.error);
        console.error('Error en el inicio de sesión', error);
        alert("Error en el inicio de sesión");
      }
    });
  }

  redirectUser() {

    this.router.navigate(['/home']); 
  }

  
}
