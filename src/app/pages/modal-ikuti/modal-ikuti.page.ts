import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-ikuti',
  templateUrl: './modal-ikuti.page.html',
  styleUrls: ['./modal-ikuti.page.scss'],
})
export class ModalIkutiPage implements OnInit {
  penawaranForm : FormGroup;
  submitted = false;
  subject
  userDetails : any;
  order_id;
  constructor(public toastController: ToastController, public authService: AuthService, private modalCtrl:ModalController, public navParams: NavParams, private formBuilder: FormBuilder, ) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
    
    this.order_id = this.navParams.get('id');
    this.subject = this.navParams.get('subject');
    console.log(this.order_id)
    
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
    this.penawaranForm.value['order_id'] = this.order_id;
    this.penawaranForm.value['proposal_by'] = this.userDetails['id'];
    console.log(this.penawaranForm.value)
    /* this.authService.postData(this.penawaranForm.value, "api/provider/v4/bidding", this.userDetails['access_token']).subscribe(res => {
      console.log(res);
      if(res['status'] == "1"){
       //this.getIkuti();
      }else{
         //localStorage.clear();
      }
    });  */ 

  }
}
