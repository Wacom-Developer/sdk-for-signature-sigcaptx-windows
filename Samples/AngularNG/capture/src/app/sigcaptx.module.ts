/* **************************************************************************
  sigcaptx.module.ts
   
  This file defines the modules/components used by the app
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClearSignature } from './clearsig';
import { DisplaySigDetails } from './displaysig';
import { LicenceInfo } from './licinfo';
import { SetSigText } from './setsigtext';
import { ShowSigText } from './chkshowsigtext';
import { SigCapture } from './capture';
import { VerifySig } from './verify';

@NgModule({
    imports: [
      BrowserModule
    ],
    declarations: [
      ClearSignature,
      DisplaySigDetails,
      LicenceInfo,
      SetSigText,
      ShowSigText,
      SigCapture,
      VerifySig
    ],
    bootstrap: [
      ClearSignature,
      DisplaySigDetails,
      LicenceInfo,
      SetSigText,
      ShowSigText,
      SigCapture,
      VerifySig
    ]
  })
  export class SigCaptXModule {}