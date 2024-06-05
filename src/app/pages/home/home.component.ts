import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class  HomeComponent {

  publicaciones = [
    {
      titulo: "Primera Publicación",
      descripcion: "Esta es la descripción de la primera publicación.",
      fecha: new Date(), 
      hora: "10:00 AM",
      autor: "Autor 1",
      imagen: "/assets/Logo-1.jpg"
    },
    {
      titulo: "Segunda Publicación",
      descripcion: "Esta es la descripción de la segunda publicación.",
      fecha: new Date(), 
      hora: "11:00 AM",
      autor: "Autor 2",
      imagen: "/assets/Logo-1.jpg"
    },
    {
      titulo: "Primera Publicación",
      descripcion: "Esta es la descripción de la primera publicación.",
      fecha: new Date(), 
      hora: "10:00 AM",
      autor: "Autor 1",
      imagen: "/assets/Logo-1.jpg"
    }

    
  ];

  eventos = [
    {
      titulo: "Conferencia sobre Cambio Climático",
      descripcion: "Únete a nosotros para discutir los impactos del cambio climático y las estrategias para mitigarlo.",
      fecha: new Date(), 
      hora: "10:00 AM",
      organizador: "Organización Ecológica",
      imagen: "/assets/evento-clima.jpg",
      link: "https://chat.whatsapp.com/ejemplodelink"
    },
    {
      titulo: "Taller de Reciclaje Creativo",
      descripcion: "Aprende cómo puedes reutilizar materiales reciclables para crear arte y objetos útiles.",
      fecha: new Date(),
      hora: "02:00 PM",
      organizador: "Centro Cultural Verde",
      imagen: "/assets/evento-reciclaje.jpg",
      link: "https://chat.whatsapp.com/ejemplodelink"
    },
    {
      titulo: "Marcha por la Energía Limpia",
      descripcion: "Marchamos juntos para promover el uso de energías renovables en nuestra comunidad.",
      fecha: new Date(), 
      hora: "04:00 PM",
      organizador: "Activistas por el Clima",
      imagen: "/assets/evento-energia.jpg",
      link: "https://chat.whatsapp.com/ejemplodelink"
    }
];
}
