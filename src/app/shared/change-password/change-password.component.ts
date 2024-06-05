import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthCredential, EmailAuthCredential, EmailAuthProvider, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { error } from 'console';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor (private userService: UserService, private router: Router, private route: ActivatedRoute, private firestore: Firestore) {}

  applyForm = new FormGroup ({
    actualPassword: new FormControl(''),
    newPassword: new FormControl(''),
    newPasswordConf: new FormControl('')
  });
  /*allow = true;
  ngOninit(): void {
    var contrasenaActual = document.getElementById("current-password").innerHTML;
    var newContrasena = document.getElementById("new-password").innerHTML;
    if(contrasenaActual != "" && contrasenaActual != null && newContrasena != "" && newContrasena != null){
      this.allow = false;
      document.getElementById("submit").style.backgroundColor = "green"
    } else {
      this.allow = true;
      document.getElementById("submit").style.backgroundColor = "gray"
    }
  }*/
  onSubmit() {
    const auth = getAuth();
    const user = auth.currentUser;
    var form = this.applyForm.value;
  
    this.userService.getByID(user.uid).then(async (us) => {
      if (form.actualPassword == us.password) {
        if (form.newPassword == form.newPasswordConf) {
          await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(user.email,us.password)).then(() => {
            updatePassword(user, form.newPassword).then(async () => {
              this.router.navigate(['/home/profile'], { relativeTo: this.route });
              //firestore
              const ref = doc(this.firestore, "usuarios", us.ID);
              await updateDoc(ref, {password: form.newPassword}).then(() => {console.log('firestore updated')}).catch((error)=> {console.error(error)});
            }).catch((error) => {
              console.error(error);
            });
          }).catch((error) => {
              console.error(error);
          });
        } else {
          document.getElementById("dispar-password").style.display = "flex";
        }
      } else {
        document.getElementById("wrong-password").style.display = "flex";
      }
    })    
  }

  cerrarVentana() {
    document.getElementById("current-password").innerHTML = "";
    document.getElementById("new-password").innerHTML = "";
    document.getElementById("confirm-password").innerHTML = "";
    document.getElementById("wrong-password").style.display = "none";
    document.getElementById("dispar-password").style.display = "none";
  }
}
