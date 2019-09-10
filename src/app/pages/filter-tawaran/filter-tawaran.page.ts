import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
  allType() {
    this.modalCtrl.dismiss({
      kode : '0'
    });
  }
  // Pemetaan Tanaman
  petaTanaman() {
    this.modalCtrl.dismiss({
      kode : '1'
    });
  }
  // Liburan
  Liburan() {
    this.modalCtrl.dismiss({
      kode : '2'
    });
  }
  
  // lalu-lintas
  laluLintas() {
    this.modalCtrl.dismiss({
      kode : '3'
    });
  }

  // konsBangunan
  konsBangunan() {
    this.modalCtrl.dismiss({
      kode : '4'
    });
  }

   // Pengawasan
   pengawasan() {
    this.modalCtrl.dismiss({
      kode : '5'
    });
  }

}
