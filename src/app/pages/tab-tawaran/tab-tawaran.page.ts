import { Component, ViewChild, OnInit } from '@angular/core';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab-tawaran',
  templateUrl: './tab-tawaran.page.html',
  styleUrls: ['./tab-tawaran.page.scss'],
})
export class TabTawaranPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  dataList:any;
  constructor() {
    
    this.dataList = [];
    
    for (let i = 0; i < 10; i++) { 
      this.dataList.push("Item number "+(this.dataList.length+1));
    }
   }

  ngOnInit() {
  }
  loadData(event) {
    
    setTimeout(() => {
    
      for (let i = 0; i < 10; i++) { 
        this.dataList.push("Item number "+(this.dataList.length+1));
      }
      //Hide Infinite List Loader on Complete
      event.target.complete();

      //Rerender Virtual Scroll List After Adding New Data
      this.virtualScroll.checkEnd();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
