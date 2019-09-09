import { Component, OnInit } from '@angular/core';
import { LoadingController,  MenuController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-riwayat',
  templateUrl: './tab-riwayat.page.html',
  styleUrls: ['./tab-riwayat.page.scss'],
})
export class TabRiwayatPage implements OnInit {
  userDetails : any;
  loaderToShow: any;
  isShown
  responseData : any;
  items_performa
  constructor(public toastController: ToastController, public authService: AuthService, public loadingController: LoadingController,public router : Router) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
   }

  ngOnInit() {
   this.getPerforma()

  }

  lihatRiwayat(id:any, subject:any){
    //console.log(id, subject)
    this.router.navigate(['/lihat-riwayat/' + id + '/' + subject]);
  }


  getPerforma(){
    this.showLoader()
    this.authService.getData('api/provider/v4/order_feedback/' + this.userDetails['id'], this.userDetails['access_token']).subscribe(res => {
      this.responseData = res;
      console.log(this.responseData)
      if(this.responseData.status === '1'){
        this.items_performa = this.responseData['data'];
        this.hideLoader()
      }else{
        this.hideLoader()
        this.presentToast("Access Token invalid!");
        localStorage.clear();
        this.router.navigate(['/login', {replaceUrl: true}]);
      }
    }, (err) => {
      this.hideLoader()
      this.presentToast("Server sedang dalam perbaikan, silahkan coba lagi nanti :(");
    });
  } 

  async showLoader() {
    this.loaderToShow = await this.loadingController.create({
      message: 'Processing Server Request'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.hideLoader();
  }

  hideLoader() {
    this.loadingController.dismiss();

   /*  setTimeout(() => {
      this.loadingController.dismiss();
    }, 1500);   */
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
