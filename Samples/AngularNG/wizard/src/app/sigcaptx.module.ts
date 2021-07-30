/* **************************************************************************
  sigcaptx.module.ts
   
  This file defines the modules/components used by the SigCaptX wizard sample 
	app for Angular NG (2+)
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShowSigText } from './chkshowsigtext';
import { Start_Stop } from './startstop';

@NgModule({
    imports: [
      BrowserModule
    ],
    declarations: [
      ShowSigText,
      Start_Stop
    ],
    bootstrap: [
      ShowSigText,
      Start_Stop
    ]
  })
  export class SigCaptXWizModule {}