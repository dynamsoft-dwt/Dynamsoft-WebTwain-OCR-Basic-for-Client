window.onload = function () {
	if (Dynamsoft && (!Dynamsoft.Lib.product.bChromeEdition || !Dynamsoft.Lib.env.bWin)) {
		var ObjString = [];
		ObjString.push('<div class="p15">');
		ObjString.push("Please note that the sample doesn't work on your current browser, please use a modern browser like Chrome, Firefox, etc. on Windows");
		ObjString.push('</div>');
		Dynamsoft.WebTwainEnv.ShowDialog(400, 180, ObjString.join(''));
		if (document.getElementsByClassName("dynamsoft-dialog-close"))
			document.getElementsByClassName("dynamsoft-dialog-close")[0].style.display = "none";
	} else {
		Dynamsoft.WebTwainEnv.AutoLoad = false;
		Dynamsoft.WebTwainEnv.Containers = [{ ContainerId: 'dwtcontrolContainer', Width: '100%', Height: '500px' }];
		Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady);
		/**
		 * In order to use the full version, do the following
		 * 1. Change Dynamsoft.WebTwainEnv.Trial to false
		 * 2. Replace A-Valid-Product-Key with a full version key
		 * 3. Change Dynamsoft.WebTwainEnv.ResourcesPath to point to the full version 
		 *    resource files that you obtain after purchasing a key
		 */
	Dynamsoft.WebTwainEnv.ProductKey = "t00901wAAAF+u0oFLI39wRNB580cu3kJSIZtbAcR5aCChp+BFa+RGTGv4L2zaA7Q4fzLjNbZJF55lzg9BdnPG5aZjeJPOJUTwD+r5izfQJtguoC4BNSFofgBZwyta";
		//Dynamsoft.WebTwainEnv.ProductKey = "A-Valid-Product-Key";
		//Dynamsoft.WebTwainEnv.ResourcesPath = "https://tst.dynamsoft.com/libs/dwt/15.0";

		Dynamsoft.WebTwainEnv.Load();
	}
};

var DWObject, ObjString, arySelectedAreas = [], bMultipage, bClearResult = true, _ocrResultFileType,
	OCRLanguages = [
		{ desc: "Arabic", val: "ara" },
		{ desc: "Bengali", val: "ben" },
		{ desc: "Chinese_Simplified", val: "chi_sim" },
		{ desc: "Chinese_Traditional", val: "chi_tra" },
		{ desc: "English", val: "eng" },
		{ desc: "French", val: "fra" },
		{ desc: "German", val: "deu" },
		{ desc: "Hindi", val: "hin" },
		{ desc: "Indonesian", val: "ind" },
		{ desc: "Italian", val: "ita" },
		{ desc: "Japanese", val: "jpn" },
		{ desc: "Javanese", val: "jav" },
		{ desc: "Korean", val: "kor" },
		{ desc: "Malay", val: "msa" },
		{ desc: "Marathi", val: "mar" },
		{ desc: "Panjabi", val: "pan" },
		{ desc: "Persian", val: "fas" },
		{ desc: "Portuguese", val: "por" },
		{ desc: "Russian", val: "rus" },
		{ desc: "Spanish", val: "spa" },
		{ desc: "Swahili", val: "swa" },
		{ desc: "Tamil", val: "tam" },
		{ desc: "Telugu", val: "tel" },
		{ desc: "Thai", val: "tha" },
		{ desc: "Turkish", val: "tur" },
		{ desc: "Vietnamese", val: "vie" },
		{ desc: "Urdu", val: "urd" }
	],
	OCROutputFormat = [
		{ desc: "STRING", val: EnumDWT_OCROutputFormat.OCROF_TEXT },
		{ desc: "TXT", val: EnumDWT_OCROutputFormat.OCROF_TEXT },
		{ desc: "Text PDF", val: EnumDWT_OCROutputFormat.OCROF_PDFPLAINTEXT_PDFX },
		{ desc: "Image-over-text PDF", val: EnumDWT_OCROutputFormat.OCROF_PDFIMAGEOVERTEXT_PDFX }
	];


function downloadOCRBasic_btn() {
	if (Dynamsoft.Lib.product.bChromeEdition) {
		if (DWObject.Addon.OCR.IsModuleInstalled()) {
			downloadOCRBasic(false);
		} else {
			var ObjString = [];
			ObjString.push('<div class="p15">');
			ObjString.push('The <strong>OCR Module</strong> is not installed on this PC<br />Please click the button below to get it installed');
			ObjString.push('<p class="tc mt15 mb15"><input type="button" value="Install OCR" onclick="downloadOCRBasic(true);" class="btn lgBtn bgBlue" /><hr></p>');
			ObjString.push('<i><strong>The installation is a one-time process</strong> <br />It might take some time depending on your network.</i>');
			ObjString.push('</div>');
			Dynamsoft.WebTwainEnv.ShowDialog(380, 280, ObjString.join(''));
		}
	} else {
		alert('Your browser is not supported');
	}
}

