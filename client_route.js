const express = require('express');
const router = express.Router();
const request = require('request');
const session = require('express-session');


// router.get('/vue/chart', (req, res) => {
//   let chartData = {
//     labels: [ 'January', 'February', 'March' ],
//     datasets: [ { data: [ rnd(30, 0), rnd(30, 0), rnd(30, 0) ] } ]
//   };
//   console.log(chartData);

//   res.send(chartData);
// })

router.post('/api/test', (req, res) => {
  console.log(req.body);
  res.send("res");
})

router.get('/analytics', function(req, res) {
  if(req.session.user_id == null) {
    res.render('client_sign_in');
    return;
  }
  var props = {
    idx: 50,
    id: req.session.user_id
  }
  res.render('./client/client_page_analytics', props);
})
router.get('/control', function(req, res) {
  if(req.session.user_id == null) {
    res.render('client_sign_in');
    return;
  }
  var props = {
    idx: 60,
    id: req.session.user_id
  }
  res.render('./client/client_page_control', props);
})
router.get('/message', function(req, res) {
  var props = {
    idx: 30,
    id: req.session.user_id
  }
  res.render('client_page_message', props);
})
router.get('/notice', function(req, res) {
  var category = req.query.category;
  var screen = req.query.screen;
  var page = req.query.page;

  var props = {
    idx: 00,
    id: req.session.user_id,
    screen: screen
  }

  if(screen == "read") {
    var json = {
      notice_id: screen,
      notice_category: "일반",
      notice_title: "New Notice",
      notice_content: "New Notice Content",
      notice_date: "2021-11-17 16:06:32"
    }

    props.notice = json;
  } else if(category === undefined || page === undefined) {
    res.redirect('/notice?category=all&page=1');
    return;
  } else {
    props.screen = "main"
  }

  res.render('./common/common_page_notice', props);
})
router.get('/admin_statistics', function(req, res) {
  var props = {
    idx: 40,
    id: req.session.user_id
  }

  res.render('./admin/admin_page_statistics', props);
})


router.post('/login', function(req, res) {
  // 로그인 처리
  /*
  var id = req.body.user_id;
  var passwd = req.body.password;

  searchDatabase(id, passwd, function(row) {
    if(row != undefined) {
      req.session.user_id = row.id;
      res.redirect('/');
    }
  })
  */

  req.session.user_id = req.body.user_id;
  res.redirect('/');
})
router.get('/logout', function(req, res) {
  // 로그아웃 처리
  req.session.destroy();
  res.redirect('/');
})


// Restful API
router.get('/weather', function(req, res) {
  var lat, lon;
  lat = "36";
  lon = "127";
  var endPoint = "http://api.openweathermap.org/data/2.5/weather?lat=" + 
                lat + 
                "&lon=" + 
                lon + 
                "&appid=";
  const serviceKey = "28e801d1cc845f8e1cd11d6880ddfe87";

  var url = endPoint + serviceKey;

  request.get({
		uri: url,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
	}, function (error, httpresponse, body) {
    /*
    {"coord":{"lon":127,"lat":36},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":306.04,"feels_like":310.4,"temp_min":306.04,"temp_max":306.04,"pressure":1009,"humidity":54,"sea_level":1009,"grnd_level":1006},"visibility":10000,"wind":{"speed":0.94,"deg":311,"gust":1.81},"clouds":{"all":44},"dt":1627008938,"sys":{"type":1,"id":8076,"country":"KR","sunrise":1626985924,"sunset":1627037072},"timezone":32400,"id":1843491,"name":"Iksan","cod":200}
    */
		console.log("Recv to API : " + body);
    var parse = JSON.parse(body);
    res.send(parse.weather[0].main);
	});
  
})

