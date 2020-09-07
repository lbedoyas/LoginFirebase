import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  logo: string = "./../../../assets/img/logomac.jpg";

  usuario: usuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.usuario = new usuarioModel();


  }

  onSubmit(form: NgForm){
    if (form.invalid) {
      return;
    }
    console.log(this.usuario);
    console.log(form);

    Swal.fire({
      icon: 'info',
      title: 'Login...',
      text: 'Espere por favor ...',
      allowOutsideClick: false
    });

    Swal.showLoading();

    this.auth.newUser(this.usuario).subscribe( resp =>{
      console.log(resp);
      Swal.close();


      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }


      this.router.navigateByUrl('/home');
    },(err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'warning',
        title: 'Login - Error...',
        text: 'Error contacte al administrador.... ' + err.error.error.message
      });
    });
  }

}
