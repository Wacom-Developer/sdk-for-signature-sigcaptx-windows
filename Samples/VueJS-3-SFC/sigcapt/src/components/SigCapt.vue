/* ********************************************************************************
   SigCapt.vue

   This is the main source file for running the sample and defining the HTML user interface

   Copyright (c) 2022 Wacom Co. Ltd.

***********************************************************************************/
<script>
import { WacomgssSignatureSDK } from "../../public/wgssSigCaptX.js";
import SignerName from './SignerName.vue';
import SigOptions from './SigOptions.vue';
import SigText from './SigText.vue';
import UserMessage from './UserMessage.vue';

export default {
  // state
  components:
  {
    SignerName,
    SigOptions,
    SigText,
    UserMessage
  },
  data ()
  {
    return {
      callback: null,
      count: 0,
      dynCapt: null,
      fname: "",
      lname: "",
      imageBox: null,
      hash: null,
      messageTrigger: false,
      messageText: "",
      pageHeading: "Signature Capture",
      showSigText: false,
      sigCtl: null,
      sigObj: null,
      sigText: "",
      sigTrigger: false,
      type: " ",
      useB64Image: false,
      userMsgBox: null,
      BITMAP_BACKGROUNDCOLOR: 0x00FFFFFF,
      BITMAP_IMAGEFORMAT: "bmp",
      BITMAP_INKCOLOR: 0x00000000,
      BITMAP_INKWIDTH: 0.7,
      BITMAP_PADDING_X: 4,
      BITMAP_PADDING_Y: 4,
      LICENCEKEY: "<<license>>",
      SERVICEPORT: 8000,
      TIMEOUT: 1500
    };
  },
  methods:
  {
    userMsg (msg)
    {
      this.messageText = this.messageText + "\n" + msg;
      this.messageTrigger = !this.messageTrigger;
      this.userMsgBox.scrollTop = this.userMsgBox.scrollHeight;
    },
    clearTextBox: function ()
    {
      this.userMsgs = "";
    },
    bodyonload: function ()
    {
      this.userMsgBox = document.getElementById("txtDisplay");
      this.imageBox = document.getElementById("imageBox");

      this.clearTextBox();
      this.actionWhenRestarted();
    },
    /* This function simply checks the response status set by the previous callback routine and returns true or false.
      If an error status is found an error message is printed containing the name of the calling routine from
      the parameter and the status code    */
    callbackStatusOK: function (methodName, status)
    {
      if (window.wgssSignatureSDK.ResponseStatus.OK === status)
      {
        return true;
      }
      else
      {
        this.userMsg(methodName + " error: " + status);
        return false;
      }
    },
    actionWhenRestarted: function (callback)
    {
      this.callback = callback;
      this.sigObj = null;
      this.sigCtl = null;
      this.dynCapt = null;
      window.wgssSignatureSDK = null;

      if (this.imageBox != null)
      {
        if (this.imageBox.firstChild !== null)
        {
          this.imageBox.removeChild(this.imageBox.firstChild);
        }
      }
      window.timeout = setTimeout(this.timedDetect, this.TIMEOUT);

      // pass the starting service port  number as configured in the registry
      window.wgssSignatureSDK = new WacomgssSignatureSDK(this.onDetectRunning, this.SERVICEPORT);
    },

    timedDetect: function ()
    {
      if (window.wgssSignatureSDK.running)
      {
        this.userMsg("Signature SDK Service detected.");
        this.start();
      }
      else
      {
        this.userMsg("Signature SDK Service not detected.");
      }
    },

    onDetectRunning: function ()
    {
      if (window.wgssSignatureSDK.running)
      {
        this.userMsg("Signature SDK Service detected.");
        clearTimeout(window.timeout);
        this.start();
      }
      else
      {
        this.userMsg("Signature SDK Service not detected.");
      }
    },

    start: function ()
    {
      if (window.wgssSignatureSDK.running)
      {
        this.userMsg("Checking components ...");
        this.sigCtl = new window.wgssSignatureSDK.SigCtl(this.onSigCtlConstructor);
      }
    },

    onSigCtlConstructor: function (sigCtlV, status)
    {
      if (this.callbackStatusOK("SigCtl constructor", status))
      {
        this.sigCtl.PutLicence(this.LICENCEKEY, this.onSigCtlPutLicence);
      }
    },

    onDynCaptConstructor: function (dynCaptV, status)
    {
      if (this.callbackStatusOK("DynCapt constructor", status))
      {
        this.sigCtl.GetSignature(this.onGetSignature);
      }
    },

    onSigCtlPutLicence: function (sigCtlV, status)
    {
      if (this.callbackStatusOK("SigCtl PutLicence", status))
      {
        this.dynCapt = new window.wgssSignatureSDK.DynamicCapture(this.onDynCaptConstructor);
      }
    },

    onGetSignature: function (sigCtlV, sigObjV, status)
    {
      if (this.callbackStatusOK("SigCapt GetSignature", status))
      {
        this.sigObj = sigObjV;
        this.sigCtl.GetProperty("Component_FileVersion", this.onSigCtlGetFileVersion);
      }
    },

    onGetSigCaptXVersion: function (version, status)
    {
      if (this.callbackStatusOK("SigCaptX GetVersion", status))
      {
        this.userMsg("SigCaptX  v" + version);
        this.sigCtl.GetProperty("Component_FileVersion", this.onSigCtlGetFileVersion);
      }
    },

    onSigCtlGetFileVersion: function (sigCtlV, property, status)
    {
      if (this.callbackStatusOK("SigCtl GetProperty", status))
      {
        this.userMsg("DLL: flSigCOM.dll  v" + property.text);
        this.dynCapt.GetProperty("Component_FileVersion", this.onDynCaptGetFileVersion);
      }
    },

    onDynCaptGetFileVersion: function (dynCaptV, property, status)
    {
      if (this.callbackStatusOK("DynCapt GetProperty", status))
      {
        this.userMsg("DLL: flSigCapt.dll v" + property.text);
        this.userMsg("Test application ready.");
        this.userMsg("Press Capture or Start Wizard to capture a signature.");

        if (typeof (this.callback) === "function")
        {
          this.userMsg("Calling callback function");
          this.callback();
        }
      }
    },

    // Displays version and licence information about the current Signature SDK and SigCaptX installation
    aboutBox: function ()
    {
      if (!window.wgssSignatureSDK.running)
      {
        console.log("SDK not running");
        this.userMsg("Session error. Restarting the session.");
        this.actionWhenRestarted(this.aboutBox);
        return;
      }
      this.sigCtl.AboutBox(onAboutBox);

      function onAboutBox (sigCtlV, status)
      {
        if (window.wgssSignatureSDK.ResponseStatus.OK !== status)
        {
          this.userMsg("AboutBox error: " + status);
          if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
          {
            this.userMsg("Session error. Restarting the session.");
            this.actionWhenRestarted(this.aboutBox);
          }
        }
      }
    },
    /*  This is the main function for capturing the signature from the pad */
    capture: function ()
    {
      this.useB64Image = document.getElementById("chkUseB64Image").checked;
      this.showSigText = document.getElementById("chkShowSigText").checked;

      this.userMsg("Starting capture");

      if (!window.wgssSignatureSDK.running || this.dynCapt === null)
      {
        this.userMsg("Session error. Restarting the session.");
        this.actionWhenRestarted(window.Capture);
        return;
      }

      // Construct a hash object to contain the hash
      const hash = new window.wgssSignatureSDK.Hash(this.onInitialHashConstructor);
    },
    onInitialHashConstructor: function (hashV, status)
    {
      if (window.wgssSignatureSDK.ResponseStatus.OK === status)
      {
        this.GetHash(hashV, "INITIAL");
      }
      else
      {
        this.userMsg("Hash Constructor error: " + status);
        if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
        {
          this.userMsg("Error: invalid session. Restarting the session.");
          this.actionWhenRestarted(window.Capture);
        }
      }
    },
    // If the hash value has been calculated successfully next steps is to capture the signature
    onGetInitialHash: function ()
    {
      const fullName = this.$refs.signatory.fname + " " + this.$refs.signatory.lname;

      this.dynCapt.Capture(this.sigCtl, fullName, "Document Approval", this.hash, null, this.onDynCaptCapture);
    },
    onDynCaptCapture: function (dynCaptV, SigObjV, status)
    {
      let outputFlags = null;

      if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
      {
        this.userMsg("Error: invalid session. Restarting the session.");
        this.actionWhenRestarted(window.Capture);
      }
      else
      {
        /* Check the status returned from the signature capture */
        switch (status)
        {
          case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptOK:
            this.sigObj = SigObjV;
            this.userMsg("Signature captured successfully");

            /* Set the RenderBitmap flag depending on whether the user wants to use a picture image or B64 text value */

            if (this.useB64Image)
            {
              outputFlags = window.wgssSignatureSDK.RBFlags.RenderOutputBase64 | window.wgssSignatureSDK.RBFlags.RenderColor32BPP;
            }
            else
            {
              outputFlags = window.wgssSignatureSDK.RBFlags.RenderOutputPicture | window.wgssSignatureSDK.RBFlags.RenderColor32BPP;
            }

            this.sigObj.RenderBitmap(this.BITMAP_IMAGEFORMAT, this.imageBox.clientWidth, this.imageBox.clientHeight, this.BITMAP_INKWIDTH, this.BITMAP_INKCOLOR, this.BITMAP_BACKGROUNDCOLOR, outputFlags, this.BITMAP_PADDING_X, this.BITMAP_PADDING_Y, this.onRenderBitmap);
            break;

          case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptCancel:
            this.userMsg("Signature capture cancelled");
            break;

          case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptPadError:
            this.userMsg("No capture service available");
            break;

          case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptError:
            this.userMsg("Tablet Error");
            break;

          case window.wgssSignatureSDK.DynamicCaptureResult.DynCaptNotLicensed:
            this.userMsg("No valid Signature Capture licence found");
            break;

          default:
            this.userMsg("Capture Error " + status);
            break;
        }
      }
    },
    onRenderBitmap: function (sigObjV, bmpObj, status)
    {
      if (this.callbackStatusOK("Signature Render Bitmap", status))
      {
        /* If the user wants to demonstrate the use of B64 image strings then define an image and set its source to the B64 string */
        if (this.useB64Image)
        {
          this.userMsg("base64_image:>" + bmpObj + "<");
          this.userMsg(" ");
          const img = new Image();
          img.src = "data:image/png;base64," + bmpObj;

          if (this.imageBox.firstChild === null)
          {
            this.imageBox.appendChild(img);
          }
          else
          {
            this.imageBox.replaceChild(img, this.imageBox.firstChild);
          }
          this.userMsg(" "); // Try to flush the buffer
        }
        else
        {
          /* If RenderBitmap generated a standard image (picture) then just place that picture in the img control on the HTML form */
          if (this.imageBox.firstChild === null)
          {
            this.imageBox.appendChild(bmpObj.image);
          }
          else
          {
            this.imageBox.replaceChild(bmpObj.image, this.imageBox.firstChild);
          }
        }
        /* If the user chose the option to show the SigText value on the form then call the function to do this */
        if (this.showSigText)
        {
          sigObjV.GetSigText(this.onGetSigText);
        }
      }
    },
    /* This function takes the SigText value returned by the callback and places it in the txtSignature tag on the form */
    onGetSigText: function (sigObjV, text, status)
    {
      if (this.callbackStatusOK("Signature Render Bitmap", status))
      {
        this.sigText = text;
        this.sigTrigger = !this.sigTrigger;
      }
    },

    // This function calculates a hash value using the first and last names on the HTML form
    GetHash: function (hash, type)
    {
      this.hash = hash;
      this.type = type;
      this.hash.Clear(this.onClear);
    },

    onClear: function (hashV, status)
    {
      if (this.callbackStatusOK("Hash Clear", status))
      {
        hashV.PutType(window.wgssSignatureSDK.HashType.HashMD5, this.onPutType);
      }
    },

    onPutType: function (hashV, status)
    {
      if (this.callbackStatusOK("Hash PutType", status))
      {
        const vFname = new window.wgssSignatureSDK.Variant();
        vFname.Set(this.fname);
        hashV.Add(vFname, this.onAddFname);
      }
    },
    onAddFname: function (hashV, status)
    {
      if (this.callbackStatusOK("Hash Add", status))
      {
        const vLname = new window.wgssSignatureSDK.Variant();
        vLname.Set(this.lname);
        hashV.Add(vLname, this.onAddLname);
      }
    },

    onAddLname: function (hashV, status)
    {
      if (this.callbackStatusOK("Hash Add", status))
      {
        if (this.type === "INITIAL")
        {
          this.onGetInitialHash();
        }
        else
        {
          this.onGetHashForVerification();
        }
      }
    },
    // This function recalculates the hash value from the first and last names
    // and checks it against the hash embedded in the signature object
    verifySignedData: function (event)
    {
      if (event)
      {
        event.preventDefault();
      }
      this.userMsg("Verifying signed data...");
      if (this.sigObj === null)
      {
        this.actionWhenRestarted(window.werifySignedData);
        return;
      }
      this.hash = null;
      this.sigObj.GetIsCaptured(this.testFunc);
    },
    // Not really sure why this next function is needed but if onVerifyIsCaptured is called
    // directly from verifySignedData then processing seems to stop
    testFunc: function (sigObjV, isCaptured, status)
    {
      this.onVerifyGetIsCaptured(sigObjV, isCaptured, status);
    },
    onVerifyGetIsCaptured: function (sigObjV, isCaptured, status)
    {
      if (window.wgssSignatureSDK.ResponseStatus.OK === status)
      {
        if (isCaptured)
        {
          this.hash = new window.wgssSignatureSDK.Hash(this.onHashConstructor);
        }
        else
        {
          this.userMsg("Signature not captured");
        }
      }
      else
      {
        if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
        {
          this.userMsg("Error: invalid session. Restarting the session.");
          this.actionWhenRestarted(window.VerifySig);
        }
      }
    },
    onHashConstructor: function (hashV, status)
    {
      if (this.callbackStatusOK("Hash Constructor", status))
      {
        this.GetHash(hashV, "VERIFY");
      }
    },
    onGetHashForVerification: function ()
    {
      this.sigObj.CheckSignedData(this.hash, this.onCheck1);
    },
    onCheck1: function (hash, status)
    {
      this.onCheckSignedData(hash, status);
    },
    onCheckSignedData: function (hash, status)
    {
      if (window.wgssSignatureSDK.SignedData.DataGood === status)
      {
        this.userMsg("Signed Data OK");
      }
      else
      {
        this.userMsg("Signed Data Has Changed");
      }
    },
    /* Called if the user clicks on the signature image on the HTML document or clicks the Signature Details button
      - it displays basic capture details about the signature */
    displaySignatureDetails: function ()
    {
      if (!window.wgssSignatureSDK.running)
      {
        this.userMsg("Session error. Restarting the session.");
        this.actionWhenRestarted(window.displaySignatureDetails);
        return;
      }
      this.sigObj.GetIsCaptured(this.onDisplaySigGetIsCaptured);
    },

    onDisplaySigGetIsCaptured: function (sigObj, isCaptured, status)
    {
      if (window.wgssSignatureSDK.ResponseStatus.OK === status)
      {
        if (!isCaptured)
        {
          this.userMsg("No signature has been captured yet.");
          return;
        }
        this.sigObj.GetWho(this.onGetWho);
      }
      else
      {
        this.userMsg("Signature GetWho error: " + status);
        if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
        {
          this.userMsg("Session error. Restarting the session.");
          this.actionWhenRestarted(window.displaySignatureDetails);
        }
      }
    },

    // Displays the name of the person who entered the signature
    onGetWho: function (sigObjV, who, status)
    {
      if (this.callbackStatusOK("Signature GetWho", status))
      {
        this.userMsg("  Name:   " + who);
        const tz = window.wgssSignatureSDK.TimeZone.TimeLocal;
        this.sigObj.GetWhen(tz, this.onGetWhen);
      }
    },

    // Displays the time of signature capture
    onGetWhen: function (sigObjV, when, status)
    {
      if (this.callbackStatusOK("Signature GetWhen", status))
      {
        this.userMsg("  Date:   " + when.toString());
        this.sigObj.GetWhy(this.onGetWhy);
      }
    },

    // Displays the reason for signature capture
    onGetWhy: function (sigObjV, why, status)
    {
      if (this.callbackStatusOK("Signature GetWhy", status))
      {
        this.userMsg("  Reason: " + why);
      }
    },
    /* This function clears the current signature image from the signature control on the form */
    clearSignature: function ()
    {
      if (this.imageBox.firstChild !== null)
      {
        this.imageBox.removeChild(this.imageBox.firstChild);
      }
      if (this.sigObj === null)
      {
        this.actionWhenRestarted(window.ClearSignature);
        return;
      }
      this.sigObj.Clear(this.onClearSig);
    },
    onClearSig: function (sigObjV, status)
    {
      if (window.wgssSignatureSDK.ResponseStatus.OK !== status)
      {
        this.userMsg("ClearSignature() error: " + status);
        if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
        {
          this.userMsg("Session error. Restarting the session.");
          this.actionWhenRestarted(window.ClearSignature);
        }
      }
    },
    /* This function takes the SigText value currently displayed on the HTML form and uses it to recreate the signature image shown in the signature control tag on the form */
    setSignatureText: function ()
    {
      if (this.sigObj === null)
      {
        window.actionWhenRestarted(window.SetSignatureText);
        return;
      }
      /* First take the SigText value currently displayed in the txtSignature field on the form and assign it to the sigObj object */
      const text = this.sigText;
      this.sigObj.PutSigText(text, this.onPutSigText);
    },

    onPutSigText: function (sigObjV, status)
    {
      if (window.wgssSignatureSDK.ResponseStatus.OK === status)
      {
        /* Once the sigObj has been populated with the signature data (via the SigText) it can be used to generate a signature image */
        const outputFlags = window.wgssSignatureSDK.RBFlags.RenderOutputPicture | window.wgssSignatureSDK.RBFlags.RenderColor24BPP;

        this.sigObj.RenderBitmap(this.BITMAP_IMAGEFORMAT, this.imageBox.clientWidth, this.imageBox.clientHeight, this.BITMAP_INKWIDTH, this.BITMAP_INKCOLOR, this.BITMAP_BACKGROUNDCOLOR, outputFlags, this.BITMAP_PADDING_X, this.BITMAP_PADDING_Y, this.onRenderBitmapFromSigText);
      }
      else
      {
        this.userMsg("SetSignatureText() error: " + status);
        if (window.wgssSignatureSDK.ResponseStatus.INVALID_SESSION === status)
        {
          this.userMsg("Session error. Restarting the session.");
          this.actionWhenRestarted(window.SetSignatureText);
        }
      }
    },

    /* Take the image generated by RenderBitmap and use it to populate the signature image control on the form */
    onRenderBitmapFromSigText: function (sigObjV, bmpObj, status)
    {
      if (this.callbackStatusOK("Signature Render Bitmap", status))
      {
        if (this.imageBox.firstChild === null)
        {
          this.imageBox.appendChild(bmpObj.image);
        }
        else
        {
          this.imageBox.replaceChild(bmpObj.image, this.imageBox.firstChild);
        }
      }
    },
    //  This function enables the Restore button if the user has selected the option to output SigText
    enableRestoreButton: function (event)
    {
      const btnRestore = document.getElementById("Restore");

      if (document.getElementById("chkShowSigText").checked)
      {
        btnRestore.disabled = false;
      }
      else
      {
        btnRestore.disabled = true;
      }
    }
  },
  mounted ()
  {
    this.bodyonload();
  }
};
</script>

