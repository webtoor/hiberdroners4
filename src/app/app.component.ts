import { Component } from '@angular/core';

import { Platform, Events, AlertController } from '@ionic/angular';
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
    public alertController : AlertController
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('userProvider'));

    if(this.userDetails){
    this.emailShow = this.userDetails.email;
    }
    events.subscribe('email', (email) => {
      this.emailShow = email;
      //console.log(this.emails);
    });
    this.rate = 4
    this.initializeApp();
  }

  onModelChange(event) {
    console.log('Your rate:', event);
  }
fcmSetup(){
  this.fcm.onNotification().subscribe(data => {
    console.log(data);
    if (data.wasTapped) {
      console.log('Received in background');
        if(data.action == 'tawaran'){
          this.router.navigate(['/tabs/tab-tawaran']);
        }
        if(data.action == 'bekerja'){
          this.router.navigate(['/tabs/tab-berjalan']);
        }
    } else {
      console.log('Received in foreground');
      if(data.action == 'tawaran'){
        this.alertBerjalan(data);
      }
      if(data.action == 'berjalan'){
        this.alertBerjalan(data);
      }  
      
     }
  });
}

  initializeApp() {
    this.platform.ready().then(() => {
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
                refreshPage: 1
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
                refreshPage: 1
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
