const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/admin', function(req, res) {
  var props = {
    idx: 10,
    id: req.session.user_id
  }

  res.render('./admin/admin_page_index', props);
})
router.get('/admin_manage', function(req, res) {
  var screen = req.query.screen;
  if(screen === undefined) screen = "main";

  var props = {
    idx: 20,
    // Account ID
    id: req.session.user_id,
    screen: screen
  }

  // Database Target User ID
  if(screen === "user") {
    props.user_id = req.query.user_id;
  }
  // Database Target Device ID
  if(screen === "device") {
    props.device_id = req.query.device_id;
  }

  res.render('./admin/admin_page_manage', props);
})
router.get('/message', function(req, res) {
  var props = {
    idx: 30,
    id: req.session.user_id
  }

  res.render('./common/common_page_message', props);
})


/* Admin API */
router.post('/userInfo', function(req, res) {
  console.log(req.body);
  /*
    req.body = {
      // id가 ""이면 모든 데이터
      // id가 null이면 등록되지 않은 데이터
      user_id: String
    }
  */


  if(req.body.user_id != "") {
    var items = [
      {
        user_id: req.user_id,
        user_name: "진달래",
        user_phone: "070-5555-5555",
        user_email: "abc@naver.com",
        user_group: "AS",
        user_grade: 0
      }
    ]
  } else {
    var items = [
      {
        user_id: "AirSignal",
        user_name: "진달래",
        user_phone: "070-5555-5555",
        user_email: "abc@naver.com",
        user_group: "AS",
        user_grade: 0
      },
      {
        user_id: "AS_TECH",
        user_name: "무궁화",
        user_phone: "070-5555-5555",
        user_email: "abc@naver.com",
        user_group: "AS",
        user_grade: 0
      },
      {
        user_id: "Env Index",
        user_name: "샘킴",
        user_phone: "070-4444-4444",
        user_email: "def@naver.com",
        user_group: "개인",
        user_grade: 0
      },
      {
        user_id: "Envinode",
        user_name: "개나리",
        user_phone: "070-3333-3333",
        user_email: "Envinode@naver.com",
        user_group: "Envinode",
        user_grade: 0
      }
    ]
  }


  var json = {
    length: items.length, // 
    user: items // 
  }
  res.send(json);
})
router.post('/deviceInfo', function(req, res) {
  console.log(req.body);
  /*
    req.body = {
      // device_id가 ""이면 모든 데이터
      // device_id가 null이면 등록되지 않은 데이터
      device_id: String,
      user_id: String
    }
  */


  if(req.body.device_id != "") {
    var items = [
      {
        user_id: "AirSignal",
        device_id: req.body.device_id,
        device_name: "AS",
        device_gps: [36.123456, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      }
    ]
  } else if(req.body.user_id == "") {
    var items = [
      {
        user_id: "AirSignal",
        device_id: "SAS001000",
        device_name: "AS",
        device_gps: [36.123456, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      },
      {
        user_id: "AS_TECH",
        device_id: "NAS002000",
        device_name: "안방",
        device_gps: [36.123456, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 1
      },
      {
        device_id: "TAS003000",
        device_name: "거실",
        device_gps: [36.123456, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      },
      {
        user_id: "Env Index",
        device_id: "SAS004000",
        device_name: "부엌",
        device_gps: [36.123456, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      },
      {
        device_id: "TAS005000",
        device_name: "택시",
        device_gps: [36.123456, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      },
      {
        user_id: "Envinode",
        device_id: "NAS006000",
        device_name: "화장실",
        device_gps: [36.123456, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 1
      },
      {
        user_id: "Envinode",
        device_id: "TAG007000",
        device_name: "사무실",
        device_gps: [36.123456, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      },
    ]
  } else {
    var items = [
      {
        user_id: req.body.user_id,
        device_id: "TAG007000",
        device_name: "사무실",
        device_gps: [36.123457, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      },
      {
        user_id: req.body.user_id,
        device_id: "SAG007001",
        device_name: "본사",
        device_gps: [36.123456, 127.125457],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      },
      {
        user_id: req.body.user_id,
        device_id: "MAG007002",
        device_name: "AS",
        device_gps: [36.125458, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      },
      {
        user_id: req.body.user_id,
        device_id: "TAG007003",
        device_name: "오피스",
        device_gps: [36.123456, 127.122458],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      },
      {
        user_id: req.body.user_id,
        device_id: "TAG007004",
        device_name: "도서관",
        device_gps: [36.122455, 127.123456],
        info_permission: true,
        device_firmware: "1.0.0",
        device_setupdate: "2011-11-15",
        device_connect_state: 0
      }
    ]
  }

  var json = {
    length: items.length,
    device: items
  }
  res.send(json);
})
router.post('/showNotice', function(req, res) {
  console.log(req.body);
  /*
    req.body = {
      count: Integer
    }
  */
  var category = ["일반", "시스템", "FAQ"];

  var json = {
    length: req.body.count,
    notice: new Array()
  };

  if(req.body.count === "") {
    json.length = 31;
    for(var i=0; i<json.length; i++) {
      json.notice.push(
        {
          notice_id: i,
          notice_category: category[i % category.length],
          notice_title: i + "번째 공지사항",
          notice_content: i + "번째 공지사항 내용",
          notice_date: "2021-11-0" + (i + 1) + " 13:38:24"
        }
      );
    }
  } else {
    json.length = req.body.count;
    for(var i=0; i<req.body.count; i++) {
      json.notice.push(
        {
          notice_id: i,
          notice_category: category[i % category.length],
          notice_title: i + "번째 공지사항",
          notice_content: i + "번째 공지사항 내용",
          notice_date: "2021-11-0" + (i + 1) + " 13:38:24"
        }
      );
    }
  }

  res.send(json);
})
router.post('/showMessage', function(req, res) {
  console.log(req.body);
  /*
    req.body = {
      user_id: String,
      // 0 : 확인, 1 : 미확인, 2 : 모든 메시지
      checked: Integer,
      count: Integer
    }
  */
  var json = {
    length: req.body.count,
    message: new Array()
  };

  if(req.body.count == "") {
    json.length = 26;
    for(var i=0; i<json.length; i++) {
      json.message.push(
        {
          message_from: "dummy-1",
          message_to: "dummy-2",
          message_id: i,
          message_title: i + "번째 공지사항",
          message_content: i + "번째 공지사항 내용",
          message_date: "2021-11-0" + (i + 1) + " 13:38:24",
          message_checked: 1
        }
      );
    }
  } else {
    for(var i=0; i<req.body.count; i++) {
      json.message.push(
        {
          message_from: "dummy-1",
          message_to: "dummy-2",
          message_id: i,
          message_title: i + "번째 메시지",
          message_content: i + "번째 메시지 내용",
          message_date: "2021-11-0" + (i + 1) + " 13:38:24",
          message_checked: i % 2
        }
      );
    }
  }

  res.send(json);
})
router.post('/getMessage', function(req, res) {
  console.log(req.body);
  
  // 해당 메시지 message_checked = 0으로 변경
  var json = {
    message: {
      message_from: "dummy-1",
      message_to: "dummy-2",
      message_id: 000001,
      message_title: 1 + "번째 메시지",
      message_content: 1 + "번째 메시지 내용",
      message_date: "2021-12-20 13:38:24",
      message_checked: 0
    }
  }
  res.send(json);
})
router.post('/showState', function(req, res) {
  console.log(req.body);

  var json = {
    dateLength: 5,
    date: [
      "2021-11-04 07:00",
      "2021-11-04 08:00",
      "2021-12-05 09:00",
      "2021-12-06 09:00",
      "2021-12-06 09:00"
    ],
    length: 3,
    state: [
      {
        device_id: "NIAQ001000",
        device_name: "AirSignal",
        user_id: "AS",
        sensor: "PM 2.5",
        state_old: 10,
        state_now: 12,
        state_date: "2021-12-04 07:21:33"
      },
      {
        device_id: "NIAQ001000",
        device_name: "AirSignal",
        user_id: "AS",
        sensor: "Device",
        state_old: 10,
        state_now: 12,
        state_date: "2021-12-04 07:21:33"
      },
      {
        device_id: "NIAQ001000",
        device_name: "AirSignal",
        user_id: "AS",
        sensor: "Device",
        state_old: 10,
        state_now: 12,
        state_date: "2021-12-05 08:21:33"
      },
      {
        device_id: "NIAQ001000",
        device_name: "AirSignal",
        user_id: "AS",
        sensor: "TVOC",
        state_old: 12,
        state_now: 10,
        state_date: "2021-12-06 08:21:33"
      },
      {
        device_id: "NIAQ001000",
        device_name: "AirSignal",
        user_id: "AS",
        sensor: "TVOC",
        state_old: 12,
        state_now: 10,
        state_date: "2021-12-06 10:21:33"
      }
    ]
  }

  res.send(json);
})


module.exports = router;