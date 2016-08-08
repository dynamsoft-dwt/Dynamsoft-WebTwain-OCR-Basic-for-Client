<!DOCTYPE html>
<html>
<head>
<title>Online OCR | Dynamic Web TWAIN SDK | Dynamsoft</title>
<meta http-equiv="description" content="The sample demonstrates how to scan documents or import local images in browsers with Dynamic Web TWAIN, and then perform OCR at the client side." />
<script src="Resources/dynamsoft.webtwain.config.js"></script>
<script src="Resources/dynamsoft.webtwain.initiate.js"></script>
<script src="Resources/addon/dynamsoft.webtwain.addon.ocr.js"> </script>
<script src="Resources/addon/dynamsoft.webtwain.addon.pdf.js"></script>
<link rel="stylesheet" href="Style/ds.demo.css">
</head>
<body>
<div id="tipTop"> <span onclick="this.parentElement.style.display='none'" class="close">&times;</span>
    <p>This demo only works on modern browsers on Windows like Chrome 27+ &amp; Firefox 27+ and Edge & IE 11</p>
</div>
<div id="header"> <span onclick="this.parentElement.style.display='none'" class="close">&times;</span>
    <div class="container">
        <div id="headerTop" class="row">
            <div class="ct-lt fl clearfix">
                <div class="logo fl mr20"> <img src="Style/Images/logo-dwt-56x56.png" alt="Logo"> </div>
                <div class="fl">
                    <div class="linkGroup"> <a target="_blank" class="bluelink ds-font-size-14" href="http://www.dynamsoft.com">Dynamsoft</a><span> / </span> <a target="_blank" class="bluelink ds-demo-font-size-14" href="http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx">Dynamic Web TWAIN</a><span> / </span> <a target="_blank" class="bluelink ds-demo-font-size-14" href="http://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx">Code Gallery</a><span> / </span> </div>
                    <h1>Scan Documents and Client-side OCR <i>basic</i></h1>
                </div>
            </div>
            <div class="ct-rt fr"><a target="_blank" href="http://www.dynamsoft.com/Downloads/WebTWAIN_Download.aspx" class="btn lgBtn bgOrange">Download SDK</a> </div>
        </div>
        <div id="headerBtm" class="row"> The sample demonstrates how to scan documents or import local images in browsers with Dynamic Web TWAIN, and then perform OCR at the client side. </div>
    </div>
</div>
<div id="main">
    <div class="container">
        <div class="ct-lt clearfix"> 
            <!-- dwtcontrolContainer is the default div id for Dynamic Web TWAIN control.
             If you need to rename the id, you should also change the id in the dynamsoft.webtwain.config.js accordingly. -->
            <div id="dwtcontrolContainer"></div>
        </div>
        <div class="ct-rt">
            <div class="content clearfix">
                <ul class="lt">
                    <li>
                        <input type="button" value="Scan" onclick="AcquireImage();" class="btn" />
                    </li>
                    <li>Language:</li>
                    <li>Output Format:</li>
                </ul>
                <ul class="rt">
                    <li>
                        <input type="button" value="Open a Local Image" onclick="LoadImages();" class="btn" />
                    </li>
                    <li>
                        <select size="1" id="ddlLanguages" class="w100p">
                        </select>
                    </li>
                    <li>
                        <select size="1" id="ddlOCROutputFormat" class="w100p">
                        </select>
                    </li>
                    <li>
                        <input type="button" value="OCR" onclick="DoOCR();" class="mt20 btn bgBlue" style="width:130px;"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div id="footer"> <span onclick="this.parentElement.style.display='none'" class="close">&times;</span>
    <div class="container">
        <div id="footerTop" class="row">
            <div class="item contact"> <strong class="fc4">Contact Us</strong>
                <ul>
                    <li><a class="graylink" href="mailto:support@dynamsoft.com">support@dynamsoft.com</a></li>
                    <li><a target="_blank" class="graylink" href="http://www.dynamsoft.com/Support/LiveHelp.aspx">Live Chat</a> / <a target="_blank" class="graylink" href="http://www.dynamsoft.com/Support/LiveHelp.aspx">Submit a Form</a></li>
                    <li>1-604-605-5491 (Toll-Free)</li>
                </ul>
            </div>
            <div class="item features"> <strong class="fc4">Features Demonstrated</strong>
                <ul class="org-li">
                    <li>Scan documents &amp; load local Images</li>
                    <li>Rasterize and load local PDF files</li>
                    <li>Perform OCR on the image(s)</li>
                </ul>
            </div>
            <div class="item license"> <strong class="fc4">License Required</strong>
                <ul class="org-li">
                    <li>Core SDK licenses (Windows)</li>
                    <li>Add-on License for Basic OCR on the Client-side</li>
                    <li>Core SDK licenses for Mac (if needed)</li>
                    <li>Add-on License for PDF Rasterizer (if needed)</li>
                    <li><a class="bluelink ds-demo-font-size-14" href="mailto:sales@dynamsoft.com">Contact Dynamsoft Sales</a>&nbsp;<span class="fcBlue"> | </span>&nbsp;<a target="_blank" class="bluelink ds-demo-font-size-14" href="https://www.dynamsoft.com/Secure/WebTWAIN_BuyIt.aspx">Visit Online Store</a></li>
                </ul>
            </div>
        </div>
        <div id="footerBtm" class="row">
            <div class="ct-lt tc fl">&copy; 2003 - <script>document.write((new Date()).getFullYear());</script> Dynamsoft. All rights reserved. <a href="http://www.dynamsoft.com/PrivacyStatement.aspx">Privacy Statement</a> / <a href="http://www.dynamsoft.com/SiteMap.html">Site Map</a> </div>
            <div class="ct-rt tr fr"><a href="http://www.dynamsoft.com/">Home</a> / <a href="http://www.dynamsoft.com/Purchase/Purchase.aspx">Purchase</a> / <a href="http://www.dynamsoft.com/Support/Support.aspx">Support</a></div>
        </div>
    </div>
</div>
<script src="ocrbasicclientside.js"></script>
</body>
</html>
