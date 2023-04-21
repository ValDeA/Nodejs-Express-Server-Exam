const http = require('http'),
  express = require('express'),
  session = require('express-session'),
  app = express(),
  server = http.createServer(app);
const path = require('path');

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
    .use(client_router);

server.listen(3000, () => {
  console.log("Running Server");
});

app.get('/', function(req, res) {
  // session이 없다면 (로그인 전이라면)
  if(req.session.user_id == null) {
    res.render('sign_in');
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
  res.render('client_page_index', props);
})
app.get('/register', function(req, res) {
  res.render('sign_up');
})
app.get('/forget', function(req, res) {
  res.render('sign_forget');
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