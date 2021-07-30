/* **************************************************************************
  clearsig.ts
   
  This file contains the source code for clearing the signature image from the image box on the form
  The "clearSignature()" function is activated by the click event on the 
  "Clear" button on the form as defined in btnclear.html
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { Component } from '@angular/core';
import { SigCapture } from "./capture";
import { SessionControl } from './SigCaptX-SessionControl';

@Component({
    selector: 'btn-clear',
    templateUrl: './btnclear.html'
  })
  
  export class ClearSignature
  {
     clearSignature()
     {
       ClearSignature.clearSignature();
     }
  
     /* This function clears the current signature image from the signature control on the form */  
    static clearSignature = () =>
    { 
        if(null != SigCapture.HTMLTagIds.imageBox.firstChild)
        {
            SigCapture.HTMLTagIds.imageBox.removeChild(SigCapture.HTMLTagIds.imageBox.firstChild);
        }
        if (null == SigCapture.sigObj)
        {
            SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
            return;
        }
        SigCapture.sigObj.Clear(ClearSignature.onClearSig);
    }

    static onClearSig(sigObjV, status)
    {
        if(window.sdkPtr.ResponseStatus.OK != status)
        {
            SigCapture.print("ClearSignature() error: " + status);
            if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
            {
                SigCapture.print("Session error. Restarting the session.");
                SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
            }
        }
    }
}