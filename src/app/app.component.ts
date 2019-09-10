import { Component } from '@angular/core';

import { Platform, Events, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  
  public appPages = [
    {
      title: 'Account',
      url: '/account',
      icon: 'contact'
    },
  ];

  rate
  userDetails : any;
  emailShow :string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events,
    public fcm: FCM,
    public router : Router,
    public alertController : AlertController,
    public navCtrl : NavController
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('userProvider'));

    if(this.userDetails){
    this.emailShow = this.userDetails.email;
    }
    events.subscribe('email', (email) => {
      this.emailShow = email;
      //console.log(this.emails);
    });
    events.subscribe('ratingAll', (ratingAll) => {
      //console.log(rate)
    if(ratingAll == parseInt(ratingAll)){
      this.rate = ratingAll + '.0'
    }else{
      this.rate = ratingAll 
    }
    });
    //this.rate = 4
    this.initializeApp();
  }


 fcmSetup(){
  this.fcm.onNotification().subscribe(data => {
    //console.log(data);
    if (data.wasTapped) {
      console.log('Received in background');
        if(data.action == 'tawaran'){
          let navigationExtras: NavigationExtras = {
            queryParams: {
              pushNotifTawaran: 1
            }
          };
          this.navCtrl.navigateRoot(['tabs/tab-tawaran'], navigationExtras)
        }
        if(data.action == 'bekerja'){
          let navigationExtras: NavigationExtras = {
            queryParams: {
              pushNotifKerja: 1
            }
          };
          this.navCtrl.navigateRoot(['tabs/tab-berjalan'], navigationExtras)
        }
    } else {
      console.log('Received in foreground');
      if(data.action == 'tawaran'){
        this.alertTawaran(data);
      }
      if(data.action == 'bekerja'){
        this.alertBerjalan(data);
      }  
      
     }
  });
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.fcmSetup();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#000051');
      this.statusBar.styleBlackTranslucent();
    });
  }

  async alertTawaran(data) {
    const alert = await this.alertController.create({
      header: data.title,
      message: data.body,
      buttons: [
        {
          text: 'LIHAT',
          handler: () => {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                pushNotifTawaran: 1
              }
            };
            this.router.navigate(['tabs/tab-tawaran'], navigationExtras)
          }
        }
      ]
    });
    await alert.present();
  }

  async alertBerjalan(data) {
    const alert = await this.alertController.create({
      header: data.title,
      message: data.body,
      buttons: [
        {
          text: 'LIHAT',
          handler: () => {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                pushNotifKerja: 1
              }
            };
            this.router.navigate(['tabs/tab-berjalan'], navigationExtras)
          }
        }
      ]
    });
    await alert.present();
  }
}
