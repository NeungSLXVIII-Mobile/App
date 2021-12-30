var display0 = document.getElementById("display-0");
var display1 = document.getElementById("display-1");
var qrImage = display1.getElementsByTagName("img")[0];
var qrText = display1.getElementsByTagName("p")[0];
var progressImage = document.getElementById("progress-bar").getElementsByTagName("img")[0];
var button = document.getElementById("next-button").getElementsByTagName("button")[1];
var backButton = document.getElementById("back-button");
var skipButton = document.getElementById("skip-button");
var state = 1;
var variation = 1;
var language = "";

var textEn = ["Point the camera towards the floor, around your feet area, to scan the environment.", 
			"Tap the \u201Ctick\u201C icon to lock the position of the Virtual Guide.", 
			"Tap the \u201Cplay\u201C icon to see the Virtual Guide come to life.",
			"Tap the green banner to select other topics and take a photo with the Virtual Guide!"];
var textCh = ["把摄像头指向地面， 在靠近脚边的区域进行扫描。",
			"点击“打勾”图标可锁定 虚拟导览员的位置。",
			"点击“播放”图标，激活虚拟导览员。",
			"点击绿色选项以选择 其他主题，并与虚拟导览员合影！"];
var lastPageLinks = ["https://app.plattar.com/themes/sdkLive/index.html?appid=331d6220-c6fa-11ea-8a25-ebf0a598bbc8&xrdriver=8wall&sceneid=0d292730-f699-11eb-8400-fd8e82f16efa",
					"https://app.plattar.com/themes/sdkLive/index.html?appid=331d6220-c6fa-11ea-8a25-ebf0a598bbc8&xrdriver=8wall&sceneid=182cd500-f69c-11eb-b66f-a197d8ba22d7",
					"https://app.plattar.com/themes/sdkLive/index.html?appid=331d6220-c6fa-11ea-8a25-ebf0a598bbc8&xrdriver=8wall&sceneid=c5ace290-f69e-11eb-9a31-e5624b96ff17",
					"https://app.plattar.com/themes/sdkLive/index.html?appid=331d6220-c6fa-11ea-8a25-ebf0a598bbc8&xrdriver=8wall&sceneid=0a3c7860-f6a0-11eb-9533-2710016c7e5e",
					"https://app.plattar.com/themes/sdkLive/index.html?appid=331d6220-c6fa-11ea-8a25-ebf0a598bbc8&xrdriver=8wall&sceneid=7fd25240-f6a1-11eb-b901-f5be40ade6dc",
					"https://app.plattar.com/themes/sdkLive/index.html?appid=331d6220-c6fa-11ea-8a25-ebf0a598bbc8&xrdriver=8wall&sceneid=c59f7180-f6a2-11eb-9037-c3d8677e3894",]




function OnClickNext(v,l) {
	variation = v;
	language = l;
	if(state == 1) {
		ShowState2();
	} else if(state == 2) {
		ShowState(variation, state, language);
	} else if(state == 3) {
		ShowState(variation, state, language);
		if(language == 'en') {
			button.innerHTML = "Start!";
		} else if(language == 'ch') {
			button.innerHTML = "开始!";
		}
		skipButton.style="display:none";
	} else if(state == 4) {
		//link here
		OpneLastPageLink(v,l)
		return;
	}
	state++;
}

function OnClickBack(v,l) {
	variation = v;
	language = l;
	if(state == 1) {
		//nothing
		return;
	} else if(state == 2) {
		HideState2();
	} else if(state == 3) {
		ShowState(variation, state-2, language);
	} else if(state == 4) {
		if(language == 'en') {
			button.innerHTML = "Next";
		} else if(language == 'ch') {
			button.innerHTML = "下一步";
		}
		ShowState(variation, state-2, language);
		skipButton.style="display:block";
	}
	state--;

}

function HideState2() {
	display0.style="display:block";
	display1.style="display:none";
	document.getElementById("progress-bar").style="display:none";
	document.getElementsByTagName("body")[0].style="background-image: url(\"../image/background_0" + variation + ".png\");";
	backButton.style="display:none";
	skipButton.style="display:none";
}

function ShowState2() {
	display0.style="display:none";
	display1.style="display:block";
	document.getElementById("progress-bar").style="display:block";
	document.getElementsByTagName("body")[0].style="background-image: url(\"../image/background_0" + variation + "_v2.png\");";
	backButton.style="display:block";
	skipButton.style="display:block";
}

function ShowState(v, s, l) {
	qrImage.src = "../image/woman_0" + v + "_qr_0" + s + ".png";
	qrText.innerHTML = textEn[s-1];
	progressImage.src = "../image/progress_bar_0" + s + ".png";
	if(l == "en") {
		qrText.innerHTML = textEn[s-1];
	} else if(l == "ch") {
		qrText.innerHTML = textCh[s-1];
	} else {
		console.log("no language match!");
	}
}

function OpneLastPageLink(v,l) {
	var offset = 0;
	if(l == 'ch') {
		offset = 1;
	}
	var index = v*2 - 2 + offset;
	window.open(lastPageLinks[index],"_self");
}


