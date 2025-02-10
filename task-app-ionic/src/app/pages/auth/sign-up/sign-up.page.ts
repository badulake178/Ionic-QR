import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CustomValidators } from 'src/app/utils/custom-validators';
@Component({
  standalone: false,
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('')
    });

    constructor(
      private firebaseSvc: FirebaseService
    ) {

    }

    ngOnInit() {
      this.confirmPasswordValidator()
    }

    confirmPasswordValidator(){
      this.form.controls.confirmPassword.setValidators([
        Validators.required,
        CustomValidators.matchValues(this.form.controls.password)
      ])

      this.form.controls.confirmPassword.updateValueAndValidity();
    }

    submit()
    {
      if(this.form.valid){
        this.firebaseSvc.signUp(this.form.value as User).then(async res=>{
          await this.firebaseSvc.updateUser({displayName: this.form.value.name});
        }, error=>{
          alert(error)
        });

      }
    }

}
