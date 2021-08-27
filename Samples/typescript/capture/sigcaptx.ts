/* **************************************************************************
  sigcaptx.ts
   
  This Typescript file contains the start-up control file for the capture sample.
  It defines the main SigCapture class with its properties and methods for 
  capturing the signature
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { SessionControl } from './SigCaptX-CaptSessionCtrl';
import { BITMAP_BACKGROUNDCOLOR, BITMAP_IMAGEFORMAT, BITMAP_INKCOLOR, BITMAP_INKWIDTH, BITMAP_PADDING_X, BITMAP_PADDING_Y, HTMLIds} from './SigCaptX-Globals';

declare global {
  interface Window {
      sdkPtr: any;
  }
}

export class SigCapture
{
  static dynCapt:any;
  static hash:any;
  static sigCtl: any;  
  sigObject:any;

  get sigObj()
  {
    return this.sigObject;
  }

  set sigObj(value)
  {
    this.sigObject = value;
  }

  constructor()
  {
    this.sigObject = null;
    SigCapture.dynCapt = null;
    SigCapture.sigCtl = null;
  }

  /*  This is the main function for capturing the signature from the pad */
  capture()
  {
    console.log("Starting capture");
    Utils.print("Starting capture");
    
    if(!window.sdkPtr.running || null == SigCapture.dynCapt)
    {
      Utils.print("Session error. Restarting the session.");
      SessionControl.actionWhenRestarted();   // See SigCaptX-CaptSessionCtrl.js
      return;
    }

    // Construct a hash object to contain the hash
    SigCapture.hash = new window.sdkPtr.Hash(onHashConstructor);

    function onHashConstructor(hashV, status)
    {
      if(window.sdkPtr.ResponseStatus.OK == status)
      {
        Hashing.GetHash(hashV, SigCapture.onGetInitialHash);
      }
      else
      {
        Utils.print("Hash Constructor error: " + status);
        if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
        {
          Utils.print("Error: invalid session. Restarting the session.");
          SessionControl.actionWhenRestarted();
        }
      }
    }
  }

    
  // If the hash value has been calculated successfully next steps is to capture the signature
  static onGetInitialHash = () =>
  {
    var firstName = HTMLTags.firstName.value;
    var lastName = HTMLTags.lastName.value;
    var fullName = firstName + " " + lastName;
    
    SigCapture.dynCapt.Capture(SigCapture.sigCtl, fullName, "Document Approval",  SigCapture.hash, null, SigCapture.onDynCaptCapture);
  }

  static onDynCaptCapture = (dynCaptV, SigObjV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
    {
      Utils.print("Error: invalid session. Restarting the session.");
      SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
    }
    else
    {
      /* Check the status returned from the signature capture */
      switch( status ) 
      {
        case window.sdkPtr.DynamicCaptureResult.DynCaptOK:
          sigCapt.sigObj = SigObjV;  // Populate the sigObj static property for later use
          Utils.print("Signature captured successfully");

          /* Set the RenderBitmap flags as appropriate depending on whether the user wants to use a picture image or B64 text value */
          if (HTMLTags.checkBoxUseB64.checked)
          {
            var outputFlags = window.sdkPtr.RBFlags.RenderOutputBase64 | window.sdkPtr.RBFlags.RenderColor32BPP;
          } 
          else
          {
            var outputFlags = window.sdkPtr.RBFlags.RenderOutputPicture | window.sdkPtr.RBFlags.RenderColor32BPP;
          }
          sigCapt.sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, HTMLTags.imageBox.clientWidth, HTMLTags.imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, SigCapture.onRenderBitmap);
          break;

        case window.sdkPtr.DynamicCaptureResult.DynCaptCancel:
          Utils.print("Signature capture cancelled");
          break;
          
        case window.sdkPtr.DynamicCaptureResult.DynCaptPadError:
          Utils.print("No capture service available");
          break;
          
        case window.sdkPtr.DynamicCaptureResult.DynCaptError:
          Utils.print("Tablet Error");
          break;
          
        case window.sdkPtr.DynamicCaptureResult.DynCaptNotLicensed:
          Utils.print("No valid Signature Capture licence found");
          break;
          
        default: 
        Utils.print("Capture Error " + status);
          break;
      }
    }
  }
    
  static onRenderBitmap = (sigObjV, bmpObj, status) =>
  {
    if(Utils.callbackStatusOK("Signature Render Bitmap", status))
    {
      /* If the user wants to demonstrate the use of B64 image strings then define an image and set its source to the B64 string*/
      if (HTMLTags.checkBoxUseB64.checked)
      {
        Utils.print("base64_image:>"+bmpObj+"<");
        let img = new Image();
        img.src = "data:image/png;base64," + bmpObj;
  
        if(null == HTMLTags.imageBox.firstChild)
        {
          HTMLTags.imageBox.appendChild(img);
        }
        else
        {
          HTMLTags.imageBox.replaceChild(img, HTMLTags.imageBox.firstChild);
        }
      }
      else
      {
        /* If RenderBitmap generated a standard image (picture) then just place that picture in the img control on the HTML form */
        if(null == HTMLTags.imageBox.firstChild)
        {
          HTMLTags.imageBox.appendChild(bmpObj.image);
        }
        else
        {
          HTMLTags.imageBox.replaceChild(bmpObj.image, HTMLTags.imageBox.firstChild);
        }
      }
      /* If the user chose the option to show the SigText value on the form then call the function to do this */
      if (HTMLTags.checkShowSigtext.checked)
      {
        sigObjV.GetSigText(SigCapture.onGetSigText);
      }
    } 
  }
    
  /* This function takes the SigText value returned by the callback and places it in the txtSignature tag on the form */
  static onGetSigText = (sigObjV, text, status) =>
  {
    if(Utils.callbackStatusOK("Signature Render Bitmap", status))
    {
      HTMLTags.textSig.value = text;
    }
  }

  //  This function enables the Restore button if the user has selected the option to output SigText
  enableRestoreButton = () =>
  {      
    if (HTMLTags.checkShowSigtext.checked)
    {
      HTMLTags.btnRestore.disabled = false;
    }
    else
    {
      HTMLTags.btnRestore.disabled = true;
    }
  }

  /* This function clears the current signature image from the signature control on the form */
  clearSignature = () =>
  { 
    if(null != HTMLTags.imageBox.firstChild)
    {
      HTMLTags.imageBox.removeChild(HTMLTags.imageBox.firstChild);
    }
    if (null == sigCapt.sigObj)
    {
      SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
      return;
    }
    sigCapt.sigObj.Clear(onClearSig);

    function onClearSig(sigObjV, status)
    {
      if(window.sdkPtr.ResponseStatus.OK != status)
      {
        Utils.print("ClearSignature() error: " + status);
        if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
        {
          Utils.print("Session error. Restarting the session.");
          SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
        }
      }
    }
  }

  /* This function displays the details of the signature in the text box on the HTML form */

  displaySignatureDetails = () =>
  {
    if(!window.sdkPtr.running || null == sigCapt.sigObj)
    {
      Utils.print("Session error. Restarting the session." );
      SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
      return;
    }
    sigCapt.sigObj.GetIsCaptured(this.onGetIsCaptured);
  }

  onGetIsCaptured = (sigObj, isCaptured, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status) 
    {
      if(!isCaptured)
      {
        Utils.print("No signature has been captured yet." );
        return;
      }
      sigObj.GetWho(this.onGetWho);
    }
    else 
    {
      Utils.print("Signature GetWho error: " + status);
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        Utils.print("Session error. Restarting the session.");
        SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
      }
    }
  }

  onGetWho = (sigObjV, who, status) =>
  {
    if(Utils.callbackStatusOK("Signature GetWho", status))
    {
      Utils.print("  Name:   " + who);
      var tz = window.sdkPtr.TimeZone.TimeLocal;
      sigCapt.sigObj.GetWhen(tz, this.onGetWhen);
    } 
  }
  
  onGetWhen = (sigObjV, when, status) =>
  {
    if(Utils.callbackStatusOK("Signature GetWhen", status)) 
    {
      Utils.print("  Date:   " + when.toString() );
      sigCapt.sigObj.GetWhy(this.onGetWhy);
    } 
  }
  
  onGetWhy = (sigObjV, why, status) =>
  {
    if(Utils.callbackStatusOK("Signature GetWhy", status))
    {
      Utils.print("  Reason: " + why);
    }
  }  


  // This function recalculates the hash value from the first and last names
  // and checks it against the hash embedded in the signature object
  verifySignedData = () =>
  {
    Utils.print("Verifying signed data...");
    if(null == sigCapt.sigObj)
    {
      SessionControl.actionWhenRestarted();
      return;
    }
    SigCapture.hash = null;
    sigCapt.sigObj.GetIsCaptured(this.onGetIsCaptured);
  }
    
  onGetHashForVerification = () =>
  {
    sigCapt.sigObj.CheckSignedData(SigCapture.hash, this.onCheckSignedData);
  }
    
  onCheckSignedData = (hash, status) =>
  {
    Utils.print("Verify result: " + status);
    if(window.sdkPtr.SignedData.DataGood == status)
    {
      Utils.print("Signed Data OK");
    }
    else
    {
      Utils.print("Signed Data Has Changed");
    }
  }

  /* This function takes the SigText value currently displayed on the HTML form and uses it to recreate the signature image shown in the signature control tag on the form */
  setSignatureText = () =>
  {
    if(null == sigCapt.sigObj)
    {
      SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
      return;
    }
    /* First of all take the SigText value currently displayed in the txtSignature field on the form and assign it to the sigObj object */
    sigCapt.sigObj.PutSigText(HTMLTags.textSig.value, this.onPutSigText);
  }

  onPutSigText = (sigObjV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      /* Now that the sigObj has been populated with the signature data (via the SigText) it can be used to geberate a signature image */
      var outputFlags = window.sdkPtr.RBFlags.RenderOutputPicture | window.sdkPtr.RBFlags.RenderColor24BPP;
      
      sigCapt.sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, HTMLTags.imageBox.clientWidth, HTMLTags.imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, this.onRenderBitmapFromSigText);
    }
    else
    {
      Utils.print("SetSignatureText() error: " + status); 
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        Utils.print("Session error. Restarting the session.");
        SessionControl.actionWhenRestarted();  // See SigCaptX-SessionControl.js
      }
    }
  }

  /* Take the image generated by RenderBitmap and use it to populate the signature image control on the form */
  onRenderBitmapFromSigText = (sigObjV, bmpObj, status) =>
  {
    if(Utils.callbackStatusOK("Signature Render Bitmap", status))
    {
      if(null == HTMLTags.imageBox.firstChild)
      {
        HTMLTags.imageBox.appendChild(bmpObj.image);
      }
      else
      {
        HTMLTags.imageBox.replaceChild(bmpObj.image, HTMLTags.imageBox.firstChild);
      }
    } 
  }

   // Displays version and licence information about the current Signature SDK and SigCaptX installation
  aboutBox = () =>
  {
    if(!window.sdkPtr.running || null == SigCapture.sigCtl)
    {
      Utils.print("Session error. Restarting the session.");
      SessionControl.actionWhenRestarted();
      return;
    }
    SigCapture.sigCtl.AboutBox(this.onAboutBox);
  }

  onAboutBox = (sigCtlV, status) =>
  {
    if(window.sdkPtr.ResponseStatus.OK != status) 
    {
      Utils.print("AboutBox error: " + status);
      if(window.sdkPtr.ResponseStatus.INVALID_SESSION == status)
      {
        Utils.print("Session error. Restarting the session.");
        SessionControl.actionWhenRestarted();
      }
    }
  }
}

