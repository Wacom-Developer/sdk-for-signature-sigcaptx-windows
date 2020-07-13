/* **************************************************************************
  SigCaptX-Globals.js
   
  This file contains enumerators, function objects and global variables common to various functions
  
  Copyright (c) 2018 Wacom Co. Ltd. All rights reserved.
  
   v4.0
  
***************************************************************************/

/* Define global variables */
var wgssSignatureSDK = null;  // Signature SDK object
var sigObj = null;            // Signature object
var sigCtl = null;            // Signature Control object
var dynCapt = null;           // Dynamic Capture object
var wizCtl = null;            // Wizard object
var scriptIsRunning = false;  // script run status
var pad = null                // created on script start, sets pad control data from class CPadCtl
var inputObj = null;          // InputObj object;
var numScreenDisplays = 0;    // Number of screen displays involved in the wizard

var SOLIDLINE = 1;            // Used for drawing lines and rectangles
var OUTLINE = 4;              // Ditto
var CHECKBOX_USETICKSYMBOL = 2;  // Specifies whether the tick symbol should be used to show that the checkbox has been clicked

const BITMAP_BACKGROUNDCOLOR = 0x00FFFFFF;
const BITMAP_IMAGEFORMAT = "bmp";
const BITMAP_INKCOLOR = 0x00000000;
const BITMAP_INKWIDTH = 0.7;
const BITMAP_PADDING_X = 4;
const BITMAP_PADDING_Y = 4;

const TIMEOUT = 1500;         //  Timeout value for connecting to the port used for the SigCaptX service
const SERVICEPORT = 8000;     //  Port used for the SigCaptX service
const LICENCEKEY = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA";
const PIN_MAXLENGTH = 4;      //  Max lenght of PIN 
const PIN_MINLENGTH = 1;      //  Min length of PIN

var padRange = 
{
   STU300: "300",
   STU430: "430",
   STU500: "500",
   STU5X0: "5X0"
};

var padType = 
{
   STU300: "Wacom STU-300",
   STU430: "Wacom STU-430",
   STU500: "Wacom STU-500",
   STU5X0: "Wacom STU-520, 530, 540 or 541"
};

var buttonFunction =
{
  PREVIOUS: "PREVIOUS",
  CANCEL:   "CANCEL"
};

var checkSizeSelection =
{
  LARGE: "LARGE",
  STANDARD: "STANDARD"
};

var checkSize =
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

var padColors =
{
   BLUE: "0R 0G 0.8B",
   GREEN: "0R 0.8G 0B",
   BLACK: "0R 0G 0B",
   WHITE: "1R 1G 1B",
   PURPLE: "0.7R 0.3G 1B",
   RED: "0.6R 0G 0.2B"
};

var textSource = {
  LOCAL:  1,
  REMOTE: 2,
  UTF8:   3,
  STANDARD: 4
};

var buttonEvent =
{
  NEXT: "Next",
  CHECK: "Check",
  CANCEL: "Cancel",
  CLEAR:  "Clear",
  OK:     "OK"
};

var radioSelection =
{
  MALE:  "Male",
  FEMALE: "Female"  
};

// Set up the functions used for defining the various objects which are to be displayed on the pad
function textObject()
{
  this.textString;
  this.xPos;
  this.yPos;
  this.fontName;
  this.fontSize;
  this.fontBackColor;
  this.fontForeColor;
}

function checkboxObject()
{
  this.xPos;
  this.yPos;
  this.options;
  this.fontName;
  this.fontSize;
  this.fontBackColor;
  this.fontForeColor;
};

function radioObject()
{
  this.xPos;
  this.yPos;
  this.buttonLabel;
  this.buttonLabel;
  this.groupName;
  this.buttonChecked;
  this.fontBackColor;
  this.fontForeColor;
};

function buttonObject()
{
  this.xPos;
  this.yPos;
  this.buttonType;
  this.buttonText;
  this.width;
  this.imageFile;
  this.fontBackColor;
  this.fontForeColor;
};

function rectangleObject()
{
  this.x1Pos;
  this.y1Pos;
  this.x2Pos;
  this.y2Pos;
  this.lineWidth;
  this.options;
  this.fontBackColor;
  this.fontForeColor;
};

function lineObject()
{
  this.x1Pos;
  this.y1Pos;
  this.x2Pos;
  this.y2Pos;
  this.lineWidth;
  this.options;
  this.fontBackColor;
  this.fontForeColor;
};
