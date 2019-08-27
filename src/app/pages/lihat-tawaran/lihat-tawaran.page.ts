import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-lihat-tawaran',
  templateUrl: './lihat-tawaran.page.html',
  styleUrls: ['./lihat-tawaran.page.scss'],
})
export class LihatTawaranPage implements OnInit {
 
  data: any;
  subject : any;
  userDetails : any;

  constructor(private route: ActivatedRoute, public authService: AuthService) { 
    this.subject = this.route.snapshot.paramMap.get('subject');
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  }

  ngOnInit() {
    /* var order_id = this.route.snapshot.paramMap.get('id'); */
    this.authService.getData('api/provider/v4/detail_show/' + '3', this.userDetails['access_token']).subscribe(res => {
      console.log(res)

      },
      err => console.log(err)
    );
   
  }

}
