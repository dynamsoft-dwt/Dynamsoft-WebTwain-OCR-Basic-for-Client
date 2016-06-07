Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady); // Register OnWebTwainReady event. This event fires as soon as Dynamic Web TWAIN is initialized and ready to be used


var DWObject, CurrentPath;
var _iLeft, _iTop, _iRight, _iBottom, bMultipage;


var OCRLanguages = [
		{ desc: "English", val: "eng" }
];   
	 
var OCROutputFormat = [
		{ desc: "TXT", val: EnumDWT_OCROutputFormat.OCROF_TEXT },
		{ desc: "Text PDF", val: EnumDWT_OCROutputFormat.OCROF_PDFPLAINTEXT },
		{ desc: "Image-over-text PDF", val: EnumDWT_OCROutputFormat.OCROF_PDFIMAGEOVERTEXT },
		{ desc: "Text PDFX", val: EnumDWT_OCROutputFormat.OCROF_PDFPLAINTEXT_PDFX },
		{ desc: "Image-over-text PDFX", val: EnumDWT_OCROutputFormat.OCROF_PDFIMAGEOVERTEXT_PDFX }
];

function Dynamsoft_OnReady() {
	DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'
	if (DWObject) {
		DWObject.RegisterEvent("OnImageAreaSelected", Dynamsoft_OnImageAreaSelected);
		DWObject.RegisterEvent("OnImageAreaDeSelected", Dynamsoft_OnImageAreaDeselected);
		
		_iLeft = 0;
		_iTop = 0;
		_iRight = 0;
		_iBottom = 0;
		
		for (var i = 0; i < OCRLanguages.length; i++)
			document.getElementById("ddlLanguages").options.add(new Option(OCRLanguages[i].desc, i));
		for (var i = 0; i < OCROutputFormat.length; i++)
			document.getElementById("ddlOCROutputFormat").options.add(new Option(OCROutputFormat[i].desc, i));
		
		DWObject.RegisterEvent("OnTopImageInTheViewChanged", Dynamsoft_OnTopImageInTheViewChanged);
		/*
		* Make sure the PDF Rasterizer add-on is already installed, please note that the file Pdf.zip is already part of the sample
		*/
		var CurrentPathName = unescape(location.pathname),PDFDLLDownloadURL;
		CurrentPath = CurrentPathName.substring(0, CurrentPathName.lastIndexOf("/") + 1);
		if(!Dynamsoft.Lib.env.bMac) {			
			PDFDLLDownloadURL = CurrentPath + '/Resources/addon/Pdf.zip';
			DWObject.Addon.PDF.Download(
				PDFDLLDownloadURL,
				function() {/*console.log('PDF dll is installed');*/},
				function(errorCode, errorString) {
					console.log(errorString);
				}
			);
		}
	}
}

function Dynamsoft_OnImageAreaSelected(index, left, top, right, bottom) {
	_iLeft = left;
	_iTop = top;
	_iRight = right;
	_iBottom = bottom;
}

function Dynamsoft_OnImageAreaDeselected(index) {
	_iLeft = 0;
	_iTop = 0;
	_iRight = 0;
	_iBottom = 0;
}

function Dynamsoft_OnTopImageInTheViewChanged(index) {
	DWObject.CurrentImageIndexInBuffer = index;
}

function AcquireImage() {
	if (DWObject) {
		var bSelected = DWObject.SelectSource();
		if (bSelected) {

			var OnAcquireImageSuccess, OnAcquireImageFailure;
			OnAcquireImageSuccess = OnAcquireImageFailure = function() {
				DWObject.CloseSource();
			};

			DWObject.OpenSource();
			DWObject.IfDisableSourceAfterAcquire = true;  //Scanner source will be disabled/closed automatically after the scan.
			DWObject.AcquireImage(OnAcquireImageSuccess, OnAcquireImageFailure);
		}
	}
}

function LoadImages() {
	if (DWObject) {
		var nCount = 0, nCountLoaded = 0;;
		DWObject.IfShowFileDialog = false;
		function ds_load_pdfa(bSave, filesCount, index, path, filename){
			nCount = filesCount;
			var filePath = path + "\\" +  filename;
			if((filename.substr(filename.lastIndexOf('.') + 1)).toLowerCase() == 'pdf'){
				DWObject.Addon.PDF.SetResolution(200);   
				DWObject.Addon.PDF.SetConvertMode(EnumDWT_ConverMode.CM_RENDERALL);
			}
			DWObject.LoadImage(filePath, 
				function() {
					console.log('successful');},
				function (errorCode, errorString) {
					alert(errorString);
				});
			DWObject.UnregisterEvent('OnGetFilePath', ds_load_pdfa);
		}
		DWObject.RegisterEvent('OnGetFilePath', ds_load_pdfa);
		DWObject.RegisterEvent('OnPostLoad', function(path, name, type){
			nCountLoaded ++;
			if(nCountLoaded == nCount)
				Dynamsoft.Lib.detect.hideMask();
		});
		DWObject.ShowFileDialog(false,  "BMP, JPG, PNG, PDF and TIF | *.bmp;*.jpg;*.png;*.pdf;*.tif;*.tiff", 0, "", "", true, true, 0)		
		Dynamsoft.Lib.detect.showMask();
	}
}

