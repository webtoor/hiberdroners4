import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingController, AlertController,ToastController  } from '@ionic/angular';

declare var google;
@Component({
  selector: 'app-lihat-berjalan',
  templateUrl: './lihat-berjalan.page.html',
  styleUrls: ['./lihat-berjalan.page.scss'],
})
export class LihatBerjalanPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;

  data: any;
  subject : any;
  userDetails : any;
  order_id
  map:any;
  outputs:any;
  area : any;
  responseData
  items
  dataEmail = {"order_id" : "", "email" : ""};
  loaderToShow: any;

  constructor(public router:Router, public alertCtrl: AlertController, private route: ActivatedRoute, public authService: AuthService, public toastController: ToastController,public loadingController: LoadingController) { 
    this.subject = this.route.snapshot.paramMap.get('subject');
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  }

  ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('id');
    this.authService.getData('api/provider/v4/detail_show/' + this.order_id, this.userDetails['access_token']).subscribe(res => {
      console.log(res)
      this.responseData = res;
      if(this.responseData['status'] == '1'){
        this.items = this.responseData['polygon'];
          
    let LatLng = new google.maps.LatLng(this.responseData['polygon'][0]['latitude'], this.responseData['polygon'][0]['longitude']);

    let mapOptions = {
      center:LatLng,
      zoom:17,
      MapTypeID: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      var arr = this.responseData['polygon'];
      var cords = []
      for (var i = 0; i < arr.length; i++) {
        cords.push(new google.maps.LatLng(parseFloat(this.responseData['polygon'][i]['latitude']), parseFloat(this.responseData['polygon'][i]['longitude'])));
      }
      //console.log(cords)
        var polygons = new google.maps.Polygon({
           paths: cords,
           map: this.map,
           strokeColor: '#000',
           strokeOpacity: 0.8,
           strokeWeight: 6,
           fillColor: 'green',
           fillOpacity: 0.35,
         });
         this.map.getBounds(cords);
         cords = [];
         this.outputs = []
         for(var j=0; j < this.responseData['output'].length; j++){
          if(this.responseData['output'][j]['output_id'] == '1'){
            this.outputs.push(' Video')
          }else if(this.responseData['output'][j]['output_id'] == '2'){
            this.outputs.push (' Foto')
          }else if(this.responseData['output'][j]['output_id'] == '3'){
            this.outputs.push(' Peta')
          }else if(this.responseData['output'][j]['output_id'] == '4'){
            this.outputs.push(' Lain-lain')
          }
         }
         /* console.log(this.outputs) */

         var luasArea = google.maps.geometry.spherical.computeArea(polygons.getPath());
         this.area = luasArea.toFixed(2)
         console.log(this.area)
      }else{
        this.presentToast("Access Token invalid!");
        localStorage.clear();
        this.router.navigate(['/login', {replaceUrl: true}]);
      }

    }, (err) => {
      this.presentToast("Server sedang dalam perbaikan, silahkan coba lagi nanti :(");
    });
   
  }

  sendEmail(order_id:any){
    this.showLoader()
    this.dataEmail.order_id = order_id;
    this.dataEmail.email = this.userDetails['email'];
    console.log(this.dataEmail);
    this.authService.postData(this.dataEmail, "api/provider/v4/send_email", this.userDetails['access_token']).subscribe((res) => {
      if (this.responseData["status"] == "1") {
        this.hideLoader();
        this.presentAlert();
        return
      }
      else{
        this.hideLoader();
        this.presentToast("Access Token invalid!");
        localStorage.clear();
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    }, (err) => {
      this.presentToast("Server sedang dalam perbaikan, silahkan coba lagi nanti :(");
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Export KML',
      subHeader: 'Export KML',
      message: 'Silahkan cek email Anda',
      buttons: ['OK']
    });

    await alert.present();
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
    /* this.hideLoader(); */
  }

 

  hideLoader() {
    this.loadingController.dismiss();

    /* setTimeout(() => {
      this.loadingController.dismiss();
    }, 1500);  */ 
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
