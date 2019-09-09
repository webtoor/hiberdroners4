import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController,  MenuController, NavController, IonInfiniteScroll, IonVirtualScroll, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ModalIkutiPage } from '../modal-ikuti/modal-ikuti.page';
import { FilterTawaranPage } from '../filter-tawaran/filter-tawaran.page';

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
  filter 
  pushNotif
  constructor(private route: ActivatedRoute, public navCtrl :NavController, public modalController: ModalController, public toastController: ToastController,
    public authService: AuthService, public menuCtrl: MenuController,public loadingController: LoadingController, public router : Router) {
    this.menuCtrl.enable(true);  
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
    this.page = 0;
    this.dataList = [];
    this.filter = 0;
   }


  ngOnInit() {

    if(!localStorage.getItem('userProvider')){
      this.router.navigate(['/login'], {replaceUrl: true});
    }else{
      this.FirstData()
    }
   // console.log('ngOnInit')
  }

  /* buttonNav(){
     let navigationExtras: NavigationExtras = {
          queryParams: {
            pushNotifKerja: 1
          }
        };
    this.router.navigate(['/tabs/tab-berjalan'], navigationExtras)
  } */
  ionViewDidEnter(){
    //console.log('ionViewDidEnter')
    this.route.queryParams.subscribe(params => {
      this.pushNotif = params["pushNotif"];
    });
    if((this.refreshPage == 1) || (this.pushNotif == 1)){
      this.FirstData();
      this.refreshPage = null
      this.pushNotif = null
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
      console.log(detail)
      if (detail.data == 1) {
        this.refreshPage = 1;
        let navigationExtras: NavigationExtras = {
          queryParams: {
            refreshPage: 1
          }
        };
        this.navCtrl.navigateRoot(['/tabs/tab-berjalan'], navigationExtras)
      } else if(detail.data == "404"){
        this.router.navigate(['/login'], {replaceUrl: true});
      }
   });
    return await modal.present();
  }


  async modalFilter() {

    const modal = await this.modalController.create({
      component:FilterTawaranPage,
 
    });

    modal.onDidDismiss().then((kode) => {
      if (kode.data) {
        this.page = 0;
        this.totalData = 0;
        this.totalPage = 0;
        console.log(kode.data.kode)
        this.filter = kode.data.kode;
        this.FirstData();
      } 
   });
    return await modal.present();
  }
  doRefresh(event){
    this.page = 1;
    this.filter = 0;
    this.dataList = []
    this.authService.getData('api/provider/v4/tawaran_show/' + this.userDetails['id'] + '/' + '0?page=' + this.page, this.userDetails['access_token']).subscribe(res => {
      this.responseData = res;
      console.log(this.responseData)
      if(this.responseData.status == '1'){
        this.dataList = this.dataList.concat(this.responseData.data.data);
        this.totalData = this.responseData.data.total; 
        this.totalPage = this.responseData.data.last_page;
      }else{
        this.presentToast("Access Token invalid!");
        localStorage.clear();
        this.router.navigate(['/login'], {replaceUrl: true});

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

   async FirstData(){
    this.dataList = [];
    this.showLoader()
    this.page = 1;
    this.authService.getData('api/provider/v4/tawaran_show/' + this.userDetails['id'] + '/' + this.filter + '?page=' + this.page, this.userDetails['access_token']).subscribe(res => {
      this.responseData = res;
      console.log(this.responseData)
      if(this.responseData.status == '1'){
        this.dataList = this.dataList.concat(this.responseData.data.data);
        this.totalData = this.responseData.data.total; 
        this.totalPage = this.responseData.data.last_page;
        this.hideLoader()
      } else{
        this.hideLoader()
        this.presentToast("Access Token invalid!");
        localStorage.clear();
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    }, (err) => {
      this.hideLoader()
      this.presentToast("Server sedang dalam perbaikan, silakan coba lagi nanti :(");
    });
  } 

  getData(){
    console.log(this.page)
    this.page = this.page + 1;
      this.authService.getData('api/provider/v4/tawaran_show/' + this.userDetails['id'] + '/' + this.filter + '?page=' + this.page, this.userDetails['access_token']).subscribe(res => {
        this.responseData = res;
        if(this.responseData.status == '1'){
          this.dataList = this.dataList.concat(this.responseData.data.data);
        this.totalData = this.responseData.data.total; 
        this.totalPage = this.responseData.data.last_page;
        }else{
          this.presentToast("Access Token invalid!");
          localStorage.clear();
          this.router.navigate(['/login'], {replaceUrl: true});
        }
      }, (err) => {
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