class Hashing
{
  static callbackFunc:any;

  // This function calculates a hash value using the first and last names on the HTML form
  static GetHash = (hash, callback) =>
  {
    Hashing.callbackFunc = callback;

    Utils.print("Creating hash:");
    hash.Clear(Hashing.onClear);
  }

  static onClear = (hashV, status) =>
  {
    if(Utils.callbackStatusOK("Hash Clear", status))
    {
      hashV.PutType(window.sdkPtr.HashType.HashMD5, Hashing.onPutType);
    } 
  }
    
  static onPutType = (hashV, status) =>
  {
    if(Utils.callbackStatusOK("Hash PutType", status))
    {
      var vFname = new window.sdkPtr.Variant();
      vFname.Set(HTMLTags.firstName.value);
      hashV.Add(vFname, Hashing.onAddFname);
    } 
  }
    
  static onAddFname = (hashV, status) =>
  {
    if(Utils.callbackStatusOK("Hash Add", status))
    {
      var vLname = new window.sdkPtr.Variant();
      vLname.Set(HTMLTags.lastName.value);
      hashV.Add(vLname, Hashing.onAddLname);
    } 
  }
    
  static onAddLname = (hashV, status) =>
  {
    if(Utils.callbackStatusOK("Hash Add", status))
    {
      Hashing.callbackFunc();
    } 
  }
}

