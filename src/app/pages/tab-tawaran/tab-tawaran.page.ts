import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, IonInfiniteScroll, IonVirtualScroll, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-tawaran',
  templateUrl: './tab-tawaran.page.html',
  styleUrls: ['./tab-tawaran.page.scss'],
})
export class TabTawaranPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  userDetails : any;
  loaderToShow: any;
  isShown
  responseData : any;
  dataList : string[]
  page : number;
  totalData = 0;
  totalPage = 0;

  constructor(public toastController: ToastController,
    public authService: AuthService, public loadingController: LoadingController,public router : Router) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
    this.page = 0;
    this.dataList = [];
    
  /*   for (let i = 0; i < 10; i++) { 
      this.dataList.push("Item number "+(this.dataList.length+1));
    } */
   }

  ngOnInit() {
    //console.log('ngOnInit')
  }
  ionViewDidEnter(){
    if(!localStorage.getItem('userProvider')){
      this.router.navigate(['/login', {replaceUrl: true}]);
    }else{
      this.FirstData();
    }
    //console.log('ionViewDidEnter')
  }
  doRefresh(event){
    this.page = 1;
    this.dataList = []
    this.authService.getData('api/provider/v4/tawaran_show/' + this.userDetails['id'] + '/' + '0?page=' + this.page, this.userDetails['access_token']).subscribe(res => {
      this.responseData = res;
      console.log(this.responseData)
      if(this.responseData != null){
        this.dataList = this.dataList.concat(this.responseData.data);
        this.totalData = this.responseData.total; 
        this.totalPage = this.responseData.last_page;
      }else{
        localStorage.clear();
        this.router.navigate(['/login', {replaceUrl: true}]);
      }
    }, (err) => {
      this.presentToast("Server sedang dalam perbaikan, silahkan coba lagi nanti :(");
    });
    setTimeout(() => {
      /* this.infiniteScroll.disabled = false; */
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

   FirstData(){
    this.showLoader()
    this.page = this.page + 1;
    this.authService.getData('api/provider/v4/tawaran_show/' + this.userDetails['id'] + '/' + '0?page=' + this.page, this.userDetails['access_token']).subscribe(res => {
      this.responseData = res;
      console.log(this.responseData)
      if(this.responseData != null){
        this.dataList = this.dataList.concat(this.responseData.data);
        this.totalData = this.responseData.total; 
        this.totalPage = this.responseData.last_page;
        this.hideLoader()
      } else{
        localStorage.clear();
        this.router.navigate(['/login', {replaceUrl: true}]);
      }
    }, (err) => {
      this.presentToast("Server sedang dalam perbaikan, silahkan coba lagi nanti :(");
    });
  } 

  getData(){
    this.page = this.page + 1;
      this.authService.getData('api/provider/v4/tawaran_show/' + this.userDetails['id'] + '/' + '0?page=' + this.page, this.userDetails['access_token']).subscribe(res => {
        this.responseData = res;
        if(this.responseData != null){
          this.dataList = this.dataList.concat(this.responseData.data);
          this.totalData = this.responseData.total; 
          this.totalPage = this.responseData.last_page;
        }else{
          localStorage.clear();
          this.router.navigate(['/login', {replaceUrl: true}]);
        }
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
  loadMore(event) {
    setTimeout(() => {
      this.getData()
      event.target.complete();
      console.log(this.page, this.totalPage)
    
      //Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.page == this.totalPage) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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

    /* setTimeout(() => {
      this.loadingController.dismiss();
    }, 2000);   */
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
