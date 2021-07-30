/* **************************************************************************
  main.ts
   
  This is the main start-up file for the whole SigCaptX Wizard sample app for Angular 2+
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { SigCaptXWizPinModule } from "./app/sigcaptx.module";
import { HTMLIds } from './app/SigCaptX-Globals';
import { SessionControl } from './app/SigCaptX-SessionControl';

declare global {
  interface Window {
      display_1:any;
      dynCapt:any;
      height:any;
      JSONreq:any;
      pad:any;
      scriptIsRunning:boolean;
      sdkPtr: any;  
      sigCtl: any;
      width:any;
      wizCtl: any;
    }
}

platformBrowserDynamic().bootstrapModule(SigCaptXWizPinModule);

// Set up global variables referencing the HTML elements needed later
export const HTMLTags = new HTMLIds();

// Now start up the session
SessionControl.body_onload();
