import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserInterface } from '../../../user';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import * as uuid from 'uuid';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  applyForm = new FormGroup({
    photo: new FormControl<File>(null),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    sex: new FormControl(''),
    birthdate: new FormControl(''),
    info: new FormControl('')
  });
  newForm = new FormGroup({
    campo: new FormControl('')
  });
  archivoCapturado: any;
  loading = false;
  uploadSuccess: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }d;
  usuario: UserInterface;
  referencia: UserInterface;
  contraseña: string;

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.usuario = this.userService.currentUserSig();
        this.userService.getByID(this.usuario.ID)
          .then((result) => {
            this.referencia = result;
            this.usuario = this.referencia;
            document.getElementById('profile-picture').setAttribute('src', this.usuario.photoURL);
            document.getElementById('name').setAttribute('placeholder', this.usuario.username);
            document.getElementById('email').setAttribute('placeholder', this.usuario.email);
            document.getElementById('phone').setAttribute('placeholder', this.usuario.telefono);
            document.getElementById('address').setAttribute('placeholder', this.usuario.direccion);
            document.getElementById('other-info').setAttribute('placeholder', this.usuario.info);
            if(this.usuario.sexo == "Masculino"){
              document.getElementById('opmale').setAttribute('selected', '');
            } else if (this.usuario.sexo == "Femenino"){
              document.getElementById('opfemale').setAttribute('selected', '');
            } else if (this.usuario.sexo == "Otro"){
              document.getElementById('opother').setAttribute('selected', '');
            }
            if (this.usuario.fecha != undefined && this.usuario.fecha != ""){
              document.getElementById('birthdate').setAttribute('value', this.usuario.fecha);
            }
          })
      }
    })
    //document.querySelector('.container').classList.remove('menu-open');
  }
  goToItems() {
    this.router.navigate(['/home/change-pass'], { relativeTo: this.route });
  }

  updateUser() {
    const form = this.applyForm.value;
    const storage = getStorage();
    const id = this.usuario.ID;
    var obj = {"ID": id, "username": form.name, "email": form.email, "photoURL": "", "fecha": form.birthdate,
        "telefono": form.phone, "info": form.info, "sexo": form.sex, "direccion": form.address};
    
    //imagen
    if (form.photo !== null) {
      const storageRef = ref(storage, 'ProfilesPictures/' + id + '.' + this.archivoCapturado.type.substring(6));
      uploadBytes(storageRef, this.archivoCapturado).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(async () => {
        await getDownloadURL(ref(storage, 'ProfilesPictures/'+ id + '.' + this.archivoCapturado.type.substring(6))).then((url) => {
          obj.photoURL = url;
          if(form.email != ""){
            this.userService.update(obj,this.contraseña);
          }else{
            this.userService.update(obj,"");
          }
        }).catch((err) => {
          console.error(err);
        })
      })
      location.reload();
    } else {
      if(form.email != ""){
        this.userService.update(obj,this.contraseña);
      }else{
        this.userService.update(obj,"");
      }
      location.reload();
    }
  }
  
  capturar(event): any{
    this.loading = true;
    this.archivoCapturado = event.target.files[0];
    this.loading = false;
    this.uploadSuccess = true;
  }
  capturaremail(event){
    document.getElementById("emergente").style.display = "flex";
  }
  cambiarContrasena() {
    this.contraseña = this.newForm.value.campo;
    document.getElementById("emergente").style.display="none";
  }
  cerrarVentana(){
    document.getElementById("emergente").style.display="none";
    this.applyForm.value.email="";
  }
}
