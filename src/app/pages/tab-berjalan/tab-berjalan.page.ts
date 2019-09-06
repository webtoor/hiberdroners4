import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController,ToastController  } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-berjalan',
  templateUrl: './tab-berjalan.page.html',
  styleUrls: ['./tab-berjalan.page.scss'],
})
export class TabBerjalanPage implements OnInit {

  userDetails : any;
  loaderToShow: any;
  isShown
  responseData : any;

  theState:boolean = false;
  public items_ikuti : any;
  public items_kerja : any;
  cancels :any =  { "id" : ""}
  refreshPage
  constructor(private route: ActivatedRoute, public alertController: AlertController, public toastController: ToastController, public authService: AuthService, public loadingController: LoadingController,public router : Router) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  /*   for (let i = 0; i < 10; i++) { 
      this.dataListIkuti.push("Item number "+(this.dataListIkuti.length+1));
    } */
   }

  ngOnInit() {
    if(!localStorage.getItem('userProvider')){
      this.router.navigate(['/login', {replaceUrl: true}]);
    }else{
      this.getIkuti();
    }
    //console.log('ngOnInit')
  }
  ionViewDidEnter(){
    this.route.queryParams.subscribe(params => {
      this.refreshPage = params["refreshPage"];
    });
    if(this.refreshPage == 1){
      this.getIkuti()
      console.log('refreshPage')
    }
  }
  change(){
    if(this.theState == false){
      this.getIkuti();
    }else if(this.theState == true){
      this.getKerja();
    }else{
      this.getIkuti();
    }
    console.log(this.theState)
  }

  lihatBerjalan(id:any, subject:any){
    //console.log(id, subject)
    this.router.navigate(['/lihat-berjalan/' + id + '/' + subject]);
  }

   async getIkuti(){
    this.showLoader()
    this.authService.getData('api/provider/v4/berjalan_ikuti_show/' + this.userDetails['id'], this.userDetails['access_token']).subscribe(res => {
      this.responseData = res;
      console.log(this.responseData)
      if(this.responseData.status === '1'){
        this.hideLoader()
        this.items_ikuti = this.responseData['data'];
      }else{
        this.hideLoader()
        localStorage.clear();
        this.router.navigate(['/login', {replaceUrl: true}]);
      }
    }, (err) => {
      this.hideLoader()
      this.presentToast("Server sedang dalam perbaikan, silahkan coba lagi nanti :(");
    });
  } 


  getKerja(){
    this.showLoader()
    this.authService.getData('api/provider/v4/berjalan_kerja_show/' + this.userDetails['id'], this.userDetails['access_token']).subscribe(res => {
      this.responseData = res;
      console.log(this.responseData)
      if(this.responseData.status === '1'){
        this.hideLoader()
       this.items_kerja = this.responseData['data'];
      }else{
        this.hideLoader()
        localStorage.clear();
        this.router.navigate(['/login', {replaceUrl: true}]);
      }
    }, (err) => {
      this.hideLoader()
      this.presentToast("Server sedang dalam perbaikan, silahkan coba lagi nanti :(");
    });
  } 

 

 /*  scrollStart(event:any) { 
    //this.isShown = true;
  }
  onScroll(event:any){
    //this.isShown = false;
  }
  scrollStop(event) {
    //this.isShown = true;
 } */

 async Cancels(id:any, subject : any){
  this.cancels.id = id;
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Apakah anda yakin untuk berhenti mengikuti ' + subject + '?',
    buttons: [
      {
        text: 'TIDAK',
        handler: () => {
          console.log('Kembali clicked');
        }
      },
      {
        text: 'YA',
        handler: () => {
            this.authService.postData(this.cancels, "api/provider/v4/cancel_bid", this.userDetails['access_token']).subscribe(res => {
            this.responseData = res;
            console.log(this.responseData);
            if(this.responseData['status'] == "1"){
             this.getIkuti();
            }else{
               localStorage.clear();
            }
          });  
        }
      }
    ]
  });

  await alert.present();
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
