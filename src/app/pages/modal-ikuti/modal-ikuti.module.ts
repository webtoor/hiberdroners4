import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalIkutiPage } from './modal-ikuti.page';

const routes: Routes = [
  {
    path: '',
    component: ModalIkutiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalIkutiPage]
})
export class ModalIkutiPageModule {}
