import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
  constructor(private route: ActivatedRoute, public authService: AuthService) { 
    this.subject = this.route.snapshot.paramMap.get('subject');
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  }

  ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('id');
    this.authService.getData('api/provider/v4/detail_show/' + this.order_id, this.userDetails['access_token']).subscribe(res => {
      console.log(res)
      this.responseData = res;
      console.log(this.responseData);
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
        console.log('err')
      }

      },
      err => console.log(err)
    );
   
  }

}
