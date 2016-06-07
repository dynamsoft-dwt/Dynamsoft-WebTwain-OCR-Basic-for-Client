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
<body class="ds-demo-main">
    <div class="ds-demo-head">
        <span onclick="this.parentElement.style.display='none'" class="ds-demo-closebtn ds-demo-margin-right" style="margin-top: -50px">^</span>
        <div class="ds-demo-container">
            <div class="ds-demo-row content-top">
                <div class="ds-demo-left">
                    <div class="ds-demo-left">
                        <img src="Style/Images/icon-DWT.png" alt="Logo">
                    </div>
                    <div class="ds-demo-left ds-demo-margin-left">
                        <div>
                            <a target="_blank" class="bluelink ds-font-size-14" href="http://www.dynamsoft.com">Dynamsoft</a><span> / </span>
                            <a target="_blank" class="bluelink ds-demo-font-size-14" href="http://www.dynamsoft.com/Products/WebTWAIN_Overview.aspx">Dynamic Web TWAIN</a><span> / </span>
                            <a target="_blank" class="bluelink ds-demo-font-size-14" href="http://www.dynamsoft.com/Downloads/WebTWAIN-Sample-Download.aspx">code gallery</a><span> / </span>
                        </div>
                        <h1>Scan Documents and Client-side OCR <i>basic</i></h1>
                    </div>
                </div>
                <div class="ds-demo-right content-rt"><a target="_blank" href="http://www.dynamsoft.com/Downloads/WebTWAIN_Download.aspx" class="ds-demo-orange ds-demo-btn-large">Download SDK</a> </div>
            </div>
            <div class="ds-demo-row content-btm ds-demo-padding-top-large">
                The sample demonstrates how to scan documents or import local images in browsers with Dynamic Web TWAIN, and then perform OCR at the client side.
            </div>
        </div>
    </div>

    <div class="ds-demo-container ds-demo-padding-top-large ds-demo-center">
        <div id="divLeft" class="ds-demo-left ds-demo-inline-block ds-demo-border-light-grey" style="width: 508px; height: 650px;">
            <!-- dwtcontrolContainer is the default div id for Dynamic Web TWAIN control.
             If you need to rename the id, you should also change the id in the dynamsoft.webtwain.config.js accordingly. -->
            <div id="dwtcontrolContainer"></div>
        </div>
        <div class="ds-demo-left ds-demo-bright-grey ds-demo-inline-block ds-demo-padding-large ds-demo-center ds-demo-border-light-grey" style="width: 470px; height: 650px;">
            <input type="button" value="Scan" onclick="AcquireImage();" class="ds-demo-btn ds-demo-width-92 ds-demo-margin-left-large" />
            <input type="button" value="Open a local image" onclick="LoadImages();" class="ds-demo-btn ds-demo-width-168 ds-demo-margin-left-large" />
            <div>
                <label class="ds-demo-lbl">Language:</label>
                <select size="1" id="ddlLanguages" class="ds-demo-select"></select>
            </div>
            <div>
                <label class="ds-demo-lbl">Output Format:</label>
                <select size="1" id="ddlOCROutputFormat" class="ds-demo-select"></select>
            </div>

            <div>
                <input type="button" value="OCR" onclick="DoOCR();" class="ds-demo-blue ds-demo-btn-large ds-demo-border-0 ds-demo-margin" />
            </div>

        </div>
    </div>
    <div class="ds-demo-footer ds-demo-margin-top-large">
        <span onclick="this.parentElement.style.display='none'" class="ds-demo-closebtn ds-demo-margin-right" style="margin-top: -10px">&times;</span>
        <div class="ds-demo-container">
            <div class="ds-demo-row content-top">
                <div class="ds-demo-left ds-demo-40PCT ds-demo-clearfix">
                    <strong>Features Demonstrated</strong>
                    <ul class="ds-demo-ul">
                        <li>Scan documents &amp; load local Images</li>
						<li>Rasterize and load local PDF files</li>
						<li><strong>Perform OCR on the image(s)</strong></li>
                    </ul>
                </div>
                <div class="ds-demo-right ds-demo-40PCT ds-demo-clearfix">
                    <strong>License Required</strong>
                    <ul class="ds-demo-ul">
                        <li>Core SDK licenses (Windows)</li>
						<li>Add-on License for Basic OCR on the Client-side</li>
                        <li>Core SDK licenses for Mac <i>(if needed)</i></li>
                        <li>Add-on License for PDF Rasterizer <i>(if needed)</i></li>                        
                        <li><a class="bluelink ds-demo-font-size-14" href="mailto:sales@dynamsoft.com"><i>Contact Dynamsoft Sales</i></a></li>
                        <li><a target="_blank" class="bluelink ds-demo-font-size-14" href="https://www.dynamsoft.com/Secure/WebTWAIN_BuyIt.aspx"><i>More info</i></a></li>
                    </ul>
                </div>
                <div class="ds-demo-left ds-demo-block ds-demo-padding-top">
                    <hr />
                    <p>
                        Copyright &copy;
						<script>document.write((new Date()).getFullYear());</script>
                        <strong>Dynamsoft TST Team</strong>  &vert; 
						support [at] dynamsoft.com &vert; 1-604-605-5491 &vert; Vancouver, BC, Canada
                    </p>
                </div>
            </div>
        </div>
    </div>
    <script src="ocrbasicclientside.js"></script>
</body>
</html>
