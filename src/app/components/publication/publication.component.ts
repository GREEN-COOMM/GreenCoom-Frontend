import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent {
  publicacionForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private publicacionService: PublicacionService, private router: Router) {
    this.publicacionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      imagen: [null, [Validators.required, this.fileTypeValidator]]
    });
  }

  fileTypeValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file && file.name) {
        const extension = file.name.split('.').pop().toLowerCase();
        const validTypes = ['jpg', 'jpeg', 'png', 'gif'];
        if (!validTypes.includes(extension)) {
            return { 'invalidFileType': true };
        }
    }
    return null;
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result; // Para la previsualización de la imagen
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

removeImage(): void {
  this.selectedImage = null;
  const imagenControl = this.publicacionForm.get('imagen');
  if (imagenControl) {
    imagenControl.setValue(null);
    imagenControl.updateValueAndValidity();
  }
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
      fileInput.value = '';
  }
}

onSubmit(): void {
  if (this.publicacionForm.valid) {
    const formData = new FormData();
    formData.append('titulo', this.publicacionForm.value.titulo);
    formData.append('descripcion', this.publicacionForm.value.descripcion);

    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

   console.log(formData.get)
   console.log("Hasta aca todo bien")
    this.publicacionService.createPublication(formData).subscribe({
      next: () => {
        alert('Publicación creada con éxito.');
        this.redirectUser();
      },
      error: () => alert('Error al crear la publicación.')
    });
  }
}

redirectUser() {

  this.router.navigate(['/home']); 
}
}