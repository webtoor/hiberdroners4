import { Component, OnInit } from '@angular/core';
import { ModalController,  NavController, LoadingController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-filter-tawaran',
  templateUrl: './filter-tawaran.page.html',
  styleUrls: ['./filter-tawaran.page.scss'],
})
export class FilterTawaranPage implements OnInit {

  constructor(private modalCtrl:ModalController,) { }

  ngOnInit() {
  }
  closeModal(){
    this.modalCtrl.dismiss();
  }

}
