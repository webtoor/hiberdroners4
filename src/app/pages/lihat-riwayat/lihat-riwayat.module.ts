import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LihatRiwayatPage } from './lihat-riwayat.page';

const routes: Routes = [
  {
    path: '',
    component: LihatRiwayatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LihatRiwayatPage]
})
export class LihatRiwayatPageModule {}
