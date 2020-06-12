<?php

/***************************************************************************
  savesig.php
   
	PHP script called via Apache when the SigCaptX form SigCaptX.php POSTs a request to it.
	It takes the parameters supplied in the POST request and uses them to generate
	an image of the user's signature which is then saved on disk as a PNG file
  
  Copyright © 2020 Wacom. All Rights Reserved.
  
  v1.0
  
 ***************************************************************************/
 
require_once('initialize.php');
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{	
	// Get the parameter values from the request string
	$sigtext = $_REQUEST['Sigtext'] ?? "No data";
	$firstname = $_REQUEST['Firstname'] ?? "John";
	$lastname = $_REQUEST['Lastname'] ?? "Smith";
	$reason = $_REQUEST['Reason'] ?? "why";
	$tablet = $_REQUEST['Tablet'] ?? "Unknown";
	$signatory = $firstname . ' ' . $lastname;
	
	// Create variable containing the name of the PNG file
	$filenamedate = date("Ymd_His");
	
	if ($sigtext != "No data")
	{		
		// Create a sigObj from SigText parameter so that we can generate an image file
    $sigObj = new COM("Florentis.SigObj") or die("Could not instantiate SigObj");
		$sigObj->SigText = $sigtext;
		
		// Construct a unique name for the signature image file
		logMsg("IMAGES_FOLDER: " . IMAGES_FOLDER);
		$filename = IMAGES_FOLDER . "\\" . $firstname . '_' . $lastname . '-' . $tablet . '-' . $filenamedate . ".png";
		logMsg("Outputfile: " . $filename);
		
		$flags = 0x481000; //SigObj.outputFilename | SigObj.color32BPP | SigObj.encodeData
		try
		{
			$rc = $sigObj->RenderBitmap($filename, 300, 150, "image/png", 0.5, 0xff0000, 0xffffff, 0.0, 0.0, $flags );
			logMsg("Result code from RenderBitmap: " . $rc);
			echo $rc;
		}
		catch (exception $e)
		{
			logMsg("RenderBitMap exception: " . $e );
			echo $e;
		}
	}
	else
	{
		echo '100';
	}
}
else
{
	echo '0';
}
?>