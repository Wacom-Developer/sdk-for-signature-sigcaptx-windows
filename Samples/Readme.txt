SIGCAPTX RELEASE NOTES

SigCaptX is the codename for the cross-browser Wacom Ink SDK for signature replacement for Internet Explorer's ActiveX browser support. Using only javascript and JSONP on the browser side, SigCaptX provides full SDK functionality to the browser. SigCaptX is targeted to work on Internet Explorer 8 and higher, Firefox, Chrome and Edge and supports both HTTP and HTTPS webpages.

Pre-requisite: A Windows PC running Windows 7 or later.


REGISTRY SETTINGS

The registry settings of SigCaptX are under the Windows registry key "HKEY_LOCAL_MACHINE/SOFTWARE/Wacom/SigCaptX".

> Choosing HTTP or HTTPS

By default, SigCaptX will only accept HTTPS connections, but it can be configured to accept HTTP connections. In that case, it will only accept HTTP connections. If you want to change the settings, change the "ssl" value to "true" or "false".

> Port settings

SigCaptX needs to run one service on the computer, as well as one background task for each logged user. Each process uses a unique TCP port for localhost communications. To configure the range of port numbers to be used, change the "start_port" and "end_port" values.

> Proxy settings

Occasionally a SigCaptX background task needs to use the internet, such as when ReadEncodedBitmap is called with a URL for the encoded bitmap. The default settings disable the use of a proxy. To configure the proxy, change the "use_proxy" value to "true" and change the registry values "proxy_ip", "proxy_port", "proxy_user", and "proxy_pass". 