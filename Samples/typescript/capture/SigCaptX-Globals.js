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
            exports_1("LICENCEKEY", LICENCEKEY = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA"); // Licence key used for sigCtl and wizCtl in SigCaptX-SessionControl.js
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
