import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, IonInfiniteScroll, IonVirtualScroll, ToastController  } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-berjalan',
  templateUrl: './tab-berjalan.page.html',
  styleUrls: ['./tab-berjalan.page.scss'],
})
export class TabBerjalanPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  userDetails : any;
  loaderToShow: any;
  isShown
  responseData : any;
  dataListIkuti : string[]
  dataListKerja : string[]
  page : number;
  totalData = 0;
  totalPage = 0;
  theState:boolean = false;
  public items_ikuti : any;
  public items_kerja : any;

  constructor(public toastController: ToastController, public authService: AuthService, public loadingController: LoadingController,public router : Router) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
    this.page = 0;
    this.dataListIkuti = [];
    
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
  ionViewDidEnter(){
  
    //console.log('ionViewDidEnter')
  }

  lihatBerjalan(id:any, subject:any){
    //console.log(id, subject)
    this.router.navigate(['/lihat-berjalan/' + id + '/' + subject]);
  }

   getIkuti(){
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
