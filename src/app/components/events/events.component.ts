import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { EventService } from '../../services/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventComponent {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();
      formData.append('titulo', this.eventForm.value.titulo);
      formData.append('descripcion', this.eventForm.value.descripcion);
      formData.append('fecha', this.eventForm.value.fecha);
      formData.append('hora', this.eventForm.value.hora);
      formData.append('link', this.eventForm.value.link);

      this.eventService.createEvent(formData).subscribe({
        next: () => 
          alert('Evento creado con éxito.'),
        error: () => alert('Error al crear el evento.')
      });
    }
  }
}