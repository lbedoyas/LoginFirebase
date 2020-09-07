import { usuarioModel } from './../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


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
  userToken: string;


  constructor(private http: HttpClient) {

    this.leerToken();

   }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: usuarioModel){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,authData
    ).pipe(
      map( resp => {
        console.log('entro al map');
        this.guardarToken(resp['idToken']);
        return resp;
      }));

  }

  newUser(usuario: usuarioModel){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`, authData
    ).pipe(
      map( resp => {
        console.log('entro al map');
        this.guardarToken(resp['idToken']);
        return resp;
      }));

  }


  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);


    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );


  }

  leerToken(){
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean{
    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }


}
