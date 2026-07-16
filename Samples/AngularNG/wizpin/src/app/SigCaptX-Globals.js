/* **************************************************************************
  SigCaptX-Globals.ts
   
  This file contains enumerators, function objects and global variables common to various functions
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
System.register([], function (exports_1, context_1) {
    "use strict";
    var wgssSignatureSDK, sigObj, imageBox, sigsdkptr, scriptIsRunning, timeout, BITMAP_BACKGROUNDCOLOR, BITMAP_IMAGEFORMAT, BITMAP_INKCOLOR, BITMAP_INKWIDTH, BITMAP_PADDING_X, BITMAP_PADDING_Y, TIMEOUT, SERVICEPORT, LICENCEKEY, HTMLIds;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {/* **************************************************************************
              SigCaptX-Globals.ts
               
              This file contains enumerators, function objects and global variables common to various functions
              
              Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
              
              v1.0
              
            ***************************************************************************/
            /* Define global variables */
            exports_1("wgssSignatureSDK", wgssSignatureSDK = null); // Signature SDK object
            exports_1("sigObj", sigObj = null); // Signature object
            exports_1("imageBox", imageBox = null);
            exports_1("sigsdkptr", sigsdkptr = null);
            exports_1("scriptIsRunning", scriptIsRunning = false); // script run status
            exports_1("BITMAP_BACKGROUNDCOLOR", BITMAP_BACKGROUNDCOLOR = 0x00FFFFFF);
            exports_1("BITMAP_IMAGEFORMAT", BITMAP_IMAGEFORMAT = "bmp");
            exports_1("BITMAP_INKCOLOR", BITMAP_INKCOLOR = 0x00000000);
            exports_1("BITMAP_INKWIDTH", BITMAP_INKWIDTH = 0.7);
            exports_1("BITMAP_PADDING_X", BITMAP_PADDING_X = 4);
            exports_1("BITMAP_PADDING_Y", BITMAP_PADDING_Y = 4);
            exports_1("TIMEOUT", TIMEOUT = 1500); //  Timeout value for connecting to the port used for the SigCaptX service
            exports_1("SERVICEPORT", SERVICEPORT = 10500); //  Port used for the SigCaptX service
            exports_1("LICENCEKEY", LICENCEKEY = "<<license>>"); // Licence key used for sigCtl and wizCtl in SigCaptX-SessionControl.js
            HTMLIds = /** @class */ (function () {
                function HTMLIds() {
                    // Set up static properties for the HTML fields which are needed later
                    this.btnRestore = document.getElementById("restore");
                    this.checkBoxUseB64 = document.getElementById("chkUseB64Image");
                    this.checkShowSigtext = document.getElementById("chkShowSigText");
                    this.firstName = document.getElementById("fname");
                    this.imageBox = document.getElementById("imageBox");
                    this.lastName = document.getElementById("lname");
                    this.textSig = document.getElementById("txtSignature");
                    this.txtDisplay = document.getElementById("txtDisplay");
                }
                return HTMLIds;
            }());
            exports_1("HTMLIds", HTMLIds);
        }
    };
});
