# PHP Sample for SigCaptX for Windows

## Download the SDK

The Signature SDK and SigCaptX library will need to be installed on your local (client) machine.  
The Signature SDK must also be installed on your server (does not apply for testing on localhost). 
 
Please note that the PHP server-side code relies on the Signature SDK being installed on the server as well.   
This PHP sample has only been tested with a Windows-based server and will not currently work with a Linux server.  
Please see the GETTING-STARTED document in the home folder for instructions on installing the Signature SDK and SigCaptX library and licence.

The instructions below are appropriate for testing the sample on a local PC using localhost.  
When testing with a remote server the URL for running it will need to be modified appropriately.  

## Download and install PHP

1. Download a thread-safe version of PHP from https://windows.php.net/download and install in C:\php  

2. Copy php.ini-development or php.ini-production to php.ini  

3. If in a development environment edit php.ini and make sure that the following line is not commented out:  


    display_errors = On

4. In php.ini add the following lines (e.g. just prior to the “Dynamic Extensions” section):  


    [PHP_COM_DOTNET]  
    extension=php_com_dotnet.dll  

5. Additionally in the section headed “[COM]” remove the comments from the following lines:  


    http://php.net/com.allow-dcom  
    com.allow_dcom = true  

	
## Install Apache

1. Download Apache for Windows from https://www.apachelounge.com/download/  

2. Extract the Apache zip file to your chosen installation directory.  

3. Add the following 3 lines to the end of your Apache configuration file (httpd.conf):  


    LoadModule php7_module "C:/php/php7apache2_4.dll"  
    AddHandler application/x-httpd-php .php  
    PHPIniDir "c:/php"  

4. If you haven’t installed PHP in C:/php then modify the path names above as required.

5. Run the following command from the Apache bin subdirectory to install the Apache service:    

    ```
    httpd.exe -k install  
	  ```

If errors occur when starting Apache change the default port (80) in httpd.conf.  
If needed at any time the Apache service can be started or restarted from Windows Services.  
For more detailed installation instructions please see https://httpd.apache.org/docs/current/platform/windows.html  


## Install the PHP sample code

Extract the SigCaptX sample code into C:\{APACHE}\htdocs\ where {APACHE} is the name of the folder where you installed Apache.  
You should therefore end up with 2 subfolders in {APACHE}\htdocs called “sigcapture” and “images”.  
The “images” folder should be empty. If the “images” folder is missing please create it.  

## Run the sample

From a browser enter http://localhost:80/sigcapture/SigCaptX.php

## General note

Please note that we cannot accept any liability for information provided on third-party web sites.




