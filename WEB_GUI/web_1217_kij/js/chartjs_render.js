//document.addEventListener("DOMContentLoaded", function () {

// 도넛 차트 텍스트 삽입
Chart.plugins.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) { //Get ctx from string
      var ctx = chart.chart.ctx; //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontSize = centerConfig.fontSize || '50';
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text; var color = centerConfig.color || '#000';
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
      //Start with a base font of 30px
      ctx.font = fontSize + "px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width. 
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 0.7);

      // Pick a new font size so it will not be larger than the height of label. 
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly. 
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

      //반도넛일 경우
      if (chart.config.options.rotation === Math.PI && chart.config.options.circumference === Math.PI) {
        centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 1.3);
      }
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center 
      ctx.fillText(txt, centerX, centerY);
    }
  }
});

const COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba',
  '#36a2eb',
  '#4bc0c0',
  '#ff9f40',
  '#ff6384'
];
const colorScale = [
  '#36a2eb',
  '#4bc0c0',
  '#ff9f40',
  '#ff6384'
];

function getColor(index) {
  return COLORS[index % COLORS.length];
}


function change_chart_name(child) {
  var target = document.getElementById("chart-target");
  var name = child.childNodes[1].childNodes[1];

  target.innerHTML = name.innerHTML;
  return name.getAttribute('value');
}


function getIntervalRandom(chart, type) {
  if (type == 0) {
    var interval = setInterval(() => {
      var rand = rnd(500, 0);
      chart.data.datasets[0].data = [rand, 500 - rand];
      chart.options.elements.center.text = rand;

      var color = getColorScale(rand);

      chart.data.datasets[0].backgroundColor[0] = color;
      chart.options.elements.center.color = color;
      chart.update();
    }, 2000);
    return interval;
  } else if (type == 1) {
    var interval = setInterval(() => {
      var rand = [rnd(500, 0), rnd(500, 0), rnd(500, 0)];
      chart.data.datasets[0].data = rand;
      var color = [getColorScale(rand[0]), getColorScale(rand[1]), getColorScale(rand[2])];

      chart.data.datasets[0].backgroundColor[0] = color[0];
      chart.data.datasets[0].backgroundColor[1] = color[1];
      chart.data.datasets[0].backgroundColor[2] = color[2];

      chart.update();
    }, 2000);
    return interval;
  }
}