function downloadOCRBasic(bDownloadDLL) {
	DCP_DWT_OnClickCloseInstall();
	var strOCRPath = Dynamsoft.WebTwainEnv.ResourcesPath + "/OCRResources/OCR.zip";
	strOCRLangPath = Dynamsoft.WebTwainEnv.ResourcesPath + '/OCRResources/OCRBasicLanguages/English.zip';
	if (bDownloadDLL) {
		DWObject.Addon.OCR.Download(
			strOCRPath,
			function () {/*console.log('OCR dll is installed');*/
				downloadOCRBasic(false);
			},
			function (errorCode, errorString) {
				console.log(errorString);
			}
		);
	} else {
		DWObject.Addon.OCR.DownloadLangData(
			strOCRLangPath,
			function () {
				/* Downloaded the English Language pack */
			}, function (errorCode, errorString) {
				console.log(errorString);
			});
	}
}

function Dynamsoft_OnReady() {
	var i;
	DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer'); // Get the Dynamic Web TWAIN object that is embeded in the div with id 'dwtcontrolContainer'
	if (DWObject) {
		DWObject.Viewer.width = 504;
		DWObject.Viewer.height = 599;
		DWObject.Viewer.on("pageAreaSelected", Dynamsoft_OnImageAreaSelected);
		DWObject.Viewer.on("pageAreaUnselected", Dynamsoft_OnImageAreaDeselected);
		DWObject.Viewer.on("topPageChanged", Dynamsoft_OnTopImageInTheViewChanged);
		DWObject.RegisterEvent("OnGetFilePath", ds_start_ocr);

		for (i = 0; i < OCRLanguages.length; i++)
			document.getElementById("ddlLanguages").options.add(new Option(OCRLanguages[i].desc, i));
		for (i = 0; i < OCROutputFormat.length; i++)
			document.getElementById("ddlOCROutputFormat").options.add(new Option(OCROutputFormat[i].desc, i));
		document.getElementById("ddlLanguages").selectedIndex = 4;

		DWObject.Addon.PDF.IsModuleInstalled();
		downloadOCRBasic_btn();
	}
}

function Dynamsoft_OnImageAreaSelected(index, rect) {
	if (rect.length > 0) {
        var currentRect = rect[rect.length - 1];
		if (arySelectedAreas.length + 2 > rect.length)
			arySelectedAreas[rect.length - 1] = [index, currentRect.x, currentRect.y, currentRect.x + currentRect.width, currentRect.y + currentRect.heidht, rect.length];
		else
			arySelectedAreas.push(index, currentRect.x, currentRect.y, currentRect.x + currentRect.width, currentRect.y + currentRect.heidht, rect.length);
	}
}

function Dynamsoft_OnImageAreaDeselected(index) {
	arySelectedAreas = [];
}

function Dynamsoft_OnTopImageInTheViewChanged(index) {
	DWObject.CurrentImageIndexInBuffer = index;
}

function AcquireImage() {
	if (DWObject) {
		DWObject.SelectSource(function () {
			var OnAcquireImageSuccess, OnAcquireImageFailure;
			OnAcquireImageSuccess = OnAcquireImageFailure = function () {
				DWObject.CloseSource();
			};
			DWObject.OpenSource();
			DWObject.IfDisableSourceAfterAcquire = true;
			DWObject.AcquireImage(OnAcquireImageSuccess, OnAcquireImageFailure);
		}, function () {
			console.log('SelectSource failed!');
		});
	}
}

function LoadImages() {
	if (DWObject) {
		if (DWObject.Addon && DWObject.Addon.PDF) {
			DWObject.Addon.PDF.SetResolution(300);
			DWObject.Addon.PDF.SetConvertMode(EnumDWT_ConvertMode.CM_RENDERALL);
		}
		DWObject.LoadImageEx('', 5,
			function () {
			},
			function (errorCode, errorString) {
				alert('Load Image:' + errorString);
			}
		);
	}
}

