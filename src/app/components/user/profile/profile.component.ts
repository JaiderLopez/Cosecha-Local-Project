import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserInterface } from '../../../user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }d;
  usuario: UserInterface;
  referencia: UserInterface;

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.usuario = this.userService.currentUserSig();
        this.userService.getByID(this.usuario.id)
          .then((result) => {
            this.referencia = result;
            this.usuario = this.referencia;
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
            if (this.usuario.fecha != undefined){
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
    
  }
}
