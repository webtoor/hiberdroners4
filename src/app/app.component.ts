import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Platform, Events, AlertController, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit, OnDestroy {

  
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
  backButtonSubscription;
  counts :number = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events,
    public fcm: FCM,
    public router : Router,
    public alertController : AlertController,
    public navCtrl : NavController,
    public toastController : ToastController
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

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.counts++
      if((window.location.pathname == '/login') || (window.location.pathname == '/tabs/tab-tawaran') || (window.location.pathname == '/tabs/tab-berjalan') || (window.location.pathname == '/tabs/tab-riwayat')){
        if(this.counts == 2){
          navigator['app'].exitApp();
          this.counts = 0;
        }
        this.presentToast('Tekan sekali lagi untuk keluar')
      }else{
        this.counts = 0
        window.history.back();
      }
    }); 
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
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

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
