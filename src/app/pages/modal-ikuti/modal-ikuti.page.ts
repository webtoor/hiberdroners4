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
    'offered_price' : [null, Validators.compose([
      Validators.required,
      Validators.pattern("^[0-9]*$")])],
      'comment' : [null],
    });
   }

  ngOnInit() {
  }
  closeModal()
  {
    this.modalCtrl.dismiss();
  }

  get f() { return this.penawaranForm.controls; }
  onFormSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.penawaranForm)
    if (this.penawaranForm.invalid) {
        return;
    }
  }
}
