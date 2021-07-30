/* **************************************************************************
  SigCaptX-WizardPINPad-PadDefs.ts
   
  This file contains the functions which define the properties of the pad 
  and the objects which are to be displayed on the PIN pad screen.
  The object classes are defined in SigCaptX-Utils.ts
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { padColors, padRange, padType } from "./SigCaptX-Globals";
import { buttonEvent, ButtonObject, TextObject } from "./SigCaptX-Globals";

export class PadDefs
{
  ButtonSize:number = 0;
  ButtonWidth:number = 0;
  Font:string;
  Height:number;
  Range:string = "";
  TextSize:number = 0;
  TitleBold:boolean;
  Type:string = "";
  Width:number;
  xButtonCancel:number = 0;
  xButtonNext:number = 0;
  yButtonCancel:number = 0;
  yButtonNext:number = 0;
  yLSText:number = 0;
  yText:number = 0;

  constructor (padWidth:number, padHeight:number)
  {
    this.Font = "Verdana";
    this.Height = padHeight;
    this.TitleBold = true;
    this.Width = padWidth;
    
    // Set the pad model using the display width
    
    switch (padWidth)
    {
      case 640: 
        this.Range = padRange.STU500;
        this.Type = padType.STU500;
        this.TextSize = 16;
        this.yText = 10;
        this.yLSText = 28;
        this.ButtonSize = 22;
        this.ButtonWidth = 110;
        this.yButtonCancel = 415;
        this.yButtonNext = 415;
        this.xButtonCancel  =  30;
        this.xButtonNext = 500;
        break;
      case 800:
        this.Range = padRange.STU5X0;
        this.Type = padType.STU5X0;
        this.TextSize = 16;
        this.yText = 10;
        this.yLSText = 28;
        this.ButtonSize = 22;
        this.ButtonWidth = 110; 
        this.yButtonCancel = 415;
        this.yButtonNext = 415;
        this.xButtonCancel  =  30;
        this.xButtonNext = 660;
        break;
        
      case 396:
        this.Range = padRange.STU300;
        this.Type = padType.STU300;
        this.TextSize = 8;
        this.yText = 5;
        this.yLSText = 6;
        this.ButtonSize = 15;
        this.ButtonWidth = 55;
        this.xButtonCancel = 335;
        this.xButtonNext = 335;
        // Note that yButtonCancel and yButtonNext for the 300 are calculated later in screen_Display1() below
        break;
        
      case 320:
        this.Range = padRange.STU430;
        this.Type = padType.STU430;
        this.TextSize = 9;
        this.yText = 10;
        this.yLSText = 7;
        this.ButtonSize = 12;
        this.ButtonWidth = 70; 
        this.yButtonCancel = 170;
        this.yButtonNext = 170;
        this.xButtonCancel  =  5;
        this.xButtonNext = 243;
        break;
    }
  }
}

// Function to define the x and y values and other properties for all the objects on the screen (only 1 screen with the PIN Pad)
export class screen_Display1
{
  cancelButton:any;
  enterBelow:any;
  KeyWidth:number;
  nextButton:any;
  pin1:any;
  pin2:any;
  pin3:any;
  pin4:any;
  pin5:any;
  pin6:any;
  pin7:any;
  pin8:any;
  pin9:any;
  yInputEcho:number;
  xButtonCol1:number;
  xButtonCol2:number;
  xButtonCol3:number;
  yButtonRow1:number;
  yButtonRow2:number;
  yButtonRow3:number;

  constructor(pad:any)
  {
    // Calculate the x and y co-ordinates for the various screen objects
    // bearing in mind that for the buttons the x value for each column is always the same
    // and the y value for each row is always the same
    this.KeyWidth = pad.Width / 10;

    if (pad.Range == padRange.STU300)
    {
      this.yInputEcho = 20;
    
      this.xButtonCol1 = pad.Width/2 - pad.ButtonWidth - pad.ButtonWidth/2;
      this.xButtonCol2 = pad.Width/2 - pad.ButtonWidth/2;
      this.xButtonCol3 = pad.Width/2 + pad.ButtonWidth/2;

      this.yButtonRow1 = pad.yText + 7*pad.yLSText;
      this.yButtonRow2 = pad.yText + 7*pad.yLSText + pad.ButtonSize;
      this.yButtonRow3 = pad.yText + 7*pad.yLSText + (2*pad.ButtonSize);
    
      pad.yButtonCancel = this.yButtonRow1;
      pad.yButtonNext = this.yButtonRow3;
    }
    else
    {
      this.yInputEcho = pad.yText + 4*pad.yLSText;
      this.xButtonCol1 = pad.Width/2 - this.KeyWidth/2 - 2*this.KeyWidth;
      this.xButtonCol2 = pad.Width/2 - this.KeyWidth/2;
      this.xButtonCol3 = pad.Width/2 - this.KeyWidth/2 + 2*this.KeyWidth;

      this.yButtonRow1 = pad.yText + 7*pad.yLSText;
      this.yButtonRow2 = pad.yText + 7*pad.yLSText + this.KeyWidth;
      this.yButtonRow3 = pad.yText + 7*pad.yLSText + (2*this.KeyWidth);
    }

    // Set up the text object for the "Enter a 4 digit PIN..." prompt
    this.enterBelow = new TextObject("Enter a 4 digit PIN code below", "centre", pad.yText, pad.Font, pad.TextSize, pad.TitleBold);
    this.enterBelow.fontForeColor = padColors.BLUE;
    this.enterBelow.fontBackColor = padColors.WHITE;

    // Set up the 9 button objects for the PIN numbers
    this.pin1 = new ButtonObject(this.xButtonCol1, this.yButtonRow1, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, "1", "1");
    this.pin1.fontForeColor = padColors.BLUE;
    this.pin1.fontBackColor = padColors.GREEN;

    this.pin2 = new ButtonObject(this.xButtonCol2, this.yButtonRow1, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, "2", "2");
    this.pin3 = new ButtonObject(this.xButtonCol3, this.yButtonRow1, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, "3", "3");
    this.pin4 = new ButtonObject(this.xButtonCol1, this.yButtonRow2, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, "4", "4");
    this.pin5 = new ButtonObject(this.xButtonCol2, this.yButtonRow2, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, "5", "5");
    this.pin6 = new ButtonObject(this.xButtonCol3, this.yButtonRow2, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, "6", "6");
    this.pin7 = new ButtonObject(this.xButtonCol1, this.yButtonRow3, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, "7", "7");
    this.pin8 = new ButtonObject(this.xButtonCol2, this.yButtonRow3, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, "8", "8");
    this.pin9 = new ButtonObject(this.xButtonCol3, this.yButtonRow3, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, "9", "9");

    // Finally set up the button objects for the Confirm and Cancel buttons
    this.nextButton = new ButtonObject(pad.xButtonNext, pad.yButtonNext, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, buttonEvent.OK, "Confirm");
    this.nextButton.fontForeColor = padColors.WHITE;
    this.nextButton.fontBackColor = padColors.PURPLE;

    this.cancelButton = new ButtonObject(pad.xButtonCancel, pad.yButtonCancel, pad.Font, pad.ButtonSize, pad.ButtonWidth, pad.TitleBold, buttonEvent.CANCEL, "Cancel");
    this.cancelButton.fontForeColor = padColors.WHITE;
    this.cancelButton.fontBackColor = padColors.PURPLE;
  }
}