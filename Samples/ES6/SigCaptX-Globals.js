/* **************************************************************************
  SigCaptX-Globals.js
   
  This file contains enumerators, function objects and global variables common to various functions
  
  Copyright (c) 2021 Wacom Ltd. All rights reserved.
  
   v4.0
  
***************************************************************************/

/* Define global variables */
let buttonTextType = null;    // Flag indicating where the text for the buttons should come from
let display_1 = null;         // Object containing details of all the wizard objects for screen 1 in the sequence
let display_2 = null;					// Object containing details of all the wizard objects for screen 2 in the sequence
let display_3 = null;					// Object containing details of all the wizard objects for screen 3 in the sequence
let dynCapt = null;           // Dynamic Capture object
let HTMLIds = null;						// Global object holding references to all the input fields on the HTML form
let inputObj = null;          // InputObj object;
let numScreenDisplays = 0;    // Number of screen displays involved in the wizard
let pad = null                // created on script start, sets up pad object definitions
let scriptIsRunning = false;  // script running status
let sigCtl = null;            // Signature Control object
let sigDetails = null;        // Object used for defining 2 methods which are related to signature display
let sigDisplay = null;        // The SigDisplay class from which this object derives provides methods for 
															// clearing and displaying the image box containing the signature image
let sigObj = null;            // Signature object
let sigVerify = null;         // The SigVerify class used to generate this object contains methods for hash verification
let timeout = null;           // Used in SigCaptX-SessionControl.js to define the timeout period for connection attempts 
															// to the SigCaptX service
let wgssSignatureSDK = null;  // Signature SDK object
let wizCtl = null;            // Wizard object

// The BITMAP values are used for calls to RenderBitMap in SigCapX-Utils.js
const BITMAP_BACKGROUNDCOLOR = 0x00FFFFFF;
const BITMAP_IMAGEFORMAT = "bmp";
const BITMAP_INKCOLOR = 0x00000000;
const BITMAP_INKWIDTH = 0.7;
const BITMAP_PADDING_X = 4;
const BITMAP_PADDING_Y = 4;

const CHECKBOX_USETICKSYMBOL = 2;  // Specifies whether the tick symbol should be used to show that the checkbox has been clicked
const LICENCEKEY ="eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA"; 
 // Licence key used for sigCtl and wizCtl in SigCaptX-SessionControl.js
const OUTLINE = 4;            // Used for drawing lines and rectangles
const PIN_MAXLENGTH = 4;      //  Max length of PIN 
const PIN_MINLENGTH = 1;      //  Min length of PIN
const SERVICEPORT = 8000;    //  Port used for the SigCaptX service
const SOLIDLINE = 1;          // Used for drawing lines and rectangles
const TIMEOUT = 1500;         //  Timeout value for connecting to the port used for the SigCaptX service

const padRange = Object.freeze({
    STU300: "300",
    STU430: "430",
		STU500:	"500",
    STU5X0: "5X0"
});

const padType = Object.freeze({
   STU300: "Wacom STU-300",
   STU430: "Wacom STU-430",
   STU500: "Wacom STU-500",
   STU5X0: "Wacom STU-520, 530, 540 or 541"
});

const buttonFunction = Object.freeze({
  PREVIOUS: "PREVIOUS",
  CANCEL:   "CANCEL"
});

const checkSizeSelection = Object.freeze({
  LARGE: "LARGE",
  STANDARD: "STANDARD"
});

const checkSize = Object.freeze({
  STU300_Small:  12,
  STU300_Large:  20,
  STU430_Small:  12,
  STU430_Large:  30,
  STU500_Small:  22,
  STU500_Large:  40,
  STU5X0_Small:  22,
  STU5X0_Large:  40
});

const padColors = Object.freeze({
   BLUE: "0R 0G 0.8B",
   GREEN: "0R 0.8G 0B",
   BLACK: "0R 0G 0B",
   WHITE: "1R 1G 1B",
   PURPLE: "0.7R 0.3G 1B",
   RED: "0.6R 0G 0.2B"
});

const textSource = Object.freeze({
  LOCAL:  1,
  REMOTE: 2,
  UTF8:   3,
  STANDARD: 4
});

const buttonEvent = Object.freeze({
  NEXT: "Next",
  CHECK: "Check",
  CANCEL: "Cancel",
  CLEAR:  "Clear",
  OK:     "OK"
});

const radioSelection = Object.freeze({
  MALE:  "Male",
  FEMALE: "Female"  
});

class WizObject  // Base class from which all the rest are derived, not actually used to create an object
{
	constructor(x, y, font, fontBold, size, backColor = "", foreColor = "")
	{
		this.xPos = x;
		this.yPos = y;
		this.fontName = font;
		this.fontSize = size;
		this.fontBold = fontBold;
		this.fontBackColor = backColor;
		this.fontForeColor = foreColor;
	}
}
class WizTextObject extends WizObject
{
	constructor(type, txt, x, y, font, bold, size, backColor = "", foreColor = "")
	{
		super(x, y, font, bold, size, backColor, foreColor);
		this.type = type;
		this.textString = txt;
	}
}
class CheckBoxObject extends WizObject
{
	constructor(x, y, font, size, backColor, foreColor, opts)
	{
		super(x, y, font, false, size, backColor, foreColor);
		this.options = opts;
	}
}
class RadioObject extends WizObject
{
	constructor(x, y, font, size, backColor, foreColor, label, group, checked)
	{
		super(x, y, font, size, backColor, foreColor);
		this.buttonLabel = label;
		this.groupName = group;
		this.buttonChecked = checked;
	}
}
class ButtonObject extends WizObject
{
	constructor(x, y, font, bold, size, backColor, foreColor, txt, type, width, imageFile)
	{
		super(x, y, font, bold, size, backColor, foreColor);
		this.buttonBold = bold;
		this.buttonSize = size;
		this.buttonText = txt;
		this.buttonType = type;
		this.width = width;
		this.imageFile = imageFile;
	}
}
class ShapeObject extends WizObject
{
	constructor(x, y, font, size, backColor, foreColor, x2, y2, lineWidth, opts)
	{
		super(x, y, font, size, backColor, foreColor);
		this.x1Pos = x;
		this.y1Pos = y;
		this.x2Pos = x2;
		this.y2Pos = y2;
		this.lineWidth = lineWidth;
		this.options = opts;
	}
}

class HTMLElementIds   // Holds references to all the input and display fields on the HTML form
{
	constructor()
	{
		// This first group of IDs reference the HTML fields on the Capture form
		this.restore = document.getElementById("Restore");
		this.fname = document.getElementById("fname");
		this.lname = document.getElementById("lname");
		this.chkUseB64Image = document.getElementById("chkUseB64Image");
		this.chkShowSigText = document.getElementById("chkShowSigText");
		this.txtSignature = document.getElementById("txtSignature");
				
		this.imageBox = document.getElementById("imageBox");
		this.btnStartStopWizard = document.getElementById("btnStartStopWizard");
		this.chkDisplayWizard = document.getElementById("chkDisplayWizard");
		this.chkLargeCheckbox = document.getElementById("chkLargeCheckbox");
		this.chkSigText = document.getElementById("chkSigText");
		this.standard = document.getElementById("standard");
		this.utf8 = document.getElementById("utf8");
		this.local = document.getElementById("local");
		this.remote = document.getElementById("remote");
		this.txtDisplay = document.getElementById("txtDisplay");

	}
}