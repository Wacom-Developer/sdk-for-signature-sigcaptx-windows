<%@ Page Title="SigCaptX Sample" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ASP_Sample._Default" %>

 <asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" style="margin: 0px; width: 770px; height:100%" runat="server">

    <!-- Load the sigcaptX JS -->
    <script src="Scripts/wgssSigCaptX.js" type="text/javascript"></script>
    <script src="Scripts/base64.js" type="text/javascript"></script>

    <!-- Create the port checking JS -->
    <script type="text/javascript" id="signature">

        //This prints output to the text field on the page
        function print(txt) {
            var txtDisplay = document.getElementById("txtDisplay");
            if ("CLEAR" == txt) {
                txtDisplay.value = "";
            }
            else {
                txtDisplay.value += txt + "\n";
                txtDisplay.scrollTop = txtDisplay.scrollHeight; // scroll to end
            }
        }
       
        var wgssSignatureSDK;
        var sigObj = null;
        var sigCtl = null;
        var dynCapt = null;
        var l_name = null;
        var l_reason = null;
        var l_imageBox = null;

        //Assumes the default host / port for sig captX (localhost, 8000). Checks for sigcapt service.  Called from Default.aspx.cs
        function startSession() {
            print("Detecting SigCaptX");
      
            wgssSignatureSDK = new WacomGSS_SignatureSDK(onDetectRunning, 8000);

            function onDetectRunning() {
                print("SigCaptX detected");
                clearTimeout(timeout);
            }

            var timeout = setTimeout(timedDetect, 1500);
            function timedDetect() {
                if (wgssSignatureSDK.running) {
                    print("SigCaptX detected");
                }
                else {
                    if (wgssSignatureSDK.service_detected) {
                        print("SigCaptX service detected, but not the server");
                    }
                    else {
                        print("SigCaptX service not detected");
                    }
                }
            }
        }

        //Reset the session for signature capture
        function restartSession(callback) {
            //First, reset the objects 
            wgssSignatureSDK = null;
            sigCtl = null;
            sigObj = null;
            dynCapt = null;

            var timeout = setTimeout(timedDetect, 1500);

            //Startup the SDK - assumes default port
            wgssSignatureSDK = new WacomGSS_SignatureSDK(onDetectRunning, 8000);

            function timedDetect() {
                if (wgssSignatureSDK.running) {
                    print("Signature SDK Service detected.");
                    start();
                }
                else {
                    print("Signature SDK Service not detected.");
                }
            }


            function onDetectRunning() {
                if (wgssSignatureSDK.running) {
                    print("Signature SDK Service detected.");
                    clearTimeout(timeout);
                    start();
                }
                else {
                    print("Signature SDK Service not detected.");
                }
            }

            function start() {
                if (wgssSignatureSDK.running) {
                    sigCtl = new wgssSignatureSDK.SigCtl(onSigCtlConstructor);
                }
            }

            function onSigCtlConstructor(sigCtlV, status)
            {
               if(wgssSignatureSDK.ResponseStatus.OK == status)
               {
                 // Insert license here:
                 sigCtl.PutLicence("AgAkAEy2cKydAQVXYWNvbQ1TaWduYXR1cmUgU0RLAgKBAgJkAACIAwEDZQA", onSigCtlPutLicence);
               }
               else
               {
                  print("SigCtl constructor error: " + status);
               }
            }

            function onSigCtlPutLicence(sigCtlV, status) {
                if (wgssSignatureSDK.ResponseStatus.OK == status) {
                    dynCapt = new wgssSignatureSDK.DynamicCapture(onDynCaptConstructor);
                }
                else {
                    print("SigCtl constructor error: " + status);
                }
            }

            function onDynCaptConstructor(dynCaptV, status) {
                if (wgssSignatureSDK.ResponseStatus.OK == status) {
                    sigCtl.GetSignature(onGetSignature);
                }
                else {
                    print("DynCapt constructor error: " + status);
                }
            }

            function onGetSignature(sigCtlV, sigObjV, status) {
                if (wgssSignatureSDK.ResponseStatus.OK == status) {
                    sigObj = sigObjV;
                    sigCtl.GetProperty("Component_FileVersion", onSigCtlGetProperty);
                }
                else {
                    print("SigCapt GetSignature error: " + status);
                }
            }

            function onSigCtlGetProperty(sigCtlV, property, status) {
                if (wgssSignatureSDK.ResponseStatus.OK == status) {
                    print("DLL: flSigCOM.dll  v" + property.text);
                    dynCapt.GetProperty("Component_FileVersion", onDynCaptGetProperty);
                }
                else {
                    print("SigCtl GetProperty error: " + status);
                }
            }

            function onDynCaptGetProperty(dynCaptV, property, status) {
                if (wgssSignatureSDK.ResponseStatus.OK == status) {
                    print("DLL: flSigCapt.dll v" + property.text);
                    print("Test application ready.");
                    print("Press 'Start' to capture a signature.");
                    if ('function' === typeof callback) {
                        callback();
                    }
                }
                else {
                    print("DynCapt GetProperty error: " + status);
                }
            }
        }

        //Capture the first signature with the specified name and reason fields
        function captureSignature1(name, reason, imageBox) {
            l_name = name;
            l_reason = reason;
            l_imageBox = imageBox;
            Capture();
        }

       
        //Capture the first signature with the specified name and reason fields
        function captureSignature2(name, reason, imageBox) {
            l_name = name;
            l_reason = reason;
            l_imageBox = imageBox;
            Capture();
        }

        //Do the capture
        function Capture() {

            if(wgssSignatureSDK == null || !wgssSignatureSDK.running || null == dynCapt)
            {
                print("Session error. Restarting the session.");
                restartSession(window.Capture);
                return;
            }
            dynCapt.Capture(sigCtl, l_name, l_reason, null, null, onDynCaptCapture);

            function onDynCaptCapture(dynCaptV, SigObjV, status) {
                if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
                    print("Error: invalid session. Restarting the session.");
                    restartSession(window.Capture);
                }
                else {
                    if (wgssSignatureSDK.DynamicCaptureResult.DynCaptOK != status) {
                        print("Capture returned: " + status);
                    }
                    switch (status) {
                        case wgssSignatureSDK.DynamicCaptureResult.DynCaptOK:
                            sigObj = SigObjV;
                            print("Signature captured successfully");
                            //Produce a bitmap image with steganograpics
                            var flags = wgssSignatureSDK.RBFlags.RenderOutputBase64 |
                                        wgssSignatureSDK.RBFlags.RenderEncodeData |
                                        wgssSignatureSDK.RBFlags.RenderColor24BPP;

                            var imageBox = document.getElementById(l_imageBox);
                            sigObj.RenderBitmap("bmp", imageBox.clientWidth, imageBox.clientWidth, 0.7, 0x00000000, 0x00FFFFFF, flags, 0, 0, onRenderBitmap);
                            break;
                        case wgssSignatureSDK.DynamicCaptureResult.DynCaptCancel:
                            print("Signature capture cancelled");
                            break;
                        case wgssSignatureSDK.DynamicCaptureResult.DynCaptPadError:
                            print("No capture service available");
                            break;
                        case wgssSignatureSDK.DynamicCaptureResult.DynCaptError:
                            print("Tablet Error");
                            break;
                        case wgssSignatureSDK.DynamicCaptureResult.DynCaptIntegrityKeyInvalid:
                            print("The integrity key parameter is invalid (obsolete)");
                            break;
                        case wgssSignatureSDK.DynamicCaptureResult.DynCaptNotLicensed:
                            print("No valid Signature Capture licence found");
                            break;
                        case wgssSignatureSDK.DynamicCaptureResult.DynCaptAbort:
                            print("Error - unable to parse document contents");
                            break;
                        default:
                            print("Capture Error " + status);
                            break;
                    }
                }
            }
        }

        ///Called when the signature image is received 
        function onRenderBitmap(sigObjV, bmpObj, status) 
        {
            if(wgssSignatureSDK.ResponseStatus.OK == status) 
            {
                var imageBox = document.getElementById(l_imageBox);
                if(null == imageBox.firstChild)
                {
                    imageBox.appendChild(bmpObj.image);
                }
                else
                {
                    imageBox.replaceChild(bmpObj.image, imageBox.firstChild);
                }
            } 
            else 
            {
                print("Signature Render Bitmap error: " + status);
            }
      
            //And get the base64 too
            sigObj.GetSigText(onGetText);
        }

        //Generate a random file name - in production, the filename could be set to transaction ID
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }

        ///Called when the signature text is received uploads the FSS to the server and writes out the file
        function onGetText(sigObjV, text, status) {
            var name = guid();

            $.ajax({
                type: 'POST',
                url: 'Default.aspx/ReceivedSignatureText',
                data: '{ signature: "' + text + '", guid: "' + name + '" }',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (msg) {
                }
            });

            print("Sent " + name + ".txt to server as BASE64 encoded FSS");
        }

        function DisplaySignatureDetails() {
            if (!wgssSignatureSDK.running || null == sigObj) {
                print("Session error. Restarting the session.");
                restartSession(window.DisplaySignatureDetails);
                return;
            }
            sigObj.GetIsCaptured(onGetIsCaptured);

            function onGetIsCaptured(sigObj, isCaptured, status) {
                if (wgssSignatureSDK.ResponseStatus.OK == status) {
                    if (!isCaptured) {
                        print("No signature has been captured yet.");
                        return;
                    }
                    sigObj.GetWho(onGetWho);
                }
                else {
                    print("Signature GetWho error: " + status);
                    if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
                        print("Session error. Restarting the session.");
                        restartSession(window.DisplaySignatureDetails);
                    }
                }
            }

            function onGetWho(sigObjV, who, status) {
                if (wgssSignatureSDK.ResponseStatus.OK == status) {
                    print("  Name:   " + who);
                    var tz = wgssSignatureSDK.TimeZone.TimeLocal;
                    sigObj.GetWhen(tz, onGetWhen);
                }
                else {
                    print("Signature GetWho error: " + status);
                }
            }

            function onGetWhen(sigObjV, when, status) {
                if (wgssSignatureSDK.ResponseStatus.OK == status) {
                    print("  Date:   " + when.toString());
                    sigObj.GetWhy(onGetWhy);
                }
                else {
                    print("Signature GetWhen error: " + status);
                }
            }

            function onGetWhy(sigObjV, why, status) {
                if (wgssSignatureSDK.ResponseStatus.OK == status) {
                    print("  Reason: " + why);
                }
                else {
                    print("Signature GetWhy error: " + status);
                }
            }

        }
    </script>
      
    <h1>SigCaptX Sample</h1>
    <p>Click the 'Check SigCaptX' button to test if SigCaptX is installed on the client, or 'Capture Signature' to run the signature capture sample
    <br /><br />
    
 
        </p>

    <div style="width:100%">

       
     <asp:UpdatePanel ID="UpdatePanel1" UpdateMode="Conditional" runat="server">
     <ContentTemplate> 

     <table style="padding: 0px 0px; margin-right:40px; float: left;">

        <tr>
          <td rowspan="3" style="padding: 5px 10px;">
            <div id="imageBox1" class="boxed" style="height:40mm;width:45mm; border:1px solid #d3d3d3;" ondblclick="DisplaySignatureDetails1()" title="Double-click a signature to display its details">
            </div>
          </td>

          <td  style="padding: 5px 10px;">
            <asp:Button ID="Button1" runat="server" OnClick="CheckSigcaptX_Click" Text="Check SigCaptX" Height="30px" Width="200px"/>
          </td>
        </tr> 

        <tr>
          <td style="padding: 5px 10px;">
            <asp:Button ID="CaptureSignature1" runat="server" OnClick="Capture_Signature_Click1" Text="Capture First Signature"  Height="30px" Width="200px" />
          </td>

        </tr>

        <tr>
          <td style="padding:5px 10px;">
            <asp:Button ID="Reset1" runat="server" OnClick="Reset_Click1" Text="Reset" Height="30px" Width="200px" />
          </td>

        </tr>

      </table>
      </ContentTemplate>
      </asp:UpdatePanel>

     <asp:UpdatePanel ID="UpdatePanel2" UpdateMode="Conditional" runat="server">
     <ContentTemplate> 

      <table style="padding: 0px 0px;">
        <tr>
         <td rowspan="2" style="padding: 5px 10px;">
            <div id="imageBox2" class="boxed" style="height:40mm;width:45mm; border:1px solid #d3d3d3;" ondblclick="DisplaySignatureDetails1()" title="Double-click a signature to display its details">
            </div>
          </td>

          <td style="padding: 5px 10px;">
            <asp:Button ID="CaptureSignature2" runat="server" OnClick="Capture_Signature_Click2" Text="Capture Second Signature"  Height="30px" Width="200px" />
          </td>
         </tr>

         <tr>
           <td style="padding:5px 10px;">
            <asp:Button ID="Reset2" runat="server" OnClick="Reset_Click2" Text="Reset" Height="30px" Width="200px" />
           </td>
         </tr>


      </table>
    </ContentTemplate>
    </asp:UpdatePanel>

    <br />

    <p>
           <asp:Label ID="NameLabel" runat="server" Text="Name: " BorderStyle="None" BorderWidth="5px" CssClass="text-primary"></asp:Label>    
           <asp:TextBox ID="nameBox" runat="server" Text="J Smith" Height="30px"></asp:TextBox>  
           &nbsp;<asp:Label ID="ReasonLabel" runat="server" Text="Reason: " BorderStyle="None" BorderWidth="5px" CssClass="text-primary"></asp:Label> 
           <asp:TextBox ID="reasonBox" runat="server" Text="Finance Approval" Height="30px"></asp:TextBox><br />

     </p>      
     
     <br /> <br />
     <textarea cols="125" rows="100" id="txtDisplay"></textarea>
    </div>
    </asp:Content>