<template>

      <h2> {{ pageHeading }} </h2>

      <table style="padding: 10px 20px;">
        <tr>
          <td rowspan="3">
            <div id="imageBox" class="boxed" style="height:35mm;width:60mm; border:1px solid #d3d3d3;" @click="displaySignatureDetails" title="Click a signature to display its details">
            </div>
          </td>
          <td  style="padding: 10px 20px;">
            <input type="button" value="Capture" style="height:10mm;width:35mm" @click="capture"
            title="Starts signature capture" />
          </td>
          <td style="padding: 10px 20px;">
            <input type="button" value="Verify" style="height:10mm;width:35mm" v-on:click="verifySignedData"
            title="Checks the signature hash" />
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 20px;">
            <input type="button" value="Clear" style="height:10mm;width:35mm" @click="clearSignature"
            title="Clears the signature" />
          </td>
          <td style="padding: 10px 20px;">
            <input type="button" value="License Info" style="height:10mm;width:35mm" @click="aboutBox"
            title="Displays the Help About box" />
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 20px;">
            <input type="button" id="Restore" value="Restore" disabled style="height:10mm;width:35mm" @click="setSignatureText"
            title="Restores the signature from the SigText data. To use this function please tick <Output SigText to form>" />
          </td>
          <td style="padding: 10px 20px;">
            <input type="button" value="Signature Details" style="height:10mm;width:35mm" @click="displaySignatureDetails"
            title="Displays the signature details" />
          </td>
        </tr>
      </table>
      <SignerName ref="signatory"/>
      <SigOptions @showSigText="enableRestoreButton"/>
      <SigText :triggerProp="sigTrigger" :sigText="sigText"/>
      <UserMessage :messageProp="messageTrigger" :messageText="messageText"/>
</template>
