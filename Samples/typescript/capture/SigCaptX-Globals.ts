/* **************************************************************************
  SigCaptX-Globals.ts
   
  This file contains enumerators, function objects and global variables common to various functions
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/

/* Define global variables */
export var wgssSignatureSDK = null;  // Signature SDK object
export var sigObj = null;            // Signature object
export var imageBox = null;
export var sigsdkptr = null;
export var scriptIsRunning = false;  // script run status
export var timeout;

export const BITMAP_BACKGROUNDCOLOR = 0x00FFFFFF;
export const BITMAP_IMAGEFORMAT = "bmp";
export const BITMAP_INKCOLOR = 0x00000000;
export const BITMAP_INKWIDTH = 0.7;
export const BITMAP_PADDING_X = 4;
export const BITMAP_PADDING_Y = 4;

export const TIMEOUT = 1500;         //  Timeout value for connecting to the port used for the SigCaptX service
export const SERVICEPORT = 8000;     //  Port used for the SigCaptX service
export const LICENCEKEY = "<<license>>";  // Licence key used for sigCtl and wizCtl in SigCaptX-SessionControl.js

export class HTMLIds
{
  btnRestore:any;
  checkBoxUseB64:any;
  checkShowSigtext:any;
  firstName:any;
  imageBox:any;
  lastName:any;
  textSig:any;
  txtDisplay:any;

  constructor()
  {
    // Set up static properties for the HTML fields which are needed later
    this.btnRestore = (<HTMLButtonElement>document.getElementById("restore"));
    this.checkBoxUseB64 = (<HTMLInputElement>document.getElementById("chkUseB64Image"));
    this.checkShowSigtext = (<HTMLInputElement>document.getElementById("chkShowSigText"));
    this.firstName = (<HTMLElement>document.getElementById("fname"));
    this.imageBox = (<HTMLElement>document.getElementById("imageBox"));
    this.lastName = (<HTMLElement>document.getElementById("lname"));
    this.textSig = (<HTMLElement>document.getElementById("txtSignature"));
    this.txtDisplay = (<HTMLElement>document.getElementById("txtDisplay"));
  }
}



