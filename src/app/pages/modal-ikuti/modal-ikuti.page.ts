import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-ikuti',
  templateUrl: './modal-ikuti.page.html',
  styleUrls: ['./modal-ikuti.page.scss'],
})
export class ModalIkutiPage implements OnInit {
  penawaranForm : FormGroup;
  submitted = false;
  constructor(private modalCtrl:ModalController, private formBuilder: FormBuilder, ) {
    this.penawaranForm = this.formBuilder.group({
      'offered_price' : [null, Validators.required],
      'comment' : [null, Validators.required],
    });
   }

  ngOnInit() {
  }
  closeModal()
  {
    this.modalCtrl.dismiss();
  }
  onFormSubmit(){
    
  }
}
