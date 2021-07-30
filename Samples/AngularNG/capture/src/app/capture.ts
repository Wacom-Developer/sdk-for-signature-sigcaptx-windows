/* **************************************************************************
  capture.ts
   
  This file contains the source code for capturing a signature.
  The "capturesig()" function is activated by the click event on the 
  Capture button on the form which is defined in btncapture.html
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { Component } from '@angular/core';
import { HTMLIds } from "./SigCaptX-Globals";
import { BITMAP_BACKGROUNDCOLOR, BITMAP_IMAGEFORMAT, BITMAP_INKCOLOR, BITMAP_INKWIDTH, BITMAP_PADDING_X, BITMAP_PADDING_Y} from './SigCaptX-Globals';
import { SessionControl } from './SigCaptX-SessionControl';


declare global {
  interface Window {
      JSONreq: any;
      sdkPtr: any;  
    }
}

@Component({
  selector: 'btn-capture',
  templateUrl: './btncapture.html'
})


export class SigCapture 
{
    static callbackFunc:any;
    static dynCapt:any;
    static hash:any;
    static sigCtl: any;
    static sigObj: any;

    static HTMLTagIds = new HTMLIds();  // Set up the array of HTML tags which refer to the various HTML elements on the form

    capturesig()
    {        
        if(null != SigCapture.HTMLTagIds.imageBox.firstChild)
        {
          SigCapture.HTMLTagIds.imageBox.removeChild(SigCapture.HTMLTagIds.imageBox.firstChild);
        }

        if (window.sdkPtr.running) 
        {
          SigCapture.Capture();
        }
        else
        {
          SessionControl.actionWhenRestarted();
          return;
        }
    }    
    
    static print(txt:string)   // Outputs a text string to the message display text box on the main form
    {
      SigCapture.HTMLTagIds.txtDisplay.value += txt + "\n";
      SigCapture.HTMLTagIds.txtDisplay.scrollTop = SigCapture.HTMLTagIds.txtDisplay.scrollHeight; // scroll to end
    }

    static callbackStatusOK ( methodName, status )  // Error handler routine for return values from callbacks
    {
      if(window.sdkPtr.ResponseStatus.OK === status)
      {
        return true;
      }
      else
      {
        SigCapture.print(methodName + " error: " + status);
        return false;
      }
    }

    static Capture()
    {       
        // Construct a hash object to contain the hash
        SigCapture.hash = new window.sdkPtr.Hash(SigCapture.onHashConstructor);
    }

    static onHashConstructor(hashV, status)
    {
        if(window.sdkPtr.ResponseStatus.OK == status)
        {
            SigCapture.GetHash(hashV, SigCapture.onGetInitialHash);
        }
        else
        {
            SigCapture.print("Hash Constructor error: " + status);
            if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
            {
                SigCapture.print("Error: invalid session. Restarting the session.");
                SessionControl.actionWhenRestarted();
            }
        }
    }

    
    // Once the hash value has been calculated successfully next step is to capture the signature
    static onGetInitialHash = () =>
    {
        var firstName = SigCapture.HTMLTagIds.firstName.value;
        var lastName = SigCapture.HTMLTagIds.lastName.value;
        var fullName = firstName + " " + lastName;
        
        SigCapture.dynCapt.Capture(SigCapture.sigCtl, fullName, "Document Approval",  SigCapture.hash, null, SigCapture.onDynCaptCapture);
    }

    static onDynCaptCapture = (dynCaptV, SigObjV, status) =>
    {
        if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
        {
            SigCapture.print("Error: invalid session. Restarting the session.");
            SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.ts
        }
        else
        {
            /* Check the status returned from the signature capture */
            switch( status ) 
            {
                case window.sdkPtr.DynamicCaptureResult.DynCaptOK:
                SigCapture.sigObj = SigObjV;  // Populate the sigObj static property for later use
                SigCapture.print("Signature captured successfully");

                /* Set the RenderBitmap flags as appropriate depending on whether the user wants to use a picture image or B64 text value */
                if (SigCapture.HTMLTagIds.checkBoxUseB64.checked)
                {
                    var outputFlags = window.sdkPtr.RBFlags.RenderOutputBase64 | window.sdkPtr.RBFlags.RenderColor32BPP;
                } 
                else
                {
                    var outputFlags = window.sdkPtr.RBFlags.RenderOutputPicture | window.sdkPtr.RBFlags.RenderColor32BPP;
                }
                SigObjV.RenderBitmap(BITMAP_IMAGEFORMAT, SigCapture.HTMLTagIds.imageBox.clientWidth, SigCapture.HTMLTagIds.imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, SigCapture.onRenderBitmap);
                break;

                case window.sdkPtr.DynamicCaptureResult.DynCaptCancel:
                SigCapture.print("Signature capture cancelled");
                break;
                
                case window.sdkPtr.DynamicCaptureResult.DynCaptPadError:
                SigCapture.print("No capture service available");
                break;
                
                case window.sdkPtr.DynamicCaptureResult.DynCaptError:
                SigCapture.print("Tablet Error");
                break;
                
                case window.sdkPtr.DynamicCaptureResult.DynCaptNotLicensed:
                SigCapture.print("No valid Signature Capture licence found");
                break;
                
                default: 
                SigCapture.print("Capture Error " + status);
                break;
            }
        }
    }
        
    static onRenderBitmap = (sigObjV, bmpObj, status) =>   // Handles the output of the RenderBitmap() function
    {
        if(SigCapture.callbackStatusOK("Signature Render Bitmap", status))
        {
            /* If the user wants to demonstrate the use of B64 image strings then define an image and set its source to the B64 string*/
            if (SigCapture.HTMLTagIds.checkBoxUseB64.checked)
            {
                SigCapture.print("base64_image:>"+bmpObj+"<");
                let img = new Image();
                img.src = "data:image/png;base64," + bmpObj;
        
                if(null == SigCapture.HTMLTagIds.imageBox.firstChild)
                {
                    SigCapture.HTMLTagIds.imageBox.appendChild(img);
                }
                else
                {
                    SigCapture.HTMLTagIds.imageBox.replaceChild(img, SigCapture.HTMLTagIds.imageBox.firstChild);
                }
            }
            else
            {
                /* If RenderBitmap generated a standard image (picture) then just place that picture in the img control on the HTML form */
                if(null == SigCapture.HTMLTagIds.imageBox.firstChild)
                {
                    SigCapture.HTMLTagIds.imageBox.appendChild(bmpObj.image);
                }
                else
                {
                    SigCapture.HTMLTagIds.imageBox.replaceChild(bmpObj.image, SigCapture.HTMLTagIds.imageBox.firstChild);
                }
            }
            /* If the user chose the option to show the SigText value on the form then call the function to do this */
            var checkShowSigtext = (<HTMLInputElement>document.getElementById("chkShowSigText"));
            if (checkShowSigtext.checked)
            {
                sigObjV.GetSigText(SigCapture.onGetSigText);
            }
        } 
    }
        
    /* This function takes the SigText value returned by the callback and places it in the txtSignature tag on the form */
    static onGetSigText = (sigObjV, text, status) =>
    {
        if(SigCapture.callbackStatusOK("Signature Render Bitmap", status))
        {
            SigCapture.HTMLTagIds.textSig.value = text;
        }
    }

    static GetHash = (hash, callback) =>
    {
      SigCapture.callbackFunc = callback;
  
      SigCapture.print("Creating hash:");
      hash.Clear(SigCapture.onClear);   // Clear any pre-existing hash value before creating a new one
    }
  
    static onClear = (hashV, status) =>
    {
      if(SigCapture.callbackStatusOK("Hash Clear", status))
      {
        hashV.PutType(window.sdkPtr.HashType.HashMD5, SigCapture.onPutType);
      } 
    }
      
    static onPutType = (hashV, status) =>
    {
      if(SigCapture.callbackStatusOK("Hash PutType", status))
      {
        var vFname = new window.sdkPtr.Variant();
        vFname.Set(SigCapture.HTMLTagIds.firstName.value);
        hashV.Add(vFname, SigCapture.onAddFname);  // Add the first name to the hash
      } 
    }
      
    static onAddFname = (hashV, status) =>
    {
      if(SigCapture.callbackStatusOK("Hash Add", status))
      {
        var vLname = new window.sdkPtr.Variant();
        vLname.Set(SigCapture.HTMLTagIds.lastName.value);
        hashV.Add(vLname, SigCapture.onAddLname);  // Add the surname to the hash
      } 
    }
      
    static onAddLname = (hashV, status) =>
    {
      if(SigCapture.callbackStatusOK("Hash Add", status))
      {
        SigCapture.callbackFunc();
      } 
    }
}