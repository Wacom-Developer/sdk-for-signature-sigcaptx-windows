/* **************************************************************************
  main.ts
   
  This is the main start-up file for the whole app.
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
  v1.0
  
***************************************************************************/
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { SigCaptXModule } from "./app/sigcaptx.module";
import { HTMLIds } from './app/SigCaptX-Globals';
import { SessionControl } from './app/SigCaptX-SessionControl';

declare global {
  interface Window {
      sdkPtr: any;  
    }
}

platformBrowserDynamic().bootstrapModule(SigCaptXModule);

// Set up global variables referencing the HTML elements needed later
export const HTMLTags = new HTMLIds();

// Now start up the session
SessionControl.actionWhenRestarted();
