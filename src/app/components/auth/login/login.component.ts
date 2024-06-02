import { Component, Output, EventEmitter} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


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

  constructor(private authService: AuthService) {}

  @Output() toggle = new EventEmitter<void>();

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error.error);
      }
    });
  }

  
}
