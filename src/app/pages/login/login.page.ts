import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController,  Events, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm : FormGroup;
  submitted = false;
  token
  constructor(public router : Router, 
    private formBuilder: FormBuilder,  
    public toastController: ToastController,
    public authService: AuthService,
    public events : Events,
    public menuCtrl : MenuController,
    public fcm: FCM) {
    this.loginForm = this.formBuilder.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null, Validators.required],
      'device_token' : [null] 
    });


   }

  ngOnInit() {
   this.getFcm();
  }

  getFcm(){
    this.fcm.getToken().then(token => {
    this.token = token
    });
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false)
  }

  ionViewDidEnter(){
    if(localStorage.getItem('userProvider') ){
      this.router.navigate(['/tabs/tab-tawaran'], {replaceUrl: true});
    }
  }

 
  onFormSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    //alert(this.loginForm.value['device_token'])

    if (this.loginForm.invalid) {
        return;
    }
    /* this.loginForm.value['device_token'] = "asdasd" */
    this.loginForm.patchValue({
      device_token : this.token
    });
    console.log(this.loginForm.value)
      this.authService.login( this.loginForm.value, 'login_provider')
      .subscribe(res => {
        console.log(res)
        if(res.access_token) {
          this.events.publish('email', res['email']);
          localStorage.setItem('userProvider', JSON.stringify(res));
          this.fcm.subscribeToTopic('droner_info');
          this.fcm.subscribeToTopic('tawaran');
          this.router.navigate(['/tabs/tab-tawaran'], {replaceUrl: true});
        }else{
          this.presentToast('Anda memasukkan Email dan Password yang salah. Isi dengan data yang benar dan coba lagi',);
        }
      }, (err) => {
        this.presentToast("Server sedang dalam perbaikan, silakan coba lagi nanti :(");
      });

}

  get f() { return this.loginForm.controls; }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