function GetErrorInfo(errorcode, errorstring, result) { //This is the function called when OCR fails
	alert(errorstring);
	var strErrorDetail = "";
	var aryErrorDetailList = result.GetErrorDetailList();
	for (var i = 0; i < aryErrorDetailList.length; i++) {
		if (i > 0)
			strErrorDetail += ";";
		strErrorDetail += aryErrorDetailList[i].GetMessage();
	}
	alert(strErrorDetail);
}

function GetRectOCRProInfo(sImageIndex, _left, _top, _right, _bottom, result) { 
	return GetOCRProInfoInner(result);
}

function OnOCRSelectedImagesSuccess(result) {
	return GetOCRProInfoInner(result);
}

function GetOCRProInfo(sImageIndex, result) {        
	return GetOCRProInfoInner(result);
}

function GetOCRProInfoInner(result) {  	
	if (result == null)
		return null;	
	var DynamsoftOCRResult = result;
	if (DynamsoftOCRResult._resultlist.length == 0) {
		alert("OCR result is Null.");
		return;
	} else {
		var bRet = "";
		for (var i = 0;i< DynamsoftOCRResult._resultlist.length; i++){
			var __resultlist = DynamsoftOCRResult._resultlist[i];
			for (var j = 0; j < __resultlist.pagesets.length; j++){
				var _pagesets = __resultlist.pagesets[j];
				for (var k = 0; k < _pagesets.pages.length; k++) {
					var _page = _pagesets.pages[k];
					for (var l = 0; l < _page.lines.length; l++) {
						var _line = _page.lines[l];
						for (var m = 0; m < _line.words.length; m++) {
							var _word = _line.words[m];
							bRet += _word.text;
						}
					}
				}
			}
		}
	   console.log(bRet);  //Get OCR result.
	}

	if(savePath.length > 1)
		DynamsoftOCRResult.Save(savePath);
}

var savePath;
function ds_start_ocr(bSave, count, index, path, name) {
	DWObject.UnregisterEvent('OnGetFilePath', ds_start_ocr);
	if (path.length > 0 || name.length > 0)
		savePath = path + "\\" + name; 
	if (bSave == true && index != -1032) //if cancel, do not ocr
		DoOCRInner();
}

function DoOCR() {                
	if (DWObject) {
		bMultipage = false;
		if (DWObject.HowManyImagesInBuffer == 0) {
			alert("Please scan or load an image first.");
			return;
		}

		var saveTye = "";
		var fileType = "";
		
		switch (OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val) {
			case EnumDWT_OCROutputFormat.OCROF_TEXT:
				fileType = ".txt";
				saveTye = "Plain Text(*.txt)";
				break;
			case EnumDWT_OCROutputFormat.OCROF_PDFPLAINTEXT:
			case EnumDWT_OCROutputFormat.OCROF_PDFIMAGEOVERTEXT:
			case EnumDWT_OCROutputFormat.OCROF_PDFPLAINTEXT_PDFX:
			case EnumDWT_OCROutputFormat.OCROF_PDFIMAGEOVERTEXT_PDFX:
				fileType = ".pdf";
				saveTye = "PDF(*.pdf)";
				bMultipage = true;
				break;     
		}
		var fileName = "result" + fileType;
		DWObject.RegisterEvent("OnGetFilePath", ds_start_ocr);
		DWObject.ShowFileDialog(true, saveTye, 0, "", fileName, true, false, 0); 

	  }
}


function DoOCRInner() {
	if (DWObject) {
		if (DWObject.HowManyImagesInBuffer == 0) {
			alert("Please scan or load an image first.");
			return;
		}
		var OnSuccess = function() {
			DWObject.Addon.OCR.SetLanguage(OCRLanguages[document.getElementById("ddlLanguages").selectedIndex].val);
			DWObject.Addon.OCR.SetOutputFormat(OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val);
			//Get ocr result.
			if (_iLeft != 0 || _iTop != 0 || _iRight != 0 || _iBottom != 0) {
				DWObject.Addon.OCR.RecognizeRect(DWObject.CurrentImageIndexInBuffer, _iLeft, _iTop, _iRight, _iBottom, GetRectOCRProInfo, GetErrorInfo);
			}
			else if(bMultipage) {
				var nCount = DWObject.HowManyImagesInBuffer;
				DWObject.SelectedImagesCount = nCount;
				for(var i = 0; i < nCount;i++) {
					 DWObject.SetSelectedImageIndex(i,i);
				}
				DWObject.Addon.OCR.RecognizeSelectedImages(OnOCRSelectedImagesSuccess, GetErrorInfo);
			}
			else {
				DWObject.Addon.OCR.Recognize(DWObject.CurrentImageIndexInBuffer, GetOCRProInfo, GetErrorInfo);
			}
		};

		var OnFailure = function(errorCode, errorString) {
			alert("onfailure!");

		};

		var CurrentPathName = unescape(location.pathname);
		CurrentPath = CurrentPathName.substring(0, CurrentPathName.lastIndexOf("/") + 1);
		DWObject.Addon.OCR.DownloadLangData(
			CurrentPath +"Resources/addon/English.zip", 
			function(){
				DWObject.Addon.OCR.Download(CurrentPath + "/Resources/addon/OCR.zip", OnSuccess, OnFailure);
			}, 
			OnFailure
		);
	}
}