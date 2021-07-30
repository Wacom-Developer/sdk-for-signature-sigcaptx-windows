/* **************************************************************************
  sigcaptx.module.ts
   
  This file defines the modules/components used by the SigCaptX wizard PIN sample 
	app for Angular NG (2+)
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Start_Stop } from './start_stop';

@NgModule({
    imports: [
      BrowserModule
    ],
    declarations: [
      Start_Stop
    ],
    bootstrap: [
      Start_Stop
    ]
  })
  export class SigCaptXWizPinModule {}