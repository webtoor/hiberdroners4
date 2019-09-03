import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-ikuti',
  templateUrl: './modal-ikuti.page.html',
  styleUrls: ['./modal-ikuti.page.scss'],
})
export class ModalIkutiPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  closeModal()
  {
    this.modalCtrl.dismiss();
  }
}
