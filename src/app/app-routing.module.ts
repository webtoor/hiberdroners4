import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 /*  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab-tawaran', loadChildren: './tab-tawaran/tab-tawaran.module#TabTawaranPageModule' },
   */
   { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab-berjalan', loadChildren: './tab-berjalan/tab-berjalan.module#TabBerjalanPageModule' },
  { path: 'tab-riwayat', loadChildren: './page/tab-riwayat/tab-riwayat.module#TabRiwayatPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
