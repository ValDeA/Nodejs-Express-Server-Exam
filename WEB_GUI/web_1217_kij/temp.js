// Kweather 각 측정값에 대한 지수계산 함수
var tempObject = new Object();
function convertPm25(value) {
	var cipi = "";
	if(value >= 0 && value <= 15) {
		cipi = 100 - 10 * (value/15);
	} else if(value >= 16 && value <= 35) {
		cipi = 89 - 9 * ((value-16)/19);
	} else if(value >= 36 && value <= 75) {
		cipi = 79 - (29) * ((value-36)/39);
		tempObject = {"초미세먼지" : "나쁨"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 76 && value <= 500) {
		cipi = 49 - (49) * ((value-76)/424);
		tempObject = {"초미세먼지" : "매우나쁨"}
		if(badValues != null) badValues.push(tempObject);
	}
	
	return Math.round(cipi);
}

function convertPm25Normal(value) {
	var cipi = "";
	if(value >= 0 && value <= 15) {
		cipi = 100 - 10 * (value/15);
	} else if(value >= 16 && value <= 35) {
		cipi = 89 - 9 * ((value-16)/19);
	} else if(value >= 36 && value <= 75) {
		cipi = 79 - (29) * ((value-36)/39);
	} else if(value >= 76 && value <= 500) {
		cipi = 49 - (49) * ((value-76)/424);
	}
	
	return Math.round(cipi);
}

function convertPm25Color(value) {
	if(value == null) {
		return "";
	}
	
	if(value >= 0 && value <= 15) {
		return "blue";
	} else if(value >= 16 && value <= 35) {
		return "green";
	} else if(value >= 36 && value <= 75) {
		return "yellow";
	} else {
		return "red";
	}
}

function convertPm10(value) {
	var cipi = "";
	if(value >= 0 && value <= 30) {
		cipi = 100 - 10 * (value/30);
	} else if(value >= 31 && value <= 80) {
		cipi = 89 - 9 * ((value-31)/49);
	} else if(value >= 81 && value <= 150) {
		cipi = 79 - (29) * ((value-81)/69);
		tempObject = {"미세먼지" : "나쁨"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 151 && value <= 1000) {
		cipi = 49 - (49) * ((value-151)/449);
		tempObject = {"미세먼지" : "매우나쁨"}
		if(badValues != null) badValues.push(tempObject);
	}
	
	return Math.round(cipi);
}

function convertPm10Normal(value) {
	var cipi = "";
	if(value >= 0 && value <= 30) {
		cipi = 100 - 10 * (value/30);
	} else if(value >= 31 && value <= 80) {
		cipi = 89 - 9 * ((value-31)/49);
	} else if(value >= 81 && value <= 150) {
		cipi = 79 - (29) * ((value-81)/69);
	} else if(value >= 151 && value <= 600) {
		cipi = 49 - (49) * ((value-151)/449);
	}
	
	return Math.round(cipi);
}

function convertPm10Color(value) {
	if(value == null) {
		return "";
	}
	
	if(value >= 0 && value <= 30) {
		return "blue";
	} else if(value >= 31 && value <= 80) {
		return "green";
	} else if(value >= 81 && value <= 150) {
		return "yellow";
	} else {
		return "red";
	}
}

function convertCo2(value) {
	var cipi = "";
	
	if(value >= 0 && value <= 500) {
		cipi = 100 - 10 * (value/500);
	} else if(value >= 501 && value <= 1000) {
		cipi = 89 - 9 * ((value-501)/499);
	} else if(value >= 1001 && value <= 1500) {
		cipi = 79 - (29) * ((value-1001)/499);
		tempObject = {"이산화탄소" : "나쁨"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 1501 && value <= 10000) {
		cipi = 49 - (49) * ((value-1501)/8449);
		tempObject = {"이산화탄소" : "매우나쁨"}
		if(badValues != null) badValues.push(tempObject);
	}
	
	return Math.round(cipi);
}

function convertCo2Color(value) {
	if(value == null) {
		return "";
	}
	
	if(value >= 0 && value <= 500) {
		return "blue";
	} else if(value >= 501 && value <= 1000) {
		return "green";
	} else if(value >= 1001 && value <= 1500) {
		return "yellow";
	} else {
		return "red";
	}
}

function convertVOCs(value) {
	var cipi = "";
	
	if(value >= 0 && value <= 200) {
		cipi = 100 - 10 * (value/200);
	} else if(value >= 201 && value <= 400) {
		cipi = 89 - 9 * ((value-201)/199);
	} else if(value >= 401 && value <= 1000) {
		cipi = 79 - (29) * ((value-401)/599);
		tempObject = {"휘발성유기화합물" : "나쁨"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 1001 && value <= 10000) {
		cipi = 49 - (49) * ((value-1001)/8999);
		tempObject = {"휘발성유기화합물" : "매우나쁨"}
		if(badValues != null) badValues.push(tempObject);
	}
	
	return Math.round(cipi);
}

function convertVOCsColor(value) {
	if(value == null) {
		return "";
	}
	
	if(value >= 0 && value <= 200) {
		return "blue";
	} else if(value >= 201 && value <= 400) {
		return "green";
	} else if(value >= 401 && value <= 1000) {
		return "yellow";
	} else {
		return "red";
	}
}

function convertNoise(value) {
	var cipi = "";
	
	if(value >= 0 && value <= 30) {
		cipi = 100 - 10 * (value/30);
	} else if(value >= 31 && value <= 55) {
		cipi = 89 - 9 * ((value-31)/24);
	} else if(value >= 56 && value <= 70) {
		cipi = 79 - (29) * ((value-56)/14);
		tempObject = {"소음" : "나쁨"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 71 && value <= 100) {
		cipi = 49 - (49) * ((value-71)/29);
		tempObject = {"소음" : "매우나쁨"}
		if(badValues != null) badValues.push(tempObject);
	}
	
	return Math.round(cipi);
}

function convertNoiseColor(value) {
	if(value == null) {
		return "";
	}
	
	if(value >= 0 && value <= 30) {
		return "blue";
	} else if(value >= 31 && value <= 55) {
		return "green";
	} else if(value >= 56 && value <= 70) {
		return "yellow";
	} else {
		return "red";
	}
}

function convertTempIAQ(value) {
	var cipi = "";
	
	if(value >= 0.0 && value <= 13.9) {
		cipi = 49 - (49) * (13.9-value/13.9);
		tempObject = {"온도" : "매우추움"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 30.1 && value <= 34.0) {
		cipi = 49 - (49) * ((value-30.1)/3.9);
		tempObject = {"온도" : "매우더움"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 14.0 && value <= 15.9) {
		cipi = 79 - (29) * ((15.9-value)/1.9);
		tempObject = {"온도" : "추움"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 27.1 && value <= 30.0) {
		cipi = 79 - (29) * ((value-27.1)/2.9);
		tempObject = {"온도" : "더움"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 16.0 && value <= 17.9) {
		cipi = 89 - 9 * ((17.9-value)/1.9);
	} else if(value >= 24.1 && value <= 27.0) {
		cipi = 89 - 9 * ((value-24.1)/2.9);
	} else if(value >= 18.0 && value <= 21.0) {
		cipi = 100 - 10 * ((21.0-value)/3.0);
	} else if(value >= 21.0 && value <= 24.0) {
		cipi = 100 - 10 * ((value-21.0)/3.0);
	}
	
	return Math.round(cipi);
}

function convertTempIAQColor(value) {
	if(value == null) {
		return "";
	}
	
	if(value <= 13.9) {
		return "red";
	} else if(value >= 30.1 && value <= 34.0) {
		return "red";
	} else if(value >= 14.0 && value <= 15.9) {
		return "yellow";
	} else if(value >= 27.1 && value <= 30.0) {
		return "yellow";
	} else if(value >= 16.0 && value <= 17.9) {
		return "green";
	} else if(value >= 24.1 && value <= 27.0) {
		return "green";
	} else if(value >= 18.0 && value <= 21.0) {
		return "blue";
	} else if(value >= 21.0 && value <= 24.0) {
		return "blue";
	}
}

function convertTempOAQ(value) {
	var cipi = "";
	
	if(value >= -30.0 && value <= -5.1) {
		cipi = 49 - (49) * ((5.1-value)/24.9);
	} else if(value >= 33.1 && value <= 50.0) {
		cipi = 49 - (49) * ((value-33.1)/16.9);
	} else if(value >= -5.0 && value <= -0.1) {
		cipi = 79 - (29) * ((0.1-value)/4.9);
	} else if(value >= 25.1 && value <= 33.0) {
		cipi = 79 - (29) * ((value-25.1)/4.9);
	} else if(value >= 0.0 && value <= 8.9) {
		cipi = 89 - 9 * ((8.9-value)/8.9);
	} else if(value >= 18.1 && value <= 25.0) {
		cipi = 89 - 9 * ((value-18.1)/6.9);
	} else if(value >= 9.0 && value <= 13.5) {
		cipi = 100 - 10 * ((13.5-value)/4.5);
	} else if(value >= 13.5 && value <= 18.0) {
		cipi = 100 - 10 * ((value-13.5)/4.5);
	}
	
	return Math.round(cipi);
}

function convertTempOAQColor(value) {
	if(value == null) {
		return "";
	}
	
	if(value <= -5.1) {
		return "red";
	} else if(value >= 33.1 && value <= 50.0) {
		return "red";
	} else if(value >= -5.0 && value <= -0.1) {
		return "yellow";
	} else if(value >= 25.1 && value <= 33.0) {
		return "yellow";
	} else if(value >= 0.0 && value <= 8.9) {
		return "green";
	} else if(value >= 18.1 && value <= 25.0) {
		return "green";
	} else if(value >= 9.0 && value <= 13.5) {
		return "blue";
	} else if(value >= 13.5 && value <= 18.0) {
		return "blue";
	}
}

function convertHumiIAQ(value) {
	var cipi = "";
	
	if(value >= 0.0 && value <= 19.9) {
		cipi = 49 - (49) * ((19.9-value)/19.9);
		tempObject = {"습도" : "매우건조"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 90.1 && value <= 100) {
		cipi = 49 - (49) * ((value-90.1)/9.9);
		tempObject = {"습도" : "매우습함"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 20.0 && value <= 34.9) {
		cipi = 79 - (29) * ((34.9-value)/14.9);
		tempObject = {"습도" : "건조"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 75.1 && value <= 90.0) {
		cipi = 79 - (29) * ((value-75.1)/24.9);
		tempObject = {"습도" : "습함"}
		if(badValues != null) badValues.push(tempObject);
	} else if(value >= 35.0 && value <= 39.9) {
		cipi = 89 - 9 * ((39.9-value)/4.9);
	} else if(value >= 60.1 && value <= 75.0) {
		cipi = 89 - 9 * ((value-60.1)/14.9);
	} else if(value >= 40.0 && value <= 50.0) {
		cipi = 100 - 10 * ((50-value)/10.0);
	} else if(value >= 50.0 && value <= 60.0) {
		cipi = 100 - 10 * ((value-50.0)/10.0);
	}
	
	return Math.round(cipi);
}

function convertHumiIAQColor(value) {
	if(value == null) {
		return "";
	}
	
	if(value >= 0.0 && value <= 19.9) {
		return "red";
	} else if(value >= 90.1 && value <= 100) {
		return "red";
	} else if(value >= 20.0 && value <= 34.9) {
		return "yellow";
	} else if(value >= 75.1 && value <= 90.0) {
		return "yellow";
	} else if(value >= 35.0 && value <= 39.9) {
		return "green";
	} else if(value >= 60.1 && value <= 75.0) {
		return "green";
	} else if(value >= 40.0 && value <= 50.0) {
		return "blue";
	} else if(value >= 50.0 && value <= 60.0) {
		return "blue";
	}
}

function convertHumiOAQ(value) {
	var cipi = "";
	
	if(value >= 0.0 && value <= 29.9) {
		cipi = 49 - (49) * ((29.9-value)/29.9);
	} else if(value >= 90.1 && value <= 100) {
		cipi = 49 - (49) * ((value-90.1)/9.9);
	} else if(value >= 30.0 && value <= 39.9) {
		cipi = 79 - (29) * ((39.9-value)/9.9);
	} else if(value >= 80.1 && value <= 90.0) {
		cipi = 79 - (29) * ((value-80.1)/9.9);
	} else if(value >= 40.0 && value <= 49.9) {
		cipi = 89 - 9 * ((49.9-value)/9.9);
	} else if(value >= 70.1 && value <= 80.0) {
		cipi = 89 - 9 * ((value-70.1)/9.9);
	} else if(value >= 50.0 && value <= 60.0) {
		cipi = 100 - 10 * ((60-value)/10.0);
	} else if(value >= 60.0 && value <= 70.0) {
		cipi = 100 - 10 * ((value-60.0)/10.0);
	}
	
	return Math.round(cipi);
}

function convertHumiOAQColor(value) {
	if(value == null) {
		return "";
	}
	
	if(value >= 0.0 && value <= 29.9) {
		return "red";
	} else if(value >= 90.1 && value <= 100) {
		return "red";
	} else if(value >= 30.0 && value <= 39.9) {
		return "yellow";
	} else if(value >= 80.1 && value <= 90.0) {
		return "yellow";
	} else if(value >= 40.0 && value <= 49.9) {
		return "green";
	} else if(value >= 70.1 && value <= 80.0) {
		return "green";
	} else if(value >= 50.0 && value <= 60.0) {
		return "blue";
	} else if(value >= 60.0 && value <= 70.0) {
		return "blue";
	}
}

// ----- 값 지수변환 끝

// ----- 각 요소 값에 대한 좋음, 나쁨 끝

// 프리미엄 서비스 팝업
(function($) {
    $.popup = function(opt) {
    	modal({
    		type: opt.type, //Type of Modal Box (alert | confirm | prompt | success | warning | error | info | inverted | primary)
    		title: opt.title, //Modal Title
    		text: opt.text, //Modal HTML Content
    		//buttons : null,
    		theme: 'reseted'
    	});
    };
})(jQuery);

(function($) {
	$.alert = function(opt) {
		modal({
			type: 'info', //Type of Modal Box (alert | confirm | prompt | success | warning | error | info | inverted | primary)
			title: '', //Modal Title
			text: opt.text, //Modal HTML Content
			size: 'normal', //Modal Size (normal | large | small)
			buttons: [{
				text: '확인', //Button Text
				val: '확인', //Button Value
				eKey: true, //Enter Keypress
				addClass: 'btn-light-blue btn-square', 
			}, ],
			center: true, //Center Modal Box?
			autoclose: false, //Auto Close Modal Box?
			callback: null, 
			onShow: function(r) {
//				console.log(r);
			}, //After show Modal function
			closeClick: true, //Close Modal on click near the box
			closable: true, //If Modal is closable
			theme: 'xenon', //Modal Custom Theme
			animate: true, //Slide animation
			background: 'rgba(0,0,0,0.35)', //Background Color, it can be null
			zIndex: 100000, //z-index
			template: '<div class="modal-box"><div class="modal-inner1"><div class="modal-title"><a class="modal-close-btn2">1</a></div><div class="modal-text1"></div><div class="modal-buttons1"></div></div></div>',
			_classes: {
				box: '.modal-box',
				boxInner: ".modal-inner1",
				title: '.modal-title',
				content: '.modal-text1',
				buttons: '.modal-buttons1',
				closebtn: '.modal-close-btn2'
			}
		});
	}
})(jQuery);

function premiumPopup() {
	$.popup({
		type: 'default',
		title: '',
		text: '<div class="panel_pop"><p class="fs_xxl">프리미엄 서비스 신청을 통해 이용이 가능합니다.</p><p><a href="/paid/info" class="btn btn_info w230">프리미엄 서비스 자세히 보기</a></p><p><a href="/premium" class="btn btn_info w230">프리미엄 서비스 신청하기</a></p></div>'
	});
}

// 날짜 변환 포맷함수
Date.prototype.format = function (f) {
	if (!this.valueOf()) return " ";
	var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
	var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var d = this;

	return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
		switch ($1) {
		case "yyyy": return d.getFullYear(); // 년 (4자리)
		case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
		case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
		case "dd": return d.getDate().zf(2); // 일 (2자리)
		case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
		case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
		case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
		case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
		case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
		case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
		case "mm": return d.getMinutes().zf(2); // 분 (2자리)
		case "ss": return d.getSeconds().zf(2); // 초 (2자리)
		case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
		default: return $1;
		}
	});
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

