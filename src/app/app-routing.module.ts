import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
   /* {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'tab-tawaran', loadChildren: './pages/tab-tawaran/tab-tawaran.module#TabTawaranPageModule' },
   */
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },

   { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'tab-berjalan', loadChildren: './pages/tab-berjalan/tab-berjalan.module#TabBerjalanPageModule' },
  { path: 'tab-riwayat', loadChildren: './pages/tab-riwayat/tab-riwayat.module#TabRiwayatPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
