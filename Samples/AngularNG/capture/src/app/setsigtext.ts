/* **************************************************************************
  setsigtext.ts
   
  This file contains the source code for regenerating the original signature
  image from the SigText value which is currently displayed in the SigText
  text box on the main form.

  The "setSignatureText()" function is triggered by the click event on the 
  "Restore" button on the form as defined in btnrestore.html
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { Component } from '@angular/core';
import { SigCapture } from "./capture";
import { BITMAP_BACKGROUNDCOLOR, BITMAP_IMAGEFORMAT, BITMAP_INKCOLOR, BITMAP_INKWIDTH, BITMAP_PADDING_X, BITMAP_PADDING_Y } from './SigCaptX-Globals';
import { SessionControl } from './SigCaptX-SessionControl';

@Component({
    selector: 'btn-restore',
    templateUrl: './btnrestore.html'
  })

  export class SetSigText
  {
     setSignatureText()
     {
       SetSigText.restoreSignature();
     }
  
    /* This function takes the SigText value currently displayed on the HTML form and uses it to recreate the signature image shown in the signature control tag on the form */
  
    static restoreSignature = () =>
    {
        if(null === SigCapture.sigObj)
        {
            SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
            return;
        }
        /* First of all take the SigText value currently displayed in the txtSignature field on the form and assign it to the sigObj object */
        SigCapture.sigObj.PutSigText(SigCapture.HTMLTagIds.textSig.value, SetSigText.onPutSigText);
    }

    static onPutSigText = (sigObjV, status) =>
    {
        if(window.sdkPtr.ResponseStatus.OK == status)
        {
            /* Now that the sigObj has been populated with the signature data (via the SigText) it can be used to generate a signature image */
            var outputFlags = window.sdkPtr.RBFlags.RenderOutputPicture | window.sdkPtr.RBFlags.RenderColor24BPP;
            
            SigCapture.sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, SigCapture.HTMLTagIds.imageBox.clientWidth, SigCapture.HTMLTagIds.imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, SetSigText.onRenderBitmapFromSigText);
        }
        else
        {
            SigCapture.print("SetSignatureText() error: " + status); 
            if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
            {
                SigCapture.print("Session error. Restarting the session.");
                SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
            }
        }
    }
    /* Take the image generated by RenderBitmap and use it to populate the signature image control on the form */
    static onRenderBitmapFromSigText = (sigObjV, bmpObj, status) =>
    {
        if(SigCapture.callbackStatusOK("Signature Render Bitmap", status))
        {
            if(null === SigCapture.HTMLTagIds.imageBox.firstChild)
            {
                SigCapture.HTMLTagIds.imageBox.appendChild(bmpObj.image);
            }
            else
            {
                SigCapture.HTMLTagIds.imageBox.replaceChild(bmpObj.image, SigCapture.HTMLTagIds.imageBox.firstChild);
            }
        } 
    } 
}