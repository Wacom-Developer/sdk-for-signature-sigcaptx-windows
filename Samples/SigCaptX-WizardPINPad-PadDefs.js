/* **************************************************************************
  SigCaptX-WizardPINPad-PadDefs.js
   
  This file contains the functions which define the properties of the pad 
  and the objects which are to be displayed on the PIN pad screen.
  The object classes are defined in SigCaptX-WizardPINPad.html
  
  Copyright (c) 2018 Wacom Co. Ltd. All rights reserved.
  
   v4.0
  
***************************************************************************/

function CPad_STU(padWidth, padHeight)
{
  //print ("Defining pad for width/height : " + padWidth + "/" + padHeight);
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
      // Note that yButtonCancel and yButtonNext for the 300 are calculated later in screen1() below
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

// Function to define the x and y values and other properties for all the objects on the screen (only 1 screen with the PIN Pad)
function screen_Display1(pad)
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
  this.enterBelow = new textObject();
  this.enterBelow.xPos = "centre";
  this.enterBelow.yPos = pad.yText;
  this.enterBelow.textString = "Enter a 4 digit PIN code below";
  this.enterBelow.fontBold = pad.TitleBold;
  this.enterBelow.fontSize = pad.TextSize;
  this.enterBelow.type = "txt";
  this.enterBelow.fontName = pad.Font;
  this.enterBelow.fontForeColor = padColors.BLUE;
  this.enterBelow.fontBackColor = padColors.WHITE;

  // Set up the 9 button objects for the PIN numbers
  this.pin1 = new buttonObject();
  this.pin1.xPos = this.xButtonCol1;
  this.pin1.yPos = this.yButtonRow1;
  this.pin1.buttonSize = pad.ButtonSize;
  this.pin1.width = pad.ButtonWidth;
  this.pin1.buttonBold = pad.TitleBold;
  this.pin1.buttonType = "1";
  this.pin1.buttonText = "1";
  this.pin1.fontForeColor = padColors.BLUE;
  this.pin1.fontBackColor = padColors.GREEN;

  this.pin2 = new buttonObject();
  this.pin2.xPos = this.xButtonCol2;
  this.pin2.yPos = this.yButtonRow1;
  this.pin2.buttonSize = pad.ButtonSize;
  this.pin2.width = pad.ButtonWidth;
  this.pin2.buttonBold = pad.TitleBold;
  this.pin2.buttonType = "2";
  this.pin2.buttonText = "2";

  this.pin3 = new buttonObject();
  this.pin3.xPos = this.xButtonCol3;
  this.pin3.yPos = this.yButtonRow1;
  this.pin3.buttonSize = pad.ButtonSize;
  this.pin3.width = pad.ButtonWidth;
  this.pin3.buttonBold = pad.TitleBold;
  this.pin3.buttonType = "3";
  this.pin3.buttonText = "3";

  this.pin4 = new buttonObject();
  this.pin4.xPos = this.xButtonCol1;
  this.pin4.yPos = this.yButtonRow2;
  this.pin4.buttonSize = pad.ButtonSize;
  this.pin4.width = pad.ButtonWidth;
  this.pin4.buttonBold = pad.TitleBold;
  this.pin4.buttonType = "4";
  this.pin4.buttonText = "4";

  this.pin5 = new buttonObject();
  this.pin5.xPos = this.xButtonCol2;
  this.pin5.yPos = this.yButtonRow2;
  this.pin5.buttonSize = pad.ButtonSize;
  this.pin5.width = pad.ButtonWidth;
  this.pin5.buttonBold = pad.TitleBold;
  this.pin5.buttonType = "5";
  this.pin5.buttonText = "5";

  this.pin6 = new buttonObject();
  this.pin6.xPos = this.xButtonCol3;
  this.pin6.yPos = this.yButtonRow2;
  this.pin6.buttonSize = pad.ButtonSize;
  this.pin6.width = pad.ButtonWidth;
  this.pin6.buttonBold = pad.TitleBold;
  this.pin6.buttonType = "6";
  this.pin6.buttonText = "6";

  this.pin7 = new buttonObject();
  this.pin7.xPos = this.xButtonCol1;
  this.pin7.yPos = this.yButtonRow3;
  this.pin7.buttonSize = pad.ButtonSize;
  this.pin7.width = pad.ButtonWidth;
  this.pin7.buttonBold = pad.TitleBold;
  this.pin7.buttonType = "7";
  this.pin7.buttonText = "7";

  this.pin8 = new buttonObject();
  this.pin8.xPos = this.xButtonCol2;
  this.pin8.yPos = this.yButtonRow3;
  this.pin8.buttonSize = pad.ButtonSize;
  this.pin8.width = pad.ButtonWidth;
  this.pin8.buttonBold = pad.TitleBold;
  this.pin8.buttonType = "8";
  this.pin8.buttonText = "8";

  this.pin9 = new buttonObject();
  this.pin9.xPos = this.xButtonCol3;
  this.pin9.yPos = this.yButtonRow3;
  this.pin9.buttonSize = pad.ButtonSize;
  this.pin9.width = pad.ButtonWidth;
  this.pin9.buttonBold = pad.TitleBold;
  this.pin9.buttonType = "9";
  this.pin9.buttonText = "9";

  // Finally set up the button objects for the Confirm and Cancel buttons
  this.nextButton = new buttonObject();
  this.nextButton.xPos = pad.xButtonNext;
  this.nextButton.yPos = pad.yButtonNext;
  this.nextButton.buttonSize = pad.ButtonSize;
  this.nextButton.width = pad.ButtonWidth;
  this.nextButton.buttonBold = pad.TitleBold;
  this.nextButton.buttonType = buttonEvent.OK;
  this.nextButton.buttonText = "Confirm";
  this.nextButton.fontForeColor = padColors.WHITE;
  this.nextButton.fontBackColor = padColors.PURPLE;

  this.cancelButton = new buttonObject();
  this.cancelButton.xPos = pad.xButtonCancel;
  this.cancelButton.yPos = pad.yButtonCancel;
  this.cancelButton.buttonSize = pad.ButtonSize;
  this.cancelButton.width = pad.ButtonWidth;
  this.cancelButton.buttonBold = pad.TitleBold;
  this.cancelButton.buttonType = buttonEvent.CANCEL;
  this.cancelButton.buttonText = "Cancel";
  this.cancelButton.fontForeColor = padColors.WHITE;
  this.cancelButton.fontBackColor = padColors.PURPLE;
  //print("fontForeColor of Cancel button is " + this.cancelButton.fontForeColor);
}