document.addEventListener('DOMContentLoaded', function() {
  const MAX_CHECK_COUNT = 4;
  // MultiLine Chart 객체
  var arr = new Array();
  var multiLineChart = getChart_MultiLine('chart-mm');
  var checkboxCount = 0;

  function dropDownAddEvent_setCheckBox(object) {
    var device = object.getAttribute('tag');
    var index = object.getAttribute('index');
    var req = {
      device_id: device
    };

    xhrConnect(POST, GET_EQUIPMENT, req, function(result) {
      // Device Checkbox 변경
      visibleCheckBox(index, result);
    });
    clearChart();
  }
  function visibleCheckBox(index, binary) {
    var label = document.getElementsByClassName('cs-nav-label');
    var cnt = 0;
    var r = JSON.parse(sessionStorage.getItem('deviceList'));

    for(var i=0; i<13; i++) {
      if(i == 1) {
        if(binary[i] == '1') {
          label[cnt].hidden = false;
          label[cnt+1].hidden = false;
        } else {
          label[cnt].hidden = true;
          label[cnt+1].hidden = true;
        }
        cnt += 2;
        continue;
      }
      if((binary[i] == '1') === true) {
        if(i == 0) {
          var type = r.device_id[index].split('-')[1];
          label[1].hidden = false;
          if(type === DEVICE_TYPE_S) {
            label[0].hidden = true;
            label[2].hidden = true;
            label[3].hidden = true;
            label[4].hidden = true;   
          }
          if(type === DEVICE_TYPE_S_PLUS) {
            label[0].hidden = false;
            label[2].hidden = false;
            label[3].hidden = false;
            label[4].hidden = false;
          }
          cnt = 5;
        } else {
          label[cnt].hidden = false;
          cnt++;
        }
      } else {
        label[cnt].hidden = true;
        cnt++;
      }
    }
  }
  function disabledCheckbox(disable = true) {
    var label = document.getElementsByClassName('cs-nav-label');
    for(var idx=0; idx<label.length; idx++) {
      var checkbox = label[idx].childNodes[1];
      if(disable == true) {
        if(checkbox.checked == false) {
          checkbox.disabled = true;
        } else {
          checkbox.disabled = false;
        }
      } else {
        checkbox.disabled = false;
      }
    }
  }
  function addClickEventCheckBox() {
    var label = document.getElementsByClassName('cs-nav-label');
    
    for(var idx=0; idx<label.length; idx++) {
      var checkbox = label[idx].childNodes[1];

      checkbox.addEventListener('click', function() {
        if(this.checked == false) {
          checkboxCount--;
          if(checkboxCount == MAX_CHECK_COUNT - 1)
            disabledCheckbox(false);
        } else {
          checkboxCount++;
          if(checkboxCount == MAX_CHECK_COUNT)
            disabledCheckbox();
        }
        
        generateChartOptions(calcChecked());
      })
    }
  }
  function calcChecked() {
    var label = document.getElementsByClassName('cs-nav-label');
    var checked = new Array();
    for(var i=0; i<label.length; i++) {
      var checkbox = label[i].childNodes[1];

      if(checkbox.checked == true)
        checked.push(checkbox.value);
      else
        checked.push(undefined);
    }

    return checked;
  }
  function clearChart() {
    arr = [];
    generateChartOptions(arr);
    
    var label = document.getElementsByClassName('cs-nav-label');
    for(var i=0; i<label.length; i++) {
      var checkbox = label[i].childNodes[1];
      checkbox.checked = false;
      checkbox.disabled = false;
      checkboxCount = 0;
    }
  }
  function getSensorDataBetweenDate(device_id, startDate, endDate, tick, sensorArray, cb) {
    var value = {
      device_id: device_id,
      startDate: startDate,
      endDate: endDate,
      dateTick: tick,
      length: sensorArray.length,
      sensor: sensorArray
    }

    xhrConnect(
      POST, 
      GET_RANGE_DATA, 
      value, 
      function(result) {
        cb(result);
      }
    )
  }
  function modifySensorName(name) {
    var modifyName;
    if(name.match('PM')) {
      switch(name) {
        case 'PM10Pval':
          modifyName = "PM 10";
          break;
        case 'PM2P5val':
          modifyName = "PM 2.5";
          break;
        case 'PM1P0val':
          modifyName = "PM 1.0";
          break;
        case 'PM0P5val':
          modifyName = "PM 0.5";
          break;
        case 'PM0P3val':
          modifyName = "PM 0.3";
          break;
        case "TEMP":
          modifyName = "Temperature";
          break;
        case "HUMID":
          modifyName = "Humidity";
          break;
      }
    } else {
      modifyName = name.split('val')[0];

      if(modifyName == "TEMP") modifyName = "Temperature";
      if(modifyName == "HUMID") modifyName = "Humidity";
    }
    return modifyName;
  }
  function generateChartOptions(arr) {
    var requestData = new Array();
  
    for(var i=0; i<arr.length; i++) {
      if(arr[i] != undefined)
        requestData.push(arr[i]);
    }
    
    if(requestData.length == 0) {
      var data = {
        labels: getLabelForTrend(),
        datasets: []
      }
      updateChartMultiLine(multiLineChart, data);
    } else {
      getSensorDataBetweenDate(
        "NIAQ001000-s", 
        "2021-11-05 00:00", 
        new Date().format("yyyy-MM-dd HH:00"), 
        "hour", 
        requestData, 
        function(res) {
          var datasets = new Array();
          for(var i=0; i<res.length; i++) {
            datasets.push({
              label: modifySensorName(res.sensor[i].sensorName),
              fill: false,
              backgroundColor: "white",
              borderColor: getColor(i),
              data: res.sensor[i].value,
              yAxisID: i
            })
          }
  
          var data = {
            labels: res.date, // x축 
            datasets: datasets
          }
  
          updateChartMultiLine(multiLineChart, data);
        }
      );
    }
  }
  createDropdown('analytics_nav_dropdown', dropDownAddEvent_setCheckBox);
  addClickEventCheckBox();
})