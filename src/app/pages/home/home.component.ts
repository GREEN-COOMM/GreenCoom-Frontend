import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionService } from '../../services/publicacion.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PublicationComponent } from '../../components/publication/publication.component';
import { EventComponent } from '../../components/events/events.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/events.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PublicationComponent, EventComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class  HomeComponent implements OnInit {

  publicaciones:any[] = [];
  eventos: any[] = [];
  safeUrl:any;

  constructor(private publicacionesService: PublicacionService, private sanitizer: DomSanitizer, private router: Router, public authService: AuthService, public eventService: EventService){}

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

  ngOnInit() {
    this.loadEvents();
    this.loadPublications();
  }

  loadPublications(){
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

  loadEvents(){
    this.eventService.listarEventos().subscribe(
      (response) => {
        this.eventos = response.map(evento => ({
          ...evento
          
          
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

  

  
}
