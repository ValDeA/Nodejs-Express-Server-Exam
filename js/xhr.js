const GET_EQUIPMENT = "postEquipment";
const GET_RANGE_DATA = "rangeData";
const GET_SENSOR_DATA = "postData";

const REQUEST_DATABASE = "postRequestDB";

const USER_INFO = "userInfo", DEVICE_INFO = "deviceInfo";
const GET_NOTICE = "showNotice", SEND_NOTICE = "sendNotice", DEL_NOTICE = "deleteNotice";
const SHOW_MESSAGE = "showMessage", GET_MESSAGE = "getMessage", SEND_MESSAGE = "sendMessage", DEL_MESSAGE = "deleteMessage";
const GET_STATE = "showState";

const REGISTER_CHECK_ID = "register_check_id";

const GET = "GET", POST = "POST";

function classifyResponse(res, addr) {
  var result;
  switch (addr) {
    case GET_RANGE_DATA: case GET_SENSOR_DATA: case REQUEST_DATABASE:
    case USER_INFO: case DEVICE_INFO:
    case GET_NOTICE: case GET_MESSAGE: case GET_STATE:
    case SHOW_MESSAGE:
    case REGISTER_CHECK_ID:
      console.log(res);
      result = res;
      break;
    case GET_EQUIPMENT:
      var binary = res.equip.toString(2).padStart(13, '0');
      result = binary.split("").reverse().join("");
      break;
  }
  return result;
}
function xhrConnect(method = GET, address, value, cb) {
  value = JSON.stringify(value);
  // XHRHTTPRequest 객체 생성
  var xhr = new XMLHttpRequest();
  // 방식, 주소, 비동기 설정
  xhr.open(method, address, true);
  
  // HTTP 헤더 설정
  if(method == POST) {
    xhr.setRequestHeader('Content-type', "application/json");
  }
  // 타임아웃 설정
  xhr.timeout = 1000;

  // 전송
  if(method == POST && value != undefined) {
    xhr.send(value);
  } else {
    xhr.send();
  }

  // Response 처리
  xhr.onload = function () {
    // 통신 성공
    if (xhr.status == 200) {
      var result = classifyResponse(JSON.parse(xhr.response), address);
      cb(result);
    } else {
      console.log('Failed');
    }
  }
}