export class Utils
{
  // Display a text message in a multi-line text box on the current HTML document
  static print(txt) 
  {
    HTMLTags.txtDisplay.value += txt + "\n";
    HTMLTags.txtDisplay.scrollTop = HTMLTags.txtDisplay.scrollHeight; // scroll to end
  }
  /* This function simply checks the response status set by the previous callback routine and returns true or false.
  If an error status is found an error message is printed containing the name of the calling routine from 
  the parameter and the status code    */
  static callbackStatusOK ( methodName, status )
  {
    if(window.sdkPtr.ResponseStatus.OK == status)
    {
      return true;
    }
    else
    {
      Utils.print(methodName + " error: " + status);
      return false;
    }
  } 
  
  static clearTextBox = () =>
  {
    HTMLTags.txtDisplay.value = "";
  }
}

class eventHandler
{
  btnEvent:any;

  constructor(htmlElement:string, eventType:string, handlerFunc:any)
  {
    this.btnEvent = document.getElementById(htmlElement);
    this.btnEvent.addEventListener(eventType, handlerFunc);
  }
}


// Set up global variables referencing the HTML elements needed later
export const HTMLTags = new HTMLIds();
export const sigCapt = new SigCapture();

// Now start up the session
SessionControl.actionWhenRestarted();

const captureEvent = new eventHandler("capture", "click", sigCapt.capture);
const clearEvent = new eventHandler("clear", "click", sigCapt.clearSignature);
const verifyEvent = new eventHandler("verify", "click", sigCapt.verifySignedData);
const aboutEvent = new eventHandler("licinfo", "click", sigCapt.aboutBox);
const restoreEvent = new eventHandler("restore", "click", sigCapt.setSignatureText);
const showSigEvent = new eventHandler("sigdetails", "click", sigCapt.displaySignatureDetails);
const showSigEvent2 = new eventHandler("imageBox", "dblclick", sigCapt.displaySignatureDetails);
const chkShowSigTextEvent = new eventHandler("chkShowSigText", "click", sigCapt.enableRestoreButton);



