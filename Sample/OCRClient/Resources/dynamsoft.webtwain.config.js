//
// Dynamsoft JavaScript Library for Basic Initiation of Dynamic Web TWAIN
// More info on DWT: http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx
//
// Copyright 2016, Dynamsoft Corporation 
// Author: Dynamsoft Team
// Version: 11.3.1
//
/// <reference path="dynamsoft.webtwain.initiate.js" />
var Dynamsoft = Dynamsoft || { WebTwainEnv: {} };

Dynamsoft.WebTwainEnv.AutoLoad = true;
///
Dynamsoft.WebTwainEnv.Containers = [{ContainerId:'dwtcontrolContainer', Width:'506px', Height:'650px'}];
///
Dynamsoft.WebTwainEnv.ProductKey = '977B68B60385218EFE8C0AC47F88C6C93F63B5227805D6EBCDC1FEC7298677E9F3CC18CA4E9230B4D9F064461CB3D3C397CAFF9C8452A438A1CB12D73A18650C610C72E509146864B6A741CC27E4E070D74963B01998AFF3A66485181EE44A1E4B52ABB383B0E45D6128702CBEC95CE6C06391D2B3C597099A3ED1D13FC71461D915B8A1B550CF48AF55D27EFDD777ABFB745BB9838DBBD1B11C01ECB53E49A032A03664FBD13C256BB79024D8443DB3C5D70871F568B2B1483550DEF53A839B0133E82D2E';
///
Dynamsoft.WebTwainEnv.Trial = true;//false;

Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB = true;//false;
///
Dynamsoft.WebTwainEnv.Debug = false; // only for debugger output
///
Dynamsoft.WebTwainEnv.ResourcesPath = 'Resources';
///
//Dynamsoft.WebTwainEnv.ScanDirectly = true;


/// All callbacks are defined in the dynamsoft.webtwain.install.js file, you can customize them.

// Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', function(){
// 		// webtwain has been inited
// });

