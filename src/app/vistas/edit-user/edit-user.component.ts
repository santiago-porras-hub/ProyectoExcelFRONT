import { Component, OnInit } from '@angular/core';
import { usuarioI } from 'src/app/models/usario.interface';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AlertasService } from 'src/app/service/alertas/alertas.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute,private router: Router, private api:ApiService) { }

  datosUsuario:usuarioI;

  editarForm= new FormGroup({
    correo:new FormControl(''),
    edad:new FormControl(''),
    nombre:new FormControl(''),
    prioridad:new FormControl('')
  });


  ngOnInit(): void {
    let usuarioid= this.activeRoute.snapshot.paramMap.get('id');
    this.api.obtainUser(usuarioid).subscribe(data=>{
      console.log(data);
      this.datosUsuario= data;
      this.editarForm.setValue({
        'correo': this.datosUsuario.correo,
        'edad':this.datosUsuario.edad,
        'nombre': this.datosUsuario.nombre,
        'prioridad' :this.datosUsuario.prioridad
      });
    })
    console.log(usuarioid);
    console.log(this.editarForm.value)
  }

  postForm(form:usuarioI){

    this.api.putUser(form).subscribe(data =>{

      console.log(data);
    })
    console.log(form)
  }

  redireccion(){
    alert("hola");
    this.router.navigate(["editarUser"])
  }

}
