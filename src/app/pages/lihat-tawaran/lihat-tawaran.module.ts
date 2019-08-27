import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LihatTawaranPage } from './lihat-tawaran.page';

const routes: Routes = [
  {
    path: '',
    component: LihatTawaranPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LihatTawaranPage]
})
export class LihatTawaranPageModule {}