router.post('/rangeData', function(req, res) {
  console.log(req.body);
  /*
  req.body = {
    device_id: 'NIAQ001000-s',
    startDate: '2021-11-03 08:00',
    endDate: '2021-11-04 10:00',
    dateTick: 'hour',
    length: 4,
    sensor: [ 'PM2P5val', 'TVOCval', 'NH3val', 'C3H8val' ]
  }
  */

  var diff = new Date(req.body.endDate) - new Date(req.body.startDate);
  if(req.body.dateTick == "hour") {
    // millisecond -> second
    diff = diff / 60 / 60 / 1000;
  } else { return; }
  var hourList = calcHour(req.body.endDate, diff);
 
  for(var i=0; i<hourList.length; i++) {
    const happyNewYear = hourList[i];
    const year = happyNewYear.getFullYear();
    const month = happyNewYear.getMonth() + 1;
    const date = happyNewYear.getDate();
    const hour = happyNewYear.getHours();
    
    hourList[i] = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date} ${hour >= 10 ? hour : '0' + hour}:00:00`;

  }

  // dateTick이 "hour"인 경우
  var sensor = new Array();
  for(var i=0; i<req.body.length; i++) {
    var value = new Array();
    for(var j=0; j<hourList.length + 1; j++) {
      value.push(rnd(150, 2));
    }
    sensor.push({
      sensorName: req.body.sensor[i],
      value: value
    })
  }

  var json = {
    // date.length
    dateLength: hourList.length,
    // Database between 기능
    // yyyy-MM-dd HH:00
    date: hourList,
    length: sensor.length,
    sensor: sensor
  }

  var json = {
    "dateLength": 8,
    "date": [
        "2022-01-11 06:00",
        "2022-01-11 07:00",
        "2022-01-11 08:00",
        "2022-01-11 09:00",
        //"2022-01-11 10:00",
        //"2022-01-11 11:00",
        "2022-01-11 12:00",
        "2022-01-11 13:00"
    ],
    "length": 1,
    "sensor": [
        {
            "sensorName": "PM2P5val",
            "value": [
                12.863888888888889,
                12.025,
                10.732590529247911,
                10.016666666666667,
                //8.916434540389972,
                //7.891666666666667,
                7.091666666666667,
                6.56824512534819
            ]
        }
    ]
}
  
  res.send(json);
})

// Between 대신 넣은 더미데이터 만들기용 함수
function calcHour(end, number) {
  var date = new Date(end);
  var year = date.getFullYear();
  var month = date.getMonth('MM');
  var day = date.getDate('dd');
  var hour = date.getHours('HH');

  var hourList = new Array();

  for (var i = 0; i < number; i++) {
    var label;
    var calcHour = hour - i;

    // 01 시였을 경우
    if (calcHour < 0) {
      calcHour += 24;
      day--;

      // 1 일이었을 경우
      if (day == 0) {
        month--;
        // 1 월이었을 경우
        if (month == 0) {
          year--;
          month = new Date(year, 0, 0).getMonth();
        }
        day = new Date(year, month, 0).getDate();
      }
      label = new Date(year, month, day, calcHour);//.format("yyyy-MM-dd HH:00");
    } else { // 01 시가 아니었을 경우
      label = year + "-" + month + "-" + day + " " + calcHour + ":00";
      label = new Date(label);//.format("HH:00");
    }

    hourList.push(label);
  }
  return hourList.reverse();
};

router.post('/postWeather', function(req, res) {
  console.log(req.body);
  /*
    req.body = {
      gpsLat: Double,
      gpsLong: Double
    }
  */

  var json = {
    Temp: 22.6,
    Humid: 32.9,
    FeelTemp: 24.3,
    PtyPer: 11,
    Skystat: "clear",
    SunRise: "2021-11-03 19:43",
    Sunset: "2021-11-03 05:21",
    WindSpeed: 1.2,
    WindDirect: 3.87,
    TempMN: 13.7,
    TempMX: 25.1
  }
  res.send(json);
})
router.post('/postEquipment', function(req, res) {
  console.log(req.body);
  /*
    req.body = {
      device_id: String
    }
  */
  
  var json = '{"equip":8191}';
  res.send(JSON.parse(json));
})
router.post('/postFavorite', function(req, res) {
  console.log(req.body);
  console.log(req.body.device_id[0]);
  var json = {
    "length":req.body.length,
    "name":[
      "BOXBOX", "TRIANGLE", "CIRCLE"
    ],
    "temp":[
      rnd(100,2), rnd(100,2), rnd(100,2)
    ],
    "hum":[
      rnd(100,2), rnd(100,2), rnd(100,2)
    ],
    "aqi":[
      rnd(500,0), rnd(500,0), rnd(500,0)
    ],
    "gpsLat":[
      36.1, 36.8, 37.1
    ],
    "gpsLong":[
      126.8, 127.0, 127.1
    ]
  };
  res.send(json);
})
router.post('/postGPS', function(req, res) {
  console.log(req.body);
  var json = {
    "length":5,
    "device_id":[
      "NIAQTEST100103-s", "NIAQTEST100104-s", "NIAQTEST100105-s", "NIAQTEST100106-s", "NIAQTEST100107-s"
    ],
    "name":[
      "SQUID", "PUPPY", "CAT", "HORSE", "BIRD"
    ],
    "temp":[
      rnd(100,2), rnd(100,2), rnd(100,2), rnd(100,2), rnd(100,2)
    ],
    "hum":[
      rnd(100,2), rnd(100,2), rnd(100,2), rnd(100,2), rnd(100,2)
    ],
    "aqi":[
      rnd(500,0), rnd(500,0), rnd(500,0), rnd(500,0), rnd(500,0)
    ],
    "gpsLat":[
      36.1, 36.8, 37.1, 37.3, 37.5
    ],
    "gpsLong":[
      126.8, 127.0, 127.1, 127.3, 127.5
    ]
  }
  res.send(json);
})
router.post('/postData', function(req, res) {
  console.log(req.body);
  var json = {
    "ValidPM":rnd(1, 0),
    "PM0P3val":rnd(100, 2),
    "PM0P3lvl":rnd(4, 0) - 1,
    "PM0P5val":rnd(100, 2),
    "PM0P5lvl":rnd(4, 0) - 1,
    "PM1P0val":rnd(100, 2),
    "PM1P0lvl":rnd(4, 0) - 1,
    "PM1P0aqi":rnd(500, 0),
    "PM2P5val":rnd(100, 2),
    "PM2P5lvl":rnd(4, 0) - 1,
    "PM2P5aqi":rnd(500, 0),
    "PM10Pval":rnd(100, 2),
    "PM10Plvl":rnd(4, 0) - 1,
    "PM10Paqi":rnd(500, 0),
    "ValidTH":rnd(1, 0),
    "TEMPval":rnd(100, 2),
    "TEMPlvl":rnd(4, 0) - 1,
    "HUMIDval":rnd(100, 2),
    "HUMIDlvl":rnd(4, 0) - 1,
    "ValidH2":rnd(1, 0),
    "H2val":rnd(20, 2),
    "H2lvl":rnd(4, 0) - 1,
    "ValidCH2O":rnd(1, 0),
    "CH2Oval":rnd(20, 2),
    "CH2Olvl":rnd(4, 0) - 1,
    "ValidCO":rnd(1, 0),
    "COval":rnd(20, 2),
    "COlvl":rnd(4, 0) - 1,
    "ValidCO2":rnd(1, 0),
    "CO2val":rnd(20, 2),
    "CO2lvl":rnd(4, 0) - 1,
    "ValidTVOC":rnd(1, 0),
    "TVOCval":rnd(20, 2),
    "TVOClvl":rnd(4, 0) - 1,
    "ValidO3":rnd(1, 0),
    "O3val":rnd(20, 2),
    "O3lvl":rnd(4, 0) - 1,
    "ValidNH3":rnd(1, 0),
    "NH3val":rnd(20, 2),
    "NH3lvl":rnd(4, 0) - 1,
    "ValidH2S":rnd(1, 0),
    "H2Sval":rnd(20, 2),
    "H2Slvl":rnd(4, 0) - 1,
    "ValidCH4":rnd(1, 0),
    "CH4val":rnd(20, 2),
    "CH4lvl":rnd(4, 0) - 1,
    "ValidC3H8":rnd(1, 0),
    "C3H8val":rnd(20, 2),
    "C3H8lvl":rnd(4, 0) - 1,
    "ValidNO2":rnd(1, 0),
    "NO2val":rnd(20, 2),
    "NO2lvl":rnd(4, 0) - 1,
    "CAival":rnd(500, 0),
    "CAilvl":rnd(4, 0) - 1
  }
  res.send(json);
})

function rnd(dec, point) {
  var random = Math.random() * dec + 1;
  random = random.toFixed(point);
  return random;
}
module.exports = router;