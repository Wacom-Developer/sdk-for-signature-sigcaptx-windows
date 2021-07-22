/* **************************************************************************
  displaysig.ts
   
  This file contains the source code for displaying the signature details 
  (who, when why) in the message panel on the main form.
  The "displayDetails()" function is triggered by the click event on the 
  "Signature Details" button on the form as defined in btndisplaysig.html
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { Component } from '@angular/core';
import { SigCapture } from './capture';
import { SessionControl } from './SigCaptX-SessionControl';

@Component({
    selector: 'btn-displaysig',
    templateUrl: './btndisplaysig.html'
  })
  
  export class DisplaySigDetails
  {
    displayDetails()
    {
      console.log("Verifying");
      DisplaySigDetails.displaySignatureDetails();
    }
  
    static displaySignatureDetails = () =>
    {
      if(!window.sdkPtr.running || null == SigCapture.sigObj)
      {
        SigCapture.print("Session error. Restarting the session." );
        SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.ts
        return;
      }
      SigCapture.sigObj.GetIsCaptured(DisplaySigDetails.onGetIsCaptured);  // Check if signature already captured
    }
  
    static onGetIsCaptured = (sigObj, isCaptured, status) =>
    {
      if(window.sdkPtr.ResponseStatus.OK == status) 
      {
        if(!isCaptured)
        {
          SigCapture.print("No signature has been captured yet." );
          return;
        }
        sigObj.GetWho(DisplaySigDetails.onGetWho);
      }
      else 
      {
        SigCapture.print("Signature GetWho error: " + status);
        if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
        {
          SigCapture.print("Session error. Restarting the session.");
          SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.ts
        }
      }
    }
  
    static onGetWho = (sigObjV, who, status) =>
    {
      if(SigCapture.callbackStatusOK("Signature GetWho", status))
      {
        SigCapture.print("  Name:   " + who);
        var tz = window.sdkPtr.TimeZone.TimeLocal;
        SigCapture.sigObj.GetWhen(tz, DisplaySigDetails.onGetWhen);
      } 
    }
    
    static onGetWhen = (sigObjV, when, status) =>
    {
      if(SigCapture.callbackStatusOK("Signature GetWhen", status)) 
      {
        SigCapture.print("  Date:   " + when.toString() );
        SigCapture.sigObj.GetWhy(DisplaySigDetails.onGetWhy);
      } 
    }
    
    static onGetWhy = (sigObjV, why, status) =>
    {
      if(SigCapture.callbackStatusOK("Signature GetWhy", status))
      {
        SigCapture.print("  Reason: " + why);
      }
    }  
  }