import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userDetails
  constructor(public router:Router, public authService : AuthService, public fcm: FCM) {
    this.userDetails  = JSON.parse(localStorage.getItem('userProvider'));

   }

  ngOnInit() {
  }

  logout(){
     //Api Token Logout
     this.authService.getData("api/logout", this.userDetails['access_token']).subscribe((res) =>{
       if(res['success'] == true){
        localStorage.clear();
       }
       else{
        console.log("No access");
       }  
         }, (err) => {
          //Connection failed message
    });
    this.fcm.unsubscribeFromTopic('droner_info');
    this.fcm.unsubscribeFromTopic('tawaran');
    localStorage.clear();
    this.router.navigate(['/login'], {replaceUrl: true})
  }

}
