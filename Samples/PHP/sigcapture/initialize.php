<?php
  ob_start(); // output buffering is turned on
  
// Assign file paths to PHP constants
// __FILE__ returns the current path to this file
// dirname() returns the path to the parent directory
define("ROOT_FOLDER", dirname(__FILE__));
define("IMAGES_FOLDER", dirname(ROOT_FOLDER) . '\images');
define("ICONS_FOLDER", dirname(ROOT_FOLDER) . '\icons');
define("DEBUGFILE", ROOT_FOLDER . '\phpdebug.txt'); 
define("DEBUG", true);
  
require_once('functions.php');
?>
