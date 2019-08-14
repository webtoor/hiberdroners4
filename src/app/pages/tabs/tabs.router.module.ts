import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab-tawaran',
        children: [
          {
            path: '',
            loadChildren: '../tab-tawaran/tab-tawaran.module#TabTawaranPageModule'
          }
        ]
      },
      {
        path: 'tab-berjalan',
        children: [
          {
            path: '',
            loadChildren: '../tab-berjalan/tab-berjalan.module#TabBerjalanPageModule'
          }
        ]
      },
      {
        path: 'tab-riwayat',
        children: [
          {
            path: '',
            loadChildren: '../tab-riwayat/tab-riwayat.module#TabRiwayatPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab-tawaran',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab-tawaran',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
