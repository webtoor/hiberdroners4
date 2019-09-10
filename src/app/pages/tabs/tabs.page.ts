import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  userDetails
  constructor(public authService: AuthService, public events : Events) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
   }

  ngOnInit() {
    this.getRating()
  }
  getRating(){
    this.authService.getData('api/provider/v4/get_rating/' + this.userDetails['id'], this.userDetails['access_token']).subscribe(res => {
      console.log(res)
      if(res["status"] == "1"){
        this.events.publish('ratingAll', res['data']['total_rating']);
      }else{
    
      }
    }, (err) => {
   
    });
  }

}
