/* **************************************************************************
  SigCaptX-Globals.ts
   
  This file contains enumerators, function objects and global variables common to various functions
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/

/* Define global variables */
export var wgssSignatureSDK = null;  // Signature SDK object
export var sigsdkptr = null;
export var timeout;

export const BITMAP_BACKGROUNDCOLOR = 0x00FFFFFF;
export const BITMAP_IMAGEFORMAT = "bmp";
export const BITMAP_INKCOLOR = 0x00000000;
export const BITMAP_INKWIDTH = 0.7;
export const BITMAP_PADDING_X = 4;
export const BITMAP_PADDING_Y = 4;

export const TIMEOUT = 1500;         //  Timeout value for connecting to the port used for the SigCaptX service
export const SERVICEPORT = 8000;     //  Port used for the SigCaptX service
export const LICENCEKEY = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA"; 
// Licence key used for sigCtl and wizCtl in SigCaptX-SessionControl.js

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



