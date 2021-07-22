/* **************************************************************************
  chkshowsigtext.ts
   
  This file contains the source code for enabling the Restore button on the form
  The "showSigText()" function is activated by the click event on the 
  "Output SigText to form" check box on the form which is itself defined in chkshowsigtext.html
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { Component } from '@angular/core';

@Component({
    selector: 'chk-showsigtext',
    templateUrl: './chkshowsigtext.html'
  })

  export class ShowSigText
  {
     showSigText()
     {
       ShowSigText.enableRestoreButton();
     }
  
     /* This function clears the current signature image from the signature control on the form */
  
    static enableRestoreButton = () =>
    { 
        var btnRestore = (<HTMLButtonElement>document.getElementById("Restore"));
        var checkShowSigtext = (<HTMLInputElement>document.getElementById("chkShowSigText"));

        //  This function enables the Restore button if the user has selected the option to output SigText 
        if (checkShowSigtext.checked)
        {
            btnRestore.disabled = false;
        }
        else
        {
            btnRestore.disabled = true;
        }
    }
}