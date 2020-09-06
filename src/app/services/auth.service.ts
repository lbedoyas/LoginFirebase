import { usuarioModel } from './../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Crear usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //autenticar usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyCUDpWxzHeg22kIH3lcuiC2DSbOqsjnyU0';


  constructor(private http: HttpClient) { }

  logout(){

  }

  login(usuario: usuarioModel){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,authData
    );

  }

  newUser(usuario: usuarioModel){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`, authData
    );

  }


  private guardarToken(idToken: string){
    
  }


}
