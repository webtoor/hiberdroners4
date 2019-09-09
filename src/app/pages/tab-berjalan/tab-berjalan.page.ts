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
  responseDatas : any;

  theState:boolean = false;
  public items_ikuti : any;
  public items_kerja : any;
  cancels :any =  { "id" : ""}
  refreshPage
  pushNotifKerja
  constructor(private route: ActivatedRoute, public alertController: AlertController, public toastController: ToastController, public authService: AuthService, public loadingController: LoadingController,public router : Router) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
    console.log(this.theState)
   }

  ngOnInit() {
    console.log(this.refreshPage, this.pushNotifKerja)
    /* this.route.queryParams.subscribe(params => {
      this.refreshPage = params["refreshPage"];
      this.pushNotifKerja = params["pushNotifKerja"];
    }); */
    if((!this.refreshPage) && (!this.pushNotifKerja)){
      this.getIkuti()
      this.refreshPage = null
      this.pushNotifKerja = null
    }
   
   /*  if(this.refreshPage == 1){
      this.theState = false
      this.getIkuti()
      this.refreshPage = null
      //console.log('refreshPage')
    }
    if(this.pushNotifKerja == 1){
      this.theState = true
      this.getKerja()
      this.pushNotifKerja = null
     // console.log('pushNotifKerja')
    } */
  }

  ionViewDidEnter(){ 
    if(!localStorage.getItem('userProvider')){
      this.router.navigate(['/login'], {replaceUrl: true});
    }
    console.log('ionViewDidEnter')
    this.route.queryParams.subscribe(params => {
      this.refreshPage = params["refreshPage"];
      this.pushNotifKerja = 1
    });

    if(this.refreshPage == 1){
      this.theState = false
      this.refreshPage = null
      //console.log('refreshPage')
    } 
     if(this.pushNotifKerja == 1){
      this.theState = true
      this.pushNotifKerja = null
      console.log('pushNotifKerja')
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
        this.items_ikuti = this.responseData['data'];
        this.hideLoader()
      }else{
        this.hideLoader()
        this.presentToast("Access Token invalid!");
        localStorage.clear();
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    }, (err) => {
      this.hideLoader()
      this.presentToast("Server sedang dalam perbaikan, silahkan coba lagi nanti :(");
    });
  } 


  async getKerja(){
    this.showLoader()
    this.authService.getData('api/provider/v4/berjalan_kerja_show/' + this.userDetails['id'], this.userDetails['access_token']).subscribe(res => {
      this.responseDatas = res;
      console.log(this.responseDatas)
      if(this.responseDatas.status === '1'){
        this.items_kerja = this.responseDatas['data'];
        this.hideLoader()

      }else{
        this.hideLoader()
        this.presentToast("Access Token invalid!");
        localStorage.clear();
        this.router.navigate(['/login'], {replaceUrl: true});
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
              this.presentToast("Access Token invalid!");
              localStorage.clear();
              this.router.navigate(['/login'], {replaceUrl: true});
            }
          });  
        }
      }
    ]
  });

  await alert.present();
}

  async showLoader() {
    const loaderToShow = await this.loadingController.create({
      message: 'Processing Server Request',
      duration : 1000
    })/* .then((res) => {
      res.present();
      
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    }); */

    await loaderToShow.present()
    /* this.hideLoader(); */
  }

  hideLoader() {
    this.loadingController.dismiss();

  /*  setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000); */  
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
