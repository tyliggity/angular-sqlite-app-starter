import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sqlscratch',
    loadChildren: () => import('./pages/sqlscratch/sqlscratch.module')
      .then(m => m.SqlscratchPageModule)
  },
  {
    path: '',
    redirectTo: 'sqlscratch',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
