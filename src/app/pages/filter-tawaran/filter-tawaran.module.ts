import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FilterTawaranPage } from './filter-tawaran.page';

const routes: Routes = [
  {
    path: '',
    component: FilterTawaranPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FilterTawaranPage]
})
export class FilterTawaranPageModule {}
