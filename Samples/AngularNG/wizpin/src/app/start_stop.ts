/* **************************************************************************
  start_stop.ts
   
  This class with its decorator defines the template HTML file for the
  Start Wizard button and traps and processes its button click event
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { Component } from '@angular/core';
import { SessionControl } from './SigCaptX-SessionControl';

@Component({
    selector: 'btn-startstop',
    templateUrl: './btn-startstop.html'
  })
  
  export class Start_Stop
  {
    start_stop()
    {
        SessionControl.start_stop();
    }
  }