function GetErrorInfo(errorcode, errorstring) { //This is the function called when OCR fails
	alert(errorstring);
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
	var i, j, k, DynamsoftOCRResult = result;
	if (DynamsoftOCRResult._resultlist.length == 0) {
		alert("OCR result is Null.");
		return;
	} else {
		var bRet = "";
		for (i = 0; i < DynamsoftOCRResult._resultlist.length; i++) {
			var __resultlist = DynamsoftOCRResult._resultlist[i];
			for (j = 0; j < __resultlist.pagesets.length; j++) {
				var _pagesets = __resultlist.pagesets[j];
				for (k = 0; k < _pagesets.pages.length; k++) {
					var _page = _pagesets.pages[k];
					for (var l = 0; l < _page.lines.length; l++) {
						var _line = _page.lines[l];
						for (var m = 0; m < _line.words.length; m++) {
							var _word = _line.words[m];
							bRet += _word.text + ' ';
						}
					}
				}
			}
		}
		console.log(bRet);  //Get OCR result.
	}
	if (savePath == null) {
		var _textResult = (Dynamsoft.Lib.base64.decode(DynamsoftOCRResult.Get())).split(/\r?\n/g);
		for (i = 0; i < _textResult.length; i++) {
			if (_textResult[i].trim() != '')
				_textResult[i] += '<br />';
		}
		_textResult.splice(0, 0, '<p>');
		_textResult.push('</p>');
		if (bClearResult == true)
			document.getElementById('divNoteMessage').innerHTML = _textResult.join('');
		else
			document.getElementById('divNoteMessage').innerHTML += _textResult.join('');
	}
	else if (savePath.length > 1)
		DynamsoftOCRResult.Save(savePath);
}

var savePath;
function ds_start_ocr(bSave, count, index, path, name) {
	if (name.substr(-4) != _ocrResultFileType) {
		name += _ocrResultFileType;
	}
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
		_ocrResultFileType = "";
		if (document.getElementById("ddlOCROutputFormat").selectedIndex != 0) {
			switch (OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val) {
				case EnumDWT_OCROutputFormat.OCROF_TEXT:
					saveTye = "Plain Text(*.txt)";
					_ocrResultFileType = ".txt";
					break;
				case EnumDWT_OCROutputFormat.OCROF_PDFPLAINTEXT:
				case EnumDWT_OCROutputFormat.OCROF_PDFIMAGEOVERTEXT:
				case EnumDWT_OCROutputFormat.OCROF_PDFPLAINTEXT_PDFX:
				case EnumDWT_OCROutputFormat.OCROF_PDFIMAGEOVERTEXT_PDFX:
					saveTye = "PDF(*.pdf)";
					_ocrResultFileType = ".pdf";
					bMultipage = true;
					break;
			}
			var fileName = "result" + _ocrResultFileType;
			DWObject.ShowFileDialog(true, saveTye, 0, "", fileName, true, false, 0);
		} else {
			savePath = null;
			DoOCRInner();
		}
	}
}

function DoOCRInner() {
	if (DWObject) {
		if (DWObject.HowManyImagesInBuffer == 0) {
			alert("Please scan or load an image first.");
			return;
		}
		var currentLang = OCRLanguages[document.getElementById("ddlLanguages").selectedIndex];
		DWObject.Addon.OCR.SetLanguage(currentLang.val);
		DWObject.Addon.OCR.SetOutputFormat(OCROutputFormat[document.getElementById("ddlOCROutputFormat").selectedIndex].val);
		strOCRLangPath = Dynamsoft.WebTwainEnv.ResourcesPath + '/OCRResources/OCRBasicLanguages/' + currentLang.desc + '.zip';
		DWObject.Addon.OCR.DownloadLangData(
			strOCRLangPath,
			function () {
				var i;
				bClearResult = true;
				if (arySelectedAreas.length > 0 && savePath == null) {
					document.getElementById('divNoteMessage').innerHTML = '';
					bClearResult = false;
					for (i = 0; i < arySelectedAreas.length; i++) {
						DWObject.Addon.OCR.RecognizeRect(DWObject.CurrentImageIndexInBuffer, arySelectedAreas[i][1], arySelectedAreas[i][2], arySelectedAreas[i][3], arySelectedAreas[i][4], GetRectOCRProInfo, GetErrorInfo);
					}
				}
				else if (bMultipage) {
					var nCount = DWObject.HowManyImagesInBuffer;
					DWObject.SelectedImagesCount = nCount;
					for (i = 0; i < nCount; i++) {
						DWObject.SetSelectedImageIndex(i, i);
					}
					DWObject.Addon.OCR.RecognizeSelectedImages(OnOCRSelectedImagesSuccess, GetErrorInfo);
				}
				else {
					DWObject.Addon.OCR.Recognize(DWObject.CurrentImageIndexInBuffer, GetOCRProInfo, GetErrorInfo);
				}
			}, function (errorCode, errorString) {
				console.log(errorString);
			}
		);
	}
}

function RemoveSelected() {
	if (DWObject)
		DWObject.RemoveAllSelectedImages();
}