function getChart_Line(target, lables, data = undefined) {
  const line = document.getElementById(target).getContext('2d');
  if (data == undefined) data = [0, 0, 0, 0, 0, 0, 0, 0];

  const line_config = {
    type: "line",
    data: {
      labels: lables,
      datasets: [{
        fill: true,
        backgroundColor: '#6fecfa',
        borderColor: '#27a3d0',
        data: data
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        intersect: false
      },
      hover: {
        intersect: true
      },
      plugins: {
        filler: {
          propagate: false
        }
      },
      scales: {
        xAxes: [{
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.05)"
          }
        }],
        yAxes: [{

          ticks: {
            min: 0,
            //max: 500
          },

          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff"
          }
        }]
      }
    }
  }
  return new Chart(line, line_config);
}
function getChart_MultiLine(target) {
  const line = document.getElementById(target).getContext('2d');
  const line_config = {
    type: "line",
    data: {
      labels: getLabelForTrend().hourList,
      datasets: [{}]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        intersect: false
      },
      hover: {
        intersect: true
      },
      plugins: {
        filler: {
          propagate: false
        }
      },
      scales: {
        xAxes: [{
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.05)"
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 10
          },
          position: "right",
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff"
          }
        }]
      },
      elements: {
        line: {
          tension: 0
        },
        point: {
          radius: 4,
          borderWidth: 2,
          pointStyle: 'circle'
        }
      }
    },
    /*
    plugins: [{
      afterDraw: chart => {
        var ctx = chart.chart.ctx;
        var xAxis = chart.scales['x-axis-0'];
        var yAxis = chart.scales['y-axis-0'];
        var image = new Image();
        image.src = "./img/baseline_house_black_24dp.png";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.strokeRect(xAxis.right - 20, yAxis.top, 24, 24);
        ctx.drawImage(image, xAxis.right - 20, yAxis.top);

        image.onclick = function() {console.log(123123)}
      }
    }]
    */
  }
  return new Chart(line, line_config);
}
function updateChartMultiLine(chart, data) {
  var yAxes = new Array();
  var count = 0;

  // 선택된 항목만큼 데이터 및 Y축 추가
  for (var i = 0; i < data.datasets.length; i++) {
    count++;
    var position;
    var idx = i;
    if (count < 3) position = "left";
    else position = "right";

    yAxes.push({
      id: i,
      type: "linear",
      position: position,
      ticks: {
        min: 0,
        fontColor: getColor(i),
        callback: function (value, index, values) {
          // 버그 발생, 해결법 찾기
          //return value + getUnit(data.datasets[idx].label);
          return value;
        }
      },
      display: true,
      borderDash: [5, 5],
      gridLines: {
        color: "rgba(0,0,0,0)"
      }
    })
  }

  // Y축 초기화
  if (data.datasets.length == 0) {
    yAxes = [{
      ticks: {
        min: 0,
        max: 10
      },
      position: "right",
      display: true,
      borderDash: [5, 5],
      gridLines: {
        color: "rgba(0,0,0,0)",
        fontColor: "#fff"
      }
    }];
  }

  chart.data = data;
  chart.options.scales.yAxes = yAxes;
  chart.update();
}
function getChart_CAI(target) {
  const cai = document.getElementById(target).getContext('2d');
  const label = target.split('_')[1].toUpperCase();
  const cai_config = {
    type: "doughnut",
    data: {
      labels: [label],
      datasets: [{
        backgroundColor: [colorScale[0], '#ddd'],
        data: [0, 500]
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: 'top'
      },
      tooltips: {
        filter: function (item, data) {
          if (data.labels[item.index] == undefined) {
            return false;
          } else {
            return true;
          }
        }
      },
      elements: {
        center: {
          text: '0',
          color: colorScale[0], // Default is #000000
          fontStyle: 'Arial', // Default is Arial
          sidePadding: 20, // Default is 20 (as a percentage)
          fontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
          lineHeight: 25 // Default is 25 (in px), used for when text wraps
        }
      }
    }
  }
  return new Chart(cai, cai_config);
}
function createVirusChart(target) {
  var dom = document.getElementById(target);
  var context = dom.getContext('2d');
  
  var chart_config = {
    type: "doughnut",
    data: {
      labels: ["Virus"],
      datasets: [{
        backgroundColor: [getColorScale[0], '#ddd'],
        data: [0, 500]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: 'top'
      },
      tooltips: {
        filter: function (item, data) {
          if (data.labels[item.index] == undefined) {
            return false;
          } else {
            return true;
          }
        }
      },
      elements: {
        center: {
          text: 0,
          color: getColorScale[0],
          fontStyle: 'Arial',
          sidePadding: 20,
          fontSize: 20,
          lineHeight: 25
        }
      }
    }
  }

  return new Chart(context, chart_config);
}
function createAQIChart(target, device_id) {
  var context = document.getElementById(target).getContext('2d');
  var device_type = getDeviceType(device_id);
  var chart_config;

  // Device Type S, Mini
  if (device_type === DEVICE_TYPE_S || device_type === DEVICE_TYPE_MINI) {
    chart_config = {
      type: "doughnut",
      data: {
        labels: ["PM 2.5"],
        datasets: [{
          backgroundColor: [getColorScale[0], '#ddd'],
          data: [0, 500]
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: 'top'
        },
        tooltips: {
          filter: function (item, data) {
            if (data.labels[item.index] == undefined) {
              return false;
            } else {
              return true;
            }
          }
        },
        elements: {
          center: {
            text: 0,
            color: getColorScale[0],
            fontStyle: 'Arial',
            sidePadding: 20,
            fontSize: 20,
            lineHeight: 25
          }
        }
      }
    }
  }
  // Device Type S+, Pro
  if (device_type == DEVICE_TYPE_S_PLUS || device_type === DEVICE_TYPE_PRO) {
    chart_config = {
      type: "polarArea",
      data: {
        datasets: [{
          data: [0, 0, 0],
          backgroundColor: [
            getColorScale[0],
            getColorScale[0],
            getColorScale[0]
          ]
        }],
        labels: ["PM 1.0", "PM 2.5", "PM 10"]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: 'top'
        },
        scale: {
          ticks: {
            min: 0,
            max: 500
          }
        },
        tooltip: {
          enabled: false
        },
        onAnimationComplete: function () {
          var self = this;

          var elementsArray = [];
          Chart.helpers.each(self.data.datasets, function (dataset, datasetIndex) {
            Chart.helpers.each(dataset.metaData, function (element, index) {
              var tooltip = new Chart.Tooltip({
                _chart: self.chart,
                _data: self.data,
                _options: self.options,
                _active: [element]
              }, self);

              tooltip.update();
              tooltip.transition(Chart.helpers.easingEffects.linear).draw();
            }, self);
          }, self);
        }
      }
    }
  }
  return new Chart(context, chart_config);
}
function getChartOption(val, lvl, name, type) {
  var chart_config;
  // Device type S || Chart CAI
  if (type == DEVICE_TYPE_S || DEVICE_TYPE_MINI) {
    chart_config = {
      type: "doughnut",
      data: {
        labels: name,
        datasets: [{
          backgroundColor: [getColorScale[val], '#ddd'],
          data: val
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: 'top'
        },
        tooltips: {
          filter: function (item, data) {
            if (data.labels[item.index] == undefined) {
              return false;
            } else {
              return true;
            }
          }
        },
        elements: {
          center: {
            text: val[0],
            color: getColorScale[val],
            fontStyle: 'Arial',
            sidePadding: 20,
            fontSize: 20,
            lineHeight: 25
          }
        }
      }
    }
  }
  // Device Typs S+
  if (type == DEVICE_TYPE_S_PLUS || type == DEVICE_TYPE_PRO) {
    chart_config = {
      type: "polarArea",
      data: {
        datasets: [{
          data: val,
          backgroundColor: [
            getColorScale[val[0]],
            getColorScale[val[1]],
            getColorScale[val[2]]
          ]
        }],
        labels: name
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: 'top'
        },
        scale: {
          ticks: {
            min: 0,
            max: 500
          }
        },
        tooltip: {
          enabled: false
        },
        onAnimationComplete: function () {
          var self = this;

          var elementsArray = [];
          Chart.helpers.each(self.data.datasets, function (dataset, datasetIndex) {
            Chart.helpers.each(dataset.metaData, function (element, index) {
              var tooltip = new Chart.Tooltip({
                _chart: self.chart,
                _data: self.data,
                _options: self.options,
                _active: [element]
              }, self);

              tooltip.update();
              tooltip.transition(Chart.helpers.easingEffects.linear).draw();
            }, self);
          }, self);
        }
      }
    }
  }
  return chart_config;
}


function getColorScale(value) {
  if (value <= 100) return colorScale[0];
  else if (value <= 200) return colorScale[1];
  else if (value <= 300) return colorScale[2];
  else return colorScale[3];
}
function getLabelForTrend() {
  const TREND_TIME = 8;
  var date = new Date();
  var year = date.format('yyyy');
  var month = date.getMonth('MM');
  var day = date.getDate('dd');
  var hour = date.format('HH');

  var result = {
    start: null,
    end: date.format("yyyy-MM-dd HH:00"),
    hourList: new Array()
  }

  for (var i = 0; i < TREND_TIME; i++) {
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
      label = new Date(year, month, day, calcHour).format("MM-dd HH:00");
    } else { // 01 시가 아니었을 경우
      label = calcHour + ":00";
      //label = new Date(year, month, day, calcHour).format("HH:00");
    }
    
    result.hourList.push(label);
    if(i < TREND_TIME) result.start = new Date(year, month, day, calcHour).format("yyyy-MM-dd HH:00");
  }
  result.hourList.reverse();
  return result;
};
function calcDate(endDate, number, method) {
  var year = endDate.format('yyyy');
  var month = endDate.getMonth('MM');
  var day = endDate.getDate('dd');
  var hour = endDate.format('HH');
  var targetDate, formatType;

  if (method == "hour") {
    hour -= number;
    formatType = "yyyy-MM-dd HH:00";
    if (hour < 0) {
      hour += 24;
      day--;
    }
  }
  if (method == "day") {
    day -= number;
    formatType = "yyyy-MM-dd";
  }
  if (day < 0) {
    month--;
  }
  if (method == "month") {
    month -= number;
    formatType = "yyyy-MM";
  }
  if (month < 0) {
    year--;
    month += new Date(year, 0, 0).getMonth() + 1;
  }
  if (day < 0) {
    day += new Date(year, month, 0).getDate() + 1;
  }
  targetDate = new Date(year, month, day, hour).format(formatType);
  return targetDate;
}
function getUnit(name) {
  var unit = undefined;
  switch (name) {
    case "PM 10": case "PM 2.5": case "PM 1.0": case "PM 0.5": case "PM 0.3":
      unit = " ㎍/㎥";
      break;
    case "H2": case "CH2O": case "CO": case "CO2": case "O3": case "NH3":
    case "H2S": case "CH4": case "C3H8": case "NO2":
      unit = " ppm";
      break;
    case "TVOC":
      unit = " ㎎/㎥";
      break;
    case "Temperature":
      unit = " ℃"
      break;
    case "Humidity":
      unit = " %";
      break;
  }
  return unit;
}
function rnd(dec, point) {
  var random = Math.random() * dec + 1;
  random = random.toFixed(point);
  return random;
}
//})