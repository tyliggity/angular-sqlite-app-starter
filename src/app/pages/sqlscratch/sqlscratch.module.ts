import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SqlscratchPageRoutingModule } from './sqlscratch-routing.module';

import { SqlscratchPage } from './sqlscratch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SqlscratchPageRoutingModule
  ],
  declarations: [SqlscratchPage]
})
export class SqlscratchPageModule {}
