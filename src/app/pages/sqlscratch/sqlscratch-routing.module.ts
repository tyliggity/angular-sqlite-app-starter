import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SqlscratchPage } from './sqlscratch.page';

const routes: Routes = [
  {
    path: '',
    component: SqlscratchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SqlscratchPageRoutingModule {}
