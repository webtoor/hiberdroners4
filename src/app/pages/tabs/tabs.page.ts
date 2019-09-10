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
  }
  getRating(){
    
  }

}
