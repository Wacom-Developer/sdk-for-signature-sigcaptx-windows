/* **************************************************************************
  SigCaptX-Utils.ts
   
  This Typescript file contains general utility functions
  
  Copyright (c) 2021 Wacom Co. Ltd. All rights reserved.
  
   v1.0
  
***************************************************************************/
import { HTMLTags } from '../main';
import { BITMAP_BACKGROUNDCOLOR, BITMAP_IMAGEFORMAT, BITMAP_INKCOLOR, BITMAP_INKWIDTH, BITMAP_PADDING_X, BITMAP_PADDING_Y, textSource } from './SigCaptX-Globals';
import { SessionControl } from './SigCaptX-SessionControl';

export class Utils
{
    static print(txt:string)   // Outputs a text string to the message display text box on the main form
    {
        HTMLTags.txtDisplay.value += txt + "\n";
        HTMLTags.txtDisplay.scrollTop = HTMLTags.txtDisplay.scrollHeight; // scroll to end
    }

    static callbackStatusOK ( methodName, status )  // Error handler routine for return values from callbacks
    {
        if(window.sdkPtr.ResponseStatus.OK === status || status === "")
        {
            return true;
        }
        else
        {
            Utils.print(methodName + " error: " + status);
            return false;
        }
    }
    static clearTextBox()
    {
        HTMLTags.txtDisplay.value = "";
    }

    // Called when the wizard script is completed and displays the image of the captured signature in the
    // signature image on the HTML document. Optionally also displays the SigText string
    static showSignature()
    {
        Utils.print("Showing signature");
        window.sigCtl.GetSignature(this.onGetSignature);
    }
    
    static onGetSignature(sigCtlV, sigObjV, status)
    {
        if(window.sdkPtr.ResponseStatus.OK == status)
        {
            var outputFlags = window.sdkPtr.RBFlags.RenderOutputPicture | window.sdkPtr.RBFlags.RenderColor24BPP;
            var imageBox = document.getElementById("imageBox");
            var sigObj = sigObjV;
            sigObj.RenderBitmap(BITMAP_IMAGEFORMAT, imageBox.clientWidth, imageBox.clientHeight, BITMAP_INKWIDTH, BITMAP_INKCOLOR, BITMAP_BACKGROUNDCOLOR, outputFlags, BITMAP_PADDING_X, BITMAP_PADDING_Y, Utils.onRenderBitmap);
        }
        else
        {
            document.getElementById("statusText").innerHTML += "<br>Error retrieving signature";
        }
    }
    
    static onRenderBitmap(sigObjV, bmpObj, status) 
    {
        if(Utils.callbackStatusOK("Signature Render Bitmap", status))
        {
            var imageBox = document.getElementById("imageBox");
            if(null === imageBox.firstChild)
            {
                imageBox.appendChild(bmpObj.image);
            }
            else
            {
                imageBox.replaceChild(bmpObj.image, imageBox.firstChild);
            }
            var checkShowSigtext = (<HTMLInputElement>document.getElementById("chkShowSigText"));
            if (checkShowSigtext.checked)
            {
                sigObjV.GetSigText(Utils.onGetSigText);
            }
            else
            {
                SessionControl.stop();
            }
        } 
    }
    
    // Displays the SigText string in the text box on the HTML document
    static onGetSigText(sigObjV, text, status) 
    {
        if(Utils.callbackStatusOK("Signature Render Bitmap", status))
        {
            Utils.print("Sig text successfully obtained: " + text);
        
            // At this point you can send the contents of "text" to the server 
            // and then validate it at the server end
        
            Utils.print("Stopping script");
            SessionControl.stop();
        }
    }

      
    // Set up the font ready for displaying the next object which could be text or a button or other object
    static setFont(fontName, fontSize, isBold, useSymbolCharset, callbackRoutine)
    {
        var myFont = new window.sdkPtr.Font(fontName, fontSize);
        myFont.sWeight = (isBold? window.sdkPtr.FontWeight.FW_BOLD : window.sdkPtr.FontWeight.FW_NORMAL);
        if (useSymbolCharset)
        {
            myFont.sCharset = window.sdkPtr.FontCharset.SYMBOL_CHARSET;
        }
        var variantFont = new window.sdkPtr.Variant();
        variantFont.Set(myFont);
        window.wizCtl.PutFont(variantFont, callbackRoutine);
    }

    static setFontForeColor(foreColor, callbackRoutine)
    {
        var color = new window.sdkPtr.Variant();
        if (foreColor == "")
        {
            // Default foreground colour to black if not supplied
            foreColor = "0R 0G 0B";
        }
        //print("Setting foreground colour to " + foreColor);
        color.Set (foreColor);
        window.wizCtl.SetProperty("ObjectForegroundColor", color, callbackRoutine);
    }

    static setFontBackColor(backColor, callbackRoutine)
    {
        var color = new window.sdkPtr.Variant();
        if (backColor == "")
        {
            // Default background colour to white if not supplied
            backColor = "1R 1G 1B";
        }
        //print("Setting background colour to " + backColor);
        color.Set (backColor);
        window.wizCtl.SetProperty("ObjectBackgroundColor", color, callbackRoutine);
    }
    
