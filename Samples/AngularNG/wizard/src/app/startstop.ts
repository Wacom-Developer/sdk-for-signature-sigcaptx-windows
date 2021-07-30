/* **************************************************************************
  startstop.ts
   
  This class displays the wizard start/stop button and processes its click event
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { Component } from '@angular/core';
import { SessionControl } from './SigCaptX-SessionControl';

@Component({
    selector: 'btn-startstop',
    templateUrl: './btnstartstop.html'
  })
  
  export class Start_Stop
  {
    start_stop()
    {
        SessionControl.start_stop();
    }
  }