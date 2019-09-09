import { Component, OnInit } from '@angular/core';
import { ModalController,  NavController, LoadingController, NavParams, ToastController } from '@ionic/angular';
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
  loaderToShow
  constructor(public loadingController: LoadingController, private navCtrl: NavController, public router: Router, public toastController: ToastController, public authService: AuthService, private modalCtrl:ModalController, public navParams: NavParams, private formBuilder: FormBuilder, ) {
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
    if (this.penawaranForm.invalid) {
        return;
    }
    this.penawaranForm.value['order_id'] = this.order_id;
    this.penawaranForm.value['proposal_by'] = this.userDetails['id'];
    console.log(this.penawaranForm.value)
    this.showLoader()
    this.authService.postData(this.penawaranForm.value, "api/provider/v4/bidding", this.userDetails['access_token']).subscribe(res => {
      console.log(res);
      if(res['status'] == "1"){
        this.hideLoader()
        const result = 1
        /* this.navCtrl.navigateRoot('/tabs/tab-berjalan'); */
        // Double input
        this.modalCtrl.dismiss(result);        
      }else if(res['status'] == "2"){
         this.hideLoader()
         this.presentToast('Sudah mengisi tawaran ini!')
      }else{
        this.hideLoader()
        const result = "404"
        this.presentToast('Access token invalid!!')
        localStorage.clear();
        this.modalCtrl.dismiss(result);        
      }
    }, (err) => {
      this.hideLoader()
      this.presentToast("Server sedang dalam perbaikan, silakan coba lagi nanti :(");
    });   

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  async showLoader() {
    this.loaderToShow = await this.loadingController.create({
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
    this.loadingController.dismiss();

    /*  setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000 ) */
}
}
