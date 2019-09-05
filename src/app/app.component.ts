import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    public events: Events
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#000051');
      this.statusBar.styleBlackTranslucent();
    });
  }
}
