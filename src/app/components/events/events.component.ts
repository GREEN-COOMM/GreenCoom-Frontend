import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { EventService } from '../../services/events.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';

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
      const eventRequest = {
        titulo: this.eventForm.value.titulo,
        descripcion: this.eventForm.value.descripcion,
        fecha: this.eventForm.value.fecha,
        hora: this.eventForm.value.hora,
        link: this.eventForm.value.link
      };
      

      this.eventService.createEvent(eventRequest).subscribe({
        next: (response) => {
          console.log("Server Response: ", response);
          alert("Evento creado con exito")
        },
        error: (error) => {
          console.log("Server Responde: ", error);
          alert("Error al crear el evento")
        }
      });
    }
  }
}