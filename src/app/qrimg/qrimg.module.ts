import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrimgPageRoutingModule } from './qrimg-routing.module';

import { QrimgPage } from './qrimg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrimgPageRoutingModule
  ],
  declarations: [QrimgPage]
})
export class QrimgPageModule {}
