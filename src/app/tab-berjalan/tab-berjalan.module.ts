import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabBerjalanPage } from './tab-berjalan.page';

const routes: Routes = [
  {
    path: '',
    component: TabBerjalanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabBerjalanPage]
})
export class TabBerjalanPageModule {}
