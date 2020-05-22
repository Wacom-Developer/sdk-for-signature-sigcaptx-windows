SIGCAPTX RELEASE NOTES

SigCaptX is the codename for the cross-browser Signature SDK replacement for Internet Explorer's ActiveX browser support. Using only javascript and JSONP on the browser side, SigCaptX provides full Signature SDK functionality to the browser. SigCaptX is targeted to work on Internet Explorer 8 and higher, Firefox, Chrome and Edge and supports both HTTP and HTTPS webpages.

Pre-requisite: A Windows PC running Windows 7 or later.


REGISTRY SETTINGS

The registry settings of SigCaptX are under the Windows registry key "HKEY_LOCAL_MACHINE/SOFTWARE/Wacom/SigCaptX".

> Choosing HTTP or HTTPS

By default, SigCaptX will only accept HTTPS connections, but it can be configured to accept HTTP connections. In that case, it will only accept HTTP connections. If you want to change the settings, change the "ssl" value to "true" or "false".

> Port settings

SigCaptX needs to run one service on the computer, as well as one background task for each logged user. Each process uses a unique TCP port for localhost communications. To configure the range of port numbers to be used, change the "start_port" and "end_port" values.

> Proxy settings

Occasionally a SigCaptX background task needs to use the internet, such as when ReadEncodedBitmap is called with a URL for the encoded bitmap. The default settings disable the use of a proxy. To configure the proxy, change the "use_proxy" value to "true" and change the registry values "proxy_ip", "proxy_port", "proxy_user", and "proxy_pass". 

SAMPLE

A sample webpage "demo.htm" is provided in the SigCaptX-Samples download file. In order to test this please first copy it to the demo folder in C:\Program Files (x86)\Wacom SigCaptX. 
In order to simplify the use of this sample the web server is a localhost python process and the server SSL certificate used is the same one as the one used by SigCaptX.
In a real world scenario the webpage server would be remote and it would need to use its own certificate.

To run the sample, first you need to install Python 2.x on your machine and add Python to the windows PATH environment variable. Also, if you have modified the "start_port" value in the registry, you will need to modify the webpage demo/demo.htm. 
The example also uses the wgssSigCaptX.js and base64.js files. The web server needs to know that port number beforehand so that it can talk to the local SigCaptX background service of the user's machine. 
Specifically, you need to change this line of demo/demo.htm:

var wgssSignatureSDK = new WacomGSS_SignatureSDK(onDetectRunning, 8000)

Change 8000 to the port that you have specified as "start_port" in the registry.

Then execute demo/server.py:

> python server.py

Now you can load the webpage from a browser by visiting https://localhost:7999/demo.htm