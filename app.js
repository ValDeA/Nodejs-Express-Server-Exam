const http = require('http'),
  express = require('express'),
  session = require('express-session'),
  app = express(),
  server = http.createServer(app);
const path = require('path');

const dns = require('dns');
const resolver = new dns.Resolver();
resolver.resolve4('ascloud.kr', (e, addr) => {
  console.log(addr);
});

const cors = require('cors');
let corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}

const client_router = require(__dirname + '/client_route.js');
const admin_router = require(__dirname + '/admin_route.js');

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(session({
      secret: 'Secret',
      resave: false,
      saveUninitialized: true
    }))
    .use(express.static(__dirname))
    .use(admin_router)
    .use(client_router)
    .use(cors(corsOptions));

server.listen(3000, () => {
  console.log("Running Server");
});


app.get('/vue/chart', (req, res) => {
  var chartData = {
    labels: [ 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    datasets: [ 
      {
        label: 'Mobile Apps',
        data: [ rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0) ] 
      } 
    ]
  };
  // console.log(chartData);

  res.send(chartData);
})
app.post('/vue/chart', (req, res) => {
  console.log(req.body);
  
  var chartData = {
    labels: new Array(),
    datasets: new Array()
  };

  for(var s in req.body.targetSensor) {
    // chartData.labels.push(s);
    chartData.datasets.push(
      {
        label: req.body.targetSensor[s],
        data: [ rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0), rnd(30, 0) ] 
      }
    )
  }
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var day = today.getDate();
  
  chartData.labels = [ day, day+1, day+2, day+3, day+4, day+5, day+6, day+7, day+8, day+9 ];

  res.send(chartData);
})
function rnd(dec, point) {
  var random = Math.random() * dec + 1;
  random = random.toFixed(point);
  return random;
}
app.post('/api/device/TIA0002053', (req, res) => {
  console.log(req.body);
  
  var chartData = {
    TEMPval: 24.1,
    "COval": rnd(10, 0),
    "date": 1677572406658,
    "COlvl": 0,
    "Virusval": rnd(100, 0),
    "ValidH2": 0,
    "Viruslvl": 0,
    "ValidCO": 1,
    "ValidCO2": 1,
    "TVOClvl": 0,
    "TVOCval": rnd(30, 0),
    "PM2P5aqi": 37,
    "ValidTH": 1,
    "HUMIDval": rnd(100, 0),
    "PM10P0val": rnd(200, 0),
    "PM2P5val": rnd(150, 0),
    "PM1P0val": rnd(150, 0),
    "PM0P5val": rnd(150, 0),
    "PM0P3val": rnd(150, 0),
    "PM0P1val": rnd(150, 0),
    "ValidTVOC": 1,
    "PM2P5lvl": 1,
    "ValildPM": 1,
    "CO2lvl": 1,
    "CAIlvl": 0,
    "CO2val": rnd(2000, 0),
    "NO2val": rnd(30, 0),
    "ValideNH3": 0,
    "CAIval": rnd(500, 0),
    "device": "TIA0002053"
   }
  //  res.setHeader(
  //   "Content-Type", "application/json"
  //  );
  res.send(chartData);
  // res.send("111");
})



app.post('/control', function(req, res) {
  console.log(req.body.ee);
});
app.get('/', function(req, res) {
  // session이 없다면 (로그인 전이라면)
  if(req.session.user_id == null) {
    res.render('./common/common_sign_in');
    return;
  }
  // id가 admin이면 관리자 페이지로
  if(req.session.user_id == "admin") {
    res.redirect('/admin');
    return;
  }

  // session이 있다면 (로그인 처리 됐다면)
  var props = {
    idx: 10,
    id: req.session.user_id
  }
  res.render('./client/client_page_index', props);
})
app.get('/register', function(req, res) {
  res.render('./common/common_sign_up');
})
app.get('/forget', function(req, res) {
  res.render('./common/common_sign_forget');
})

app.post('/forget', function(req, res) {
  console.log(req.body);
  /*
    req.body = {
      user_id: String,
      user_email: String
    }
  */
})
app.post('/register', function(req, res) {
  console.log(req.body);
  /*
    req.body = {
      // 
      user_id: String,
    }
  */

})
app.post('/register_check_id', function(req, res) {
  console.log(req.body);

  // ID 중복 체크
  // result: 0이면 사용 가능, 1이면 사용 불가능(중복)
  if(req.body.user_id === "admin") {
    res.send({ result: 1 });
  } else {
    res.send({ result: 0 });
  }
})


app.post('/nearDevice', function(req, res) {
  /*
  req.body = {
    gpsLat : double // 36
    gpsLng : double // 127
  }
  */
  console.log(req.body);

  var json = {
    length: 10,
    device: new Array()
  }

  for(var i=0; i<json.length; i++) {
    json.device.push(
      {
        user_id: "test" + i,
        device_id: "TIAQ00000" + i,
        device_name: "AS" + i,
        device_gps: [req.body.gpsLat - (i / 1000), req.body.gpsLng - (i / 1000)],
        device_firmware: "1.0.0.0",
        device_setupdate: "2021-12-01",
        device_connect_state: 0,
        info_permission: 0
      }
    )
  }
  res.send(json);
})