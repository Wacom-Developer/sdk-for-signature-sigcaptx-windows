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
export const CHECKBOX_USETICKSYMBOL = 2;  // Specifies whether the tick symbol should be used to show that the checkbox has been clicked

export const SOLIDLINE = 1;            // Used for drawing lines and rectangles
export const OUTLINE = 4;              // Ditto

export const TIMEOUT = 1500;         //  Timeout value for connecting to the port used for the SigCaptX service
export const SERVICEPORT = 8000;     //  Port used for the SigCaptX service
export const LICENCEKEY = "<<license>>"; 
// Licence key used for sigCtl and wizCtl in SigCaptX-SessionControl.js

export const buttonEvent =
{
  NEXT: "Next",
  CHECK: "Check",
  CANCEL: "Cancel",
  CLEAR:  "Clear",
  OK:     "OK"
};

export const buttonFunction =
{
  PREVIOUS: "PREVIOUS",
  CANCEL:   "CANCEL"
};

export const checkBoxSizes =
{
  STU300_Small:  12,
  STU300_Large:  20,
  STU430_Small:  12,
  STU430_Large:  30,
  STU500_Small:  22,
  STU500_Large:  40,
  STU5X0_Small:  22,
  STU5X0_Large:  40
};

export const checkSizeSelection =
{
  LARGE: "LARGE",
  STANDARD: "STANDARD"
};

export const padColors =
{
   BLUE: "0R 0G 0.8B",
   GREEN: "0R 0.8G 0B",
   BLACK: "0R 0G 0B",
   WHITE: "1R 1G 1B",
   PURPLE: "0.7R 0.3G 1B",
   RED: "0.6R 0G 0.2B"
};

export const padRange = 
{
   STU300: "300",
   STU430: "430",
   STU500: "500",
   STU5X0: "5X0"
};

export const padType = 
{
   STU300: "Wacom STU-300",
   STU430: "Wacom STU-430",
   STU500: "Wacom STU-500",
   STU5X0: "Wacom STU-520, 530, 540 or 541"
};

export const radioSelection =
{
  MALE:  "Male",
  FEMALE: "Female"  
};

export const textSource = {
  LOCAL:  1,
  REMOTE: 2,
  UTF8:   3,
  STANDARD: 4
};

export class HTMLIds
{
  btnStartStopWizard:any;
  checkDisplayWizard:any;
  checkLargeCheckBox:any;
  checkShowSigtext:any;
  imageBox:any;
  radioRemote:any;
  radioStandard:any;
  radioUTF8:any;
  textSig:any;
  txtDisplay:any;

  constructor()
  {
    // Set up static properties for the HTML fields which are needed later
    this.btnStartStopWizard = (<HTMLButtonElement>document.getElementById("btnStartStop"));
    this.checkShowSigtext = (<HTMLInputElement>document.getElementById("chkShowSigText"));
    this.checkDisplayWizard = (<HTMLInputElement>document.getElementById("chkDisplayWizard"));
    this.checkLargeCheckBox = (<HTMLInputElement>document.getElementById("chkLargeCheckBox"));
    this.imageBox = (<HTMLElement>document.getElementById("imageBox"));
    this.radioRemote = (<HTMLInputElement>document.getElementById("remote"));
    this.radioStandard = (<HTMLInputElement>document.getElementById("standard"));
    this.radioUTF8 = (<HTMLInputElement>document.getElementById("utf8"));
    this.textSig = (<HTMLElement>document.getElementById("txtSignature"));
    this.txtDisplay = (<HTMLElement>document.getElementById("txtDisplay"));
  }
}

// Set up the classes used for defining the various objects which are to be displayed on the pad
export class textObject
{
  textString: string;
  xPos:any;
  yPos:any;
  fontName:string;
  fontSize:number;
  fontBackColor:string;
  fontForeColor:string;
}

export class checkboxObject
{
  xPos:number;
  yPos:number;
  options:any;
  fontName:string;
  fontSize:number;
  fontBackColor:string;
  fontForeColor:string;
};

export class radioObject
{
  xPos:any;
  yPos:any;
  buttonLabel:string;
  groupName:string;
  buttonChecked:boolean;
  fontBackColor:string;
  fontForeColor:string;
};

export class buttonObject
{
  xPos:any;
  yPos:any;
  buttonType:string;
  buttonText:string;
  width:number;
  imageFile:string;
  fontBackColor:string;
  fontForeColor:string;
};

export class rectangleObject
{
  x1Pos:any;
  y1Pos:any;
  x2Pos:any;
  y2Pos:any;
  lineWidth:number;
  options:any;
  fontBackColor:string;
  fontForeColor:string;
};

export class lineObject
{
  x1Pos:any;
  y1Pos:any;
  x2Pos:any;
  y2Pos:any;
  lineWidth:number;
  options:any;
  fontBackColor:string;
  fontForeColor:string;
};

