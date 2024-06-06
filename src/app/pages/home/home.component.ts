import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionService } from '../../services/publicacion.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PublicationComponent } from '../../components/publication/publication.component';
import { EventComponent } from '../../components/events/events.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PublicationComponent, EventComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class  HomeComponent implements OnInit {

  publicaciones:any[] = [];
  safeUrl:any;

  constructor(private publicacionesService: PublicacionService, private sanitizer: DomSanitizer, private router: Router){}

  mostrarModalpublicacion: boolean = false;

  abrirModalpublicacion(): void {
    this.mostrarModalpublicacion = true;
  }

  cerrarModalpublicacion(): void {
    this.mostrarModalpublicacion = false;
    this.redirectUser();
    
  }

  redirectUser() {

    this.router.navigate(['/home']); 
  }

  mostrarModalevento: boolean = false;

  abrirModalevento(): void {
    this.mostrarModalevento = true;
  }

  cerrarModalevento(): void {
    this.mostrarModalevento = false;
  }

  ngOnInit(){
    this.publicacionesService.listarPublicaciones().subscribe(
      (response) => {
        this.publicaciones = response.map(publicacion => ({
          ...publicacion,
          imagenBase64: this.getSafeUrl(publicacion.imagen)
          
        }));
      },
      (error) => {
        console.log(error.error)
        
      }
    )
  }

  getSafeUrl(base64Image: string): SafeResourceUrl {
    const imageBlobUrl = `data:image/jpeg;base64,${base64Image}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageBlobUrl);
  }

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
