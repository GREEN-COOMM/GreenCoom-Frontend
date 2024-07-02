import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  
  @Output() toggle = new EventEmitter<void>();

  forms! : FormGroup;

  constructor(private fb:FormBuilder, private http: HttpClient,  private router: Router){
    this.crearFormulario();
  }

  get nombreNoValido(){
    return this.forms.get('nombre')?.invalid && this.forms.get('nombre')?.touched;
  }

  get correoNoValido(){
    return this.forms.get('email')?.invalid && this.forms.get('email')?.touched;
  }

  get contrasenaNoValido(){
    return this.forms.get('password')?.invalid && this.forms.get('password')?.touched;
  }

  crearFormulario(){
    this.forms = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$')]],      
      confirmarContrasena: ['', Validators.required]
    }, { validator: this.passwordMatchValidator});
}


  onRegister() {

    if(this.forms.valid){
      const formData = {
        nombre: this.forms.value.nombre,
        email: this.forms.value.email,
        password: this.forms.value.password
      };

      console.log(formData)

      this.http.post('http://localhost:8000/api/backend/user/create', formData, {responseType: 'text'}).subscribe(
        response => {
          alert(response);
          this.router.navigate(['/auth/login'])
        },
        error => {
          console.log(error.error)
          alert(error.error)
        }
      )

      
    }

    

    

    
    
  }

  passwordMatchValidator: Validators = (group: FormGroup): ValidationErrors | null => {
    const contrasena = group.get('password')?.value;
    const confirmarContrasena = group.get('confirmarContrasena')?.value;
    return contrasena === confirmarContrasena ? null : { noCoinciden: true };
  };

}
