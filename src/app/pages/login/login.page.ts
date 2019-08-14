import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm : FormGroup;
  submitted = false;

  constructor(public router : Router, private formBuilder: FormBuilder,  public toastController: ToastController) {
    
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
      'device_token' : ""
    });
    this.loginForm['device_token'] = 'test';

   }

  ngOnInit() {
   
    
    if(localStorage.getItem('adminData') == ''){

    }else{
      this.router.navigate(['/tabs/tab-tawaran']);
    }
  }

 
  onFormSubmit(form: NgForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    console.log(form)
}

  get f() { return this.loginForm.controls; }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  login(){
    localStorage.setItem("adminData", 'test');

    this.router.navigate(['/tabs/tab-tawaran']);
  }

}
