import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabRiwayatPage } from './tab-riwayat.page';

const routes: Routes = [
  {
    path: '',
    component: TabRiwayatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabRiwayatPage]
})
export class TabRiwayatPageModule {}
