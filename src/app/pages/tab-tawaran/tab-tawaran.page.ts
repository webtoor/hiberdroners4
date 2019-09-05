import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, IonInfiniteScroll, IonVirtualScroll, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalIkutiPage } from '../modal-ikuti/modal-ikuti.page';

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
  refreshPage 
  constructor(public modalController: ModalController, public toastController: ToastController,
    public authService: AuthService, public loadingController: LoadingController, public router : Router) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
    this.page = 0;
    this.dataList = [];
  /*   for (let i = 0; i < 10; i++) { 
      this.dataList.push("Item number "+(this.dataList.length+1));
    } */
   }

  ngOnInit() {
    if(!localStorage.getItem('userProvider')){
      this.router.navigate(['/login', {replaceUrl: true}]);
    }else if(this.refreshPage == null){
      this.FirstData();
    }
    //console.log('ngOnInit')
  }
  ionViewWillEnter(){
    if(this.refreshPage == "1"){
      this.dataList = []
      this.FirstData();
      this.refreshPage = null
      console.log('ionViewWillEnter')

    }
  }
  async modalIkuti(id:any, subject:any) {

    const modal = await this.modalController.create({
      component: ModalIkutiPage,
      componentProps: {
        id: id,
        subject : subject
     }
    });

    modal.onDidDismiss().then((detail) => {
      if (detail.data === "1") {
        this.refreshPage = "1";
        console.log(this.refreshPage)
        this.router.navigateByUrl('/tabs/tab-berjalan')
      } else if(detail.data === "404"){
        this.router.navigate(['/login', {replaceUrl: true}]);
      }
   });
    return await modal.present();
  }
  doRefresh(event){
    this.page = 1;
    this.dataList = []
    this.authService.getData('api/provider/v4/tawaran_show/' + this.userDetails['id'] + '/' + '0?page=' + this.page, this.userDetails['access_token']).subscribe(res => {
      this.responseData = res;
      console.log(this.responseData)
      if(this.responseData.status == '1'){
        this.dataList = this.dataList.concat(this.responseData.data.data);
        this.totalData = this.responseData.data.total; 
        this.totalPage = this.responseData.data.last_page;
      }else{
        localStorage.clear();
        this.router.navigate(['/login', {replaceUrl: true}]);
      }
    }, (err) => {
      this.presentToast("Server sedang dalam perbaikan, silakan coba lagi nanti :(");
    });
    setTimeout(() => {
      /* this.infiniteScroll.disabled = false; */
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }

   FirstData(){
    this.showLoader()
    this.page = 1;
    this.authService.getData('api/provider/v4/tawaran_show/' + this.userDetails['id'] + '/' + '0?page=' + this.page, this.userDetails['access_token']).subscribe(res => {
      this.responseData = res;
      console.log(this.responseData)
      if(this.responseData.status == '1'){
        this.hideLoader()
        this.dataList = this.dataList.concat(this.responseData.data.data);
        this.totalData = this.responseData.data.total; 
        this.totalPage = this.responseData.data.last_page;
      } else{
        this.hideLoader()
        localStorage.clear();
        this.router.navigate(['/login', {replaceUrl: true}]);
      }
    }, (err) => {
      this.hideLoader()
      this.presentToast("Server sedang dalam perbaikan, silakan coba lagi nanti :(");
    });
  } 

  getData(){
    this.page = this.page + 1;
      this.authService.getData('api/provider/v4/tawaran_show/' + this.userDetails['id'] + '/' + '0?page=' + this.page, this.userDetails['access_token']).subscribe(res => {
        this.responseData = res;
        if(this.responseData.status == '1'){
          this.dataList = this.dataList.concat(this.responseData.data.data);
        this.totalData = this.responseData.data.total; 
        this.totalPage = this.responseData.data.last_page;
        }else{
          this.hideLoader()
          localStorage.clear();
          this.router.navigate(['/login', {replaceUrl: true}]);
        }
      }, (err) => {
        this.hideLoader()
        this.presentToast("Server sedang dalam perbaikan, silakan coba lagi nanti :(");
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

  lihatTawaran(id:any, subject:any){
    //console.log(id, subject)

    this.router.navigate(['/lihat-tawaran/' + id + '/' + subject]);

  }

  async showLoader() {
    this.loaderToShow = await this.loadingController.create({
      message: 'Processing Server Request'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        //console.log('Loading dismissed!');
      });
    });
    /* this.hideLoader(); */
  }

  hideLoader() {
    /* this.loadingController.dismiss(); */

    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);  
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
