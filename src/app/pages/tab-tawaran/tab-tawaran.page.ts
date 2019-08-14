import { Component, ViewChild, OnInit } from '@angular/core';
import { LoadingController, IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tab-tawaran',
  templateUrl: './tab-tawaran.page.html',
  styleUrls: ['./tab-tawaran.page.scss'],
})
export class TabTawaranPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  dataList:any;
  userDetails : any;
  filter:any;
  itemsData : any;
  nextPage : any;
  totalPage : any;
  loaderToShow: any;
  isShown
  constructor(public authService: AuthService, public loadingController: LoadingController) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
    this.itemsData = [];
    this.nextPage = 1;

   /*  this.dataList = []
    for (let i = 0; i < 5; i++) { 
      this.dataList.push("Item number "+(this.dataList.length+1));
    } */
   }

  ngOnInit() {
    this.showLoader()
    this.getData();
    this.hideLoader()

  }

  getData(){
    this.authService.getData('api/provider/tawaran_show/' + this.userDetails['id'] + '/' + '0?page=' + this.nextPage).subscribe(res => {
      if(res){
        this.itemsData = this.itemsData.concat(res.data);
        this.nextPage++;
        this.totalPage = res.total;
      }
    }); 
  }

  scrollStart(event:any) { 
    this.isShown = false;
  }
  onScroll(event:any){
    this.isShown = false;
  }
  scrollStop(event) {
    this.isShown = true;
 }
  loadMore(event) {
  /*   console.log(this.dataList.length)
    setTimeout(() => {
    
      for (let i = 0; i < 5; i++) { 
        this.dataList.push("Item number "+(this.dataList.length+1));
      }
      //Hide Infinite List Loader on Complete
      event.target.complete();

      //Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length >= 11) {
        event.target.disabled = true;
      }
    }, 500); */
    console.log(this.itemsData.length)
    setTimeout(() => {
    this.getData()
      //Hide Infinite List Loader on Complete
      event.target.complete();

      //Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();
      if (this.itemsData.length == this.totalPage) {
        event.target.disabled = true;
      }
    }, 500); 
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
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
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 2000);  }
}
