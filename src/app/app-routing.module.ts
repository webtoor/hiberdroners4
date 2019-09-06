import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

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
 
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'tab-tawaran', loadChildren: './pages/tab-tawaran/tab-tawaran.module#TabTawaranPageModule' },
   */

  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },

  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate : [AuthGuardService] },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule', canActivate : [AuthGuardService]  },

  { path: 'tab-tawaran', loadChildren: './pages/tab-tawaran/tab-tawaran.module#TabTawaranPageModule', canActivate : [AuthGuardService] },

  { path: 'tab-berjalan', loadChildren: './pages/tab-berjalan/tab-berjalan.module#TabBerjalanPageModule', canActivate : [AuthGuardService] },
  { path: 'tab-riwayat', loadChildren: './pages/tab-riwayat/tab-riwayat.module#TabRiwayatPageModule', canActivate : [AuthGuardService] },
  { path: 'lihat-tawaran/:id/:subject', loadChildren: './pages/lihat-tawaran/lihat-tawaran.module#LihatTawaranPageModule', canActivate : [AuthGuardService] },
  { path: 'lihat-berjalan/:id/:subject', loadChildren: './pages/lihat-berjalan/lihat-berjalan.module#LihatBerjalanPageModule', canActivate : [AuthGuardService]  },
  { path: 'modal-ikuti', loadChildren: './pages/modal-ikuti/modal-ikuti.module#ModalIkutiPageModule' },
  { path: 'lihat-riwayat/:id/:subject', loadChildren: './pages/lihat-riwayat/lihat-riwayat.module#LihatRiwayatPageModule', canActivate : [AuthGuardService] },
  { path: 'filter-tawaran', loadChildren: './pages/filter-tawaran/filter-tawaran.module#FilterTawaranPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
