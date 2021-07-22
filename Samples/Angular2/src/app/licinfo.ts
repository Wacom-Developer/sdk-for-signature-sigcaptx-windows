/* **************************************************************************
  licinfo.ts
   
  This file contains the source code for displaying the About Box (licence info).
  The "aboutBox()" function is triggered by the click event on the 
  "License Info" button on the form as defined in btnlicinfo.html
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { Component } from '@angular/core';
import { SigCapture } from './capture';
import { SessionControl } from './SigCaptX-SessionControl';

@Component({
    selector: 'btn-licinfo',
    templateUrl: './btnlicinfo.html'
  })
  
  export class LicenceInfo
  {
     aboutBox()
     {
       LicenceInfo.showAboutBox();
     }
  
     // Displays version and licence information about the current Signature SDK and SigCaptX installation
     static showAboutBox = () =>
     {
       console.log("Showing about box");
       
       if(!window.sdkPtr.running || null == SigCapture.sigCtl)
       {
         SigCapture.print("Session error. Restarting the session.");
         SessionControl.actionWhenRestarted();
         return;
       }
       
       SigCapture.sigCtl.AboutBox(LicenceInfo.onAboutBox);
     }
   
     static onAboutBox = (sigCtlV, status) =>
     {
      console.log("Checking about box status");
       if(window.sdkPtr.ResponseStatus.OK != status) 
       {
        SigCapture.print("AboutBox error: " + status);
         if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
         {
          SigCapture.print("Session error. Restarting the session.");
          SessionControl.actionWhenRestarted();
         }
       }
     }
  }