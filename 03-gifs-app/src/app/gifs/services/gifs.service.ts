import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from "../interfaces/gifs.interfaces";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  constructor(private http:HttpClient) {
    this.cargarLocalStorage()
  }

  private listadoGifs: Gif[] = []
  private _historialetiquetas: string[] = [];
  private apiKey:string = 'n7cr0oYFbPW6SYzfDLq7GaxLiEd55CQo'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  get getterListadoGifs(): Gif[]{
    return [...this.listadoGifs]
  }
  get historialetiquetas() {
    return [...this._historialetiquetas];
  }

  /**
   * añado la etiqueta
   * @param etiqueta
   */
  aniadirEtiqueta(etiqueta: string): void {
    let index = this._historialetiquetas.indexOf(etiqueta)
    if (index !== -1) {

      this._historialetiquetas.splice(index, 1)
    }
    this._historialetiquetas.unshift(etiqueta)
  }

  /**
   * Agregamos la nueva etiqueta al array
   * @param etiqueta
   */
  buscarEtiqueta(etiqueta: string): void {
    let etiqBuena = etiqueta.trim().toLowerCase()
    if (etiqueta != "") {
      let index = this._historialetiquetas.indexOf(etiqueta)
      if (this._historialetiquetas.length < 10) {

        this.aniadirEtiqueta(etiqBuena)

      } else {
        if (index === -1) {
          this._historialetiquetas.pop()
        }

        this.aniadirEtiqueta(etiqBuena)
      }

      const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 12)
      .set('q', etiqueta);

      this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params}).subscribe( resp => {
        this.listadoGifs = resp.data
        console.log({gifs: this.listadoGifs})
      })
    }
    this.almacenarLocalStorage()
  }

  /**
   * Para almacenar el historial en el localStorage
   */
  private almacenarLocalStorage(): void{
    localStorage.setItem('historial', JSON.stringify(this._historialetiquetas))
  }

  /**
   * si se guardo en el localStorage con la llave historial sacará
   * el _historialetiquetas
   * @returns _historialetiquetas
   */
  private cargarLocalStorage(): void{
    if(!localStorage.getItem('historial')) return;
    this._historialetiquetas = JSON.parse(localStorage.getItem('historial')!);

    if(this._historialetiquetas.length === 0) return;
    this.buscarEtiqueta(this._historialetiquetas[0])
  }
}
