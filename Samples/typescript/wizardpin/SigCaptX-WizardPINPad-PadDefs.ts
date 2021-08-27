/* **************************************************************************
  SigCaptX-WizardPINPad-PadDefs.ts
   
  This file contains the functions which define the properties of the pad 
  and the objects which are to be displayed on the PIN pad screen.
  The object classes are defined in SigCaptX-WizardPINPad.html
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { buttonEvent, ButtonObject, padColors, padRange, padType, TextObject } from './SigCaptX-Globals';

export class PadControl
{
  buttonSize:number;
  buttonWidth:number;
  font:string;
  height:number;
  width:number;
  range:string;
  textSize:number;
  titleBold:boolean;
  type:string;
  xButtonCancel:any;
  xButtonNext:any;
  yButtonCancel:any;
  yButtonNext:any;
  yLSText:number;
  yText:number;

  constructor(width, height)
  {
    this.font = "Verdana";
    this.height= height;
    this.titleBold = true;
    this.width = width;

    switch (width)
    {
      case 640: 
        this.range = padRange.STU500;
        this.type = padType.STU500;
        this.textSize = 16;
        this.yText = 10;
        this.yLSText = 28;
        this.buttonSize = 22;
        this.buttonWidth = 110;
        this.yButtonCancel = 415;
        this.yButtonNext = 415;
        this.xButtonCancel  =  30;
        this.xButtonNext = 500;
        break;
      case 800:
        this.range = padRange.STU5X0;
        this.type = padType.STU5X0;
        this.textSize = 16;
        this.yText = 10;
        this.yLSText = 28;
        this.buttonSize = 22;
        this.buttonWidth = 110; 
        this.yButtonCancel = 415;
        this.yButtonNext = 415;
        this.xButtonCancel  =  30;
        this.xButtonNext = 660;
        break;
        
      case 396:
        this.range = padRange.STU300;
        this.type = padType.STU300;
        this.textSize = 8;
        this.yText = 5;
        this.yLSText = 6;
        this.buttonSize = 15;
        this.buttonWidth = 55;
        this.xButtonCancel = 335;
        this.xButtonNext = 335;
        // Note that yButtonCancel and yButtonNext for the 300 are calculated later in screen1() below
        break;
        
      case 320:
        this.range = padRange.STU430;
        this.type = padType.STU430;
        this.textSize = 9;
        this.yText = 10;
        this.yLSText = 7;
        this.buttonSize = 12;
        this.buttonWidth = 70; 
        this.yButtonCancel = 170;
        this.yButtonNext = 170;
        this.xButtonCancel  =  5;
        this.xButtonNext = 243;
        break;
    }
  }
}

// Function to define the x and y values and other properties for all the objects on the screen (only 1 screen with the PIN Pad)
export class Screen_Display1
{
  cancelButton:any;
  enterBelow:any;
  keyWidth:number;
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

  constructor(pad)
  {
    // Calculate the x and y co-ordinates for the various screen objects
    // bearing in mind that for the buttons the x value for each column is always the same
    // and the y value for each row is always the same
    this.keyWidth = pad.width / 10;

    if (pad.range == padRange.STU300)
    {
      this.yInputEcho = 20;
    
      this.xButtonCol1 = pad.width/2 - pad.buttonWidth - pad.buttonWidth/2;
      this.xButtonCol2 = pad.width/2 - pad.buttonWidth/2;
      this.xButtonCol3 = pad.width/2 + pad.buttonWidth/2;

      this.yButtonRow1 = pad.yText + 7*pad.yLSText;
      this.yButtonRow2 = pad.yText + 7*pad.yLSText + pad.buttonSize;
      this.yButtonRow3 = pad.yText + 7*pad.yLSText + (2*pad.buttonSize);
    
      pad.yButtonCancel = this.yButtonRow1;
      pad.yButtonNext = this.yButtonRow3;
    }
    else
    {
      this.yInputEcho = pad.yText + 4*pad.yLSText;
      this.xButtonCol1 = pad.width/2 - this.keyWidth/2 - 2*this.keyWidth;
      this.xButtonCol2 = pad.width/2 - this.keyWidth/2;
      this.xButtonCol3 = pad.width/2 - this.keyWidth/2 + 2*this.keyWidth;

      this.yButtonRow1 = pad.yText + 7*pad.yLSText;
      this.yButtonRow2 = pad.yText + 7*pad.yLSText + this.keyWidth;
      this.yButtonRow3 = pad.yText + 7*pad.yLSText + (2*this.keyWidth);
    }

    // Set up the text object for the "Enter a 4 digit PIN..." prompt
    this.enterBelow = new TextObject("Enter a 4 digit PIN code below", "center", pad.yText, pad.font, pad.textSize, pad.titleBold, "txt");
    this.enterBelow.fontForeColor = padColors.BLUE;
    this.enterBelow.fontBackColor = padColors.WHITE;

    // Set up the 9 button objects for the PIN numbers
    this.pin1 = new ButtonObject(this.xButtonCol1, this.yButtonRow1, pad.buttonSize, pad.buttonWidth, pad.titleBold, "1", "1");
    this.pin1.fontForeColor = padColors.BLUE;
    this.pin1.fontBackColor = padColors.GREEN;
    this.pin2 = new ButtonObject(this.xButtonCol2, this.yButtonRow1, pad.buttonSize, pad.buttonWidth, pad.titleBold, "2", "2");
    this.pin3 = new ButtonObject(this.xButtonCol3, this.yButtonRow1, pad.buttonSize, pad.buttonWidth, pad.titleBold, "3", "3");
    this.pin4 = new ButtonObject(this.xButtonCol1, this.yButtonRow2, pad.buttonSize, pad.buttonWidth, pad.titleBold, "4", "4");
    this.pin5 = new ButtonObject(this.xButtonCol2, this.yButtonRow2, pad.buttonSize, pad.buttonWidth, pad.titleBold, "5", "5");
    this.pin6 = new ButtonObject(this.xButtonCol3, this.yButtonRow2, pad.buttonSize, pad.buttonWidth, pad.titleBold, "6", "6");
    this.pin7 = new ButtonObject(this.xButtonCol1, this.yButtonRow3, pad.buttonSize, pad.buttonWidth, pad.titleBold, "7", "7");
    this.pin8 = new ButtonObject(this.xButtonCol2, this.yButtonRow3, pad.buttonSize, pad.buttonWidth, pad.titleBold, "8", "8");
    this.pin9 = new ButtonObject(this.xButtonCol3, this.yButtonRow3, pad.buttonSize, pad.buttonWidth, pad.titleBold, "9", "9");
    
    // Finally set up the button objects for the Confirm and Cancel buttons
    this.nextButton = new ButtonObject(pad.xButtonNext, pad.yButtonNext, pad.buttonSize, pad.buttonWidth, pad.titleBold, buttonEvent.OK, "Confirm");
    this.nextButton.fontForeColor = padColors.WHITE;
    this.nextButton.fontBackColor = padColors.PURPLE;

    this.cancelButton = new ButtonObject(pad.xButtonCancel, pad.yButtonCancel, pad.buttonSize, pad.buttonWidth, pad.titleBold, buttonEvent.CANCEL, "Cancel");
    this.cancelButton.fontForeColor = padColors.WHITE;
    this.cancelButton.fontBackColor = padColors.PURPLE;
  }
}