    // Add a text string to the display at co-ordinates specified by values in the text object
    static addTextObject(textObject, callbackRoutine)
    {
        var xVar = new window.sdkPtr.Variant();
        var yVar = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();
        
        xVar.Set(textObject.xPos);
        yVar.Set(textObject.yPos);
        objData.Set(textObject.textString);
        
        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectText, textObject.type, xVar, yVar, objData, options, callbackRoutine);	
    }	
    
    // Add a button to the pad display using properties already defined in the button object 
    static addButtonObject(buttonObj, callbackRoutine)
    {
        var xVar = new window.sdkPtr.Variant();
        var yVar = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();
            
        xVar.Set(buttonObj.xPos);
        yVar.Set(buttonObj.yPos);
        objData.Set(buttonObj.buttonText);
        options.Set(buttonObj.width);
        
        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectButton, buttonObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
    }
    
    // Add an image to the pad display using properties already defined in the image object
    static addObjectImage(imageObj, callbackRoutine, imageSource)
    {
        var xVar = new window.sdkPtr.Variant();
        var yVar = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();
        
        xVar.Set(imageObj.xPos);
        yVar.Set(imageObj.yPos);
        objData.Set(imageObj.imageFile);
            
        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectImage, imageObj.buttonType, xVar, yVar, objData, options, callbackRoutine);
    }
    
    // Add a checkbox to the pad display using co-ordinates and options passed in as parameters
    static addCheckBox(xPosition, yPosition, optionsValue, callbackRoutine)
    {
        var xVar = new window.sdkPtr.Variant();
        var yVar = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();

        xVar.Set(xPosition);
        yVar.Set(yPosition);
        objData.Set(" ");
        options.Set(optionsValue);
            
        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectCheckbox, "Check", xVar, yVar, objData, options, callbackRoutine);
    }

    // Add a signature object to the pad display 
    static addSignatureObject(sigCtl, callbackRoutine)
    {
        var xVar = new window.sdkPtr.Variant();
        var yVar = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();
            
        xVar.Set(0);
        yVar.Set(0);
        objData.Set(sigCtl);
            
        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectSignature, "Sig", xVar, yVar, objData, options, callbackRoutine);
    }
    
    // Add a rectangle to the pad display (via the wizCtl)
    static addRectangle( rectangleObj, callbackRoutine)
    {
        var x1Var = new window.sdkPtr.Variant();
        var y1Var = new window.sdkPtr.Variant();
        var x2Var = new window.sdkPtr.Variant();
        var y2Var = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();
        
        x1Var.Set(rectangleObj.x1Pos);
        y1Var.Set(rectangleObj.y1Pos);
        x2Var.Set(rectangleObj.x2Pos);
        y2Var.Set(rectangleObj.y2Pos);
        objData.Set(rectangleObj.lineWidth);
        options.Set(rectangleObj.options);
        
        window.wizCtl.AddPrimitive(window.sdkPtr.PrimitiveType.PrimitiveRectangle, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine );
    }
    
    // Add a line to the pad display (via the wizCtl)
    static addLine(lineObj, callbackRoutine)
    {
        var x1Var = new window.sdkPtr.Variant();
        var y1Var = new window.sdkPtr.Variant();
        var x2Var = new window.sdkPtr.Variant();
        var y2Var = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();
        
        x1Var.Set(lineObj.x1Pos);
        y1Var.Set(lineObj.y1Pos);
        x2Var.Set(lineObj.x2Pos);
        y2Var.Set(lineObj.y2Pos);
        objData.Set(lineObj.lineWidth);
        options.Set(lineObj.options);
            
        window.wizCtl.AddPrimitive(window.sdkPtr.PrimitiveType.PrimitiveLine, x1Var, y1Var, x2Var, y2Var, objData, options, callbackRoutine);
    }
    
    // Add a radio button to the pad display (via the wizCtl)
    static addRadioButton(radioButtonObj, callbackRoutine)
    {
        var xVar = new window.sdkPtr.Variant();
        var yVar = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();
        var objOptn = new window.sdkPtr.ObjectOptions();
        
        xVar.Set(radioButtonObj.xPos);
        yVar.Set(radioButtonObj.yPos);
        
        objData.Set(radioButtonObj.buttonLabel);
        objOptn.AddOption("Group", radioButtonObj.groupName);
        objOptn.AddOption("Checked", radioButtonObj.buttonChecked);
        options.Set(objOptn);
            
        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectRadioButton, radioButtonObj.buttonLabel, xVar, yVar, objData, options, callbackRoutine);
    }
    
    // Add an input button to the pad display (via the wizCtl)
    static addInputObject(inputObj, callbackRoutine)
    {
        var xVar = new window.sdkPtr.Variant();
        var yVar = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();

        xVar.Set(0);
        yVar.Set(0);
        objData.Set(inputObj);
        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectInput, "input", xVar, yVar, objData, options, callbackRoutine);
    }
    
    // Add an input echo object to the pad display (via the wizCtl) 
    static addInputObjectEcho(xPos, yPos, callbackRoutine)
    {
        var xVar = new window.sdkPtr.Variant();
        var yVar = new window.sdkPtr.Variant();
        var objData = new window.sdkPtr.Variant();
        var options = new window.sdkPtr.Variant();
        
        xVar.Set(xPos);
        yVar.Set(yPos);

        window.wizCtl.AddObject(window.sdkPtr.ObjectType.ObjectInputEcho, "echo", xVar, yVar, objData, options, callbackRoutine);
    }

    // Find out and return the current directory
    static getCurrentDir() 
    {
        var scriptFullName = window.location.pathname; // gets /c:/pathname/file.html
        scriptFullName = scriptFullName.replace(/\//g,"\\"); //convert all '/' to '\'
        var scriptPath = scriptFullName.substring( 1, scriptFullName.lastIndexOf("\\")+1 ); // c:\pathname\  
        scriptPath = unescape(scriptPath); // change %20 back to space
        return scriptPath;
    }

    /* Check the HTML document to see whether the user has selected the option to use local or remote images for the button design */
    static getButtonSourceFromHTMLDoc()
    {
        var buttonSource = textSource.STANDARD;

        if (HTMLTags.radioRemote.checked)
        {
            buttonSource = textSource.REMOTE;
        }
        return buttonSource;
    }
}