import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public busquedas:string [] = []

  constructor( private gifsService: GifsService){}

  actuHistorial():string[]{
    this.busquedas = this.gifsService.historialetiquetas
    console.log('Botones: '+this.gifsService.historialetiquetas)
    return this.busquedas
  }

  /**
   * Metodo que vuelve a buscar un Gif segun la la etiqueta guardada
   * @param etiqueta
   */
  buscarGif(etiqueta:string){
    this.gifsService.buscarEtiqueta(etiqueta)
  }
}
