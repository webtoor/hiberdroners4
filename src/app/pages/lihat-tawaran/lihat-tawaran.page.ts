import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lihat-tawaran',
  templateUrl: './lihat-tawaran.page.html',
  styleUrls: ['./lihat-tawaran.page.scss'],
})
export class LihatTawaranPage implements OnInit {
  data: any;

  constructor(public router : Router, private route: ActivatedRoute) { 
    var as = this.route.snapshot.paramMap.get('id');
    console.log(as)
  }

  ngOnInit() {
  }

}
