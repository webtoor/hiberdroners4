import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-berjalan',
  templateUrl: './tab-berjalan.page.html',
  styleUrls: ['./tab-berjalan.page.scss'],
})
export class TabBerjalanPage implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.clear();

  }

}
