// assets/charts.js
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var fontFamily = '"Instrument Sans","PingFang SC","Microsoft YaHei",sans-serif';

  // --- Mermaid init ---
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: fontFamily,
        fontSize: '13px',
        primaryColor: '#FFFFFF',
        primaryTextColor: ink,
        primaryBorderColor: rule,
        lineColor: muted,
        tertiaryColor: bg2,
        edgeLabelBackground: '#FFFFFF'
      }
    });
  }

  function fmtSec(v) {
    var m = Math.floor(v / 60);
    var s = v % 60;
    return m + 'm' + (s < 10 ? '0' : '') + s + 's';
  }

  // --- Chart: 单轮迭代耗时 ---
  var elDuration = document.getElementById('chart-duration');
  if (elDuration) {
    var chartDuration = echarts.init(elDuration, null, { renderer: 'svg' });
    chartDuration.setOption({
      animation: false,
      grid: { top: 30, right: 24, bottom: 34, left: 96 },
      tooltip: {
        appendToBody: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (p) {
          return p[0].name + '：' + fmtSec(p[0].value);
        }
      },
      xAxis: {
        type: 'value',
        max: 140,
        axisLabel: { color: muted, fontFamily: fontFamily, formatter: '{value}s' },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: ['小煤球 v1（首版）', '小煤球 v2（毛茸茸）', '线条小狗（参考图重做）'],
        axisLabel: { color: ink, fontFamily: fontFamily, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        barWidth: 22,
        data: [
          { value: 62, itemStyle: { color: accent } },
          { value: 88, itemStyle: { color: accent + 'CC' } },
          { value: 118, itemStyle: { color: accent2 } }
        ],
        itemStyle: { borderRadius: [0, 4, 4, 0] },
        label: {
          show: true,
          position: 'right',
          color: ink,
          fontFamily: fontFamily,
          fontSize: 12,
          formatter: function (p) { return fmtSec(p.value); }
        }
      }]
    });
    window.addEventListener('resize', function () { chartDuration.resize(); });
  }

  // --- Chart: 能力维度定性评估 ---
  var elCap = document.getElementById('chart-capability');
  if (elCap) {
    var chartCap = echarts.init(elCap, null, { renderer: 'svg' });
    var dims = ['技术指标达成', '迭代响应速度', '自主增强意识', '视觉细节还原', '审美适配'];
    var vals = [9.5, 9.4, 9.0, 5.0, 4.0];
    var splitIndex = 3; // 前 3 项为功能类，后 2 项为审美类
    chartCap.setOption({
      animation: false,
      grid: { top: 30, right: 56, bottom: 30, left: 116 },
      tooltip: {
        appendToBody: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (p) {
          var i = dims.indexOf(p[0].name);
          var kind = i < splitIndex ? '功能侧' : '审美侧';
          return p[0].name + '（' + kind + '）：' + p[0].value + ' / 10';
        }
      },
      xAxis: {
        type: 'value',
        max: 10,
        axisLabel: { color: muted, fontFamily: fontFamily },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: dims,
        axisLabel: { color: ink, fontFamily: fontFamily, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        barWidth: 22,
        data: vals.map(function (v, i) {
          return { value: v, itemStyle: { color: i < splitIndex ? accent : accent2 } };
        }),
        itemStyle: { borderRadius: [0, 4, 4, 0] },
        label: {
          show: true,
          position: 'right',
          color: ink,
          fontFamily: fontFamily,
          fontSize: 12,
          formatter: '{c}'
        }
      }]
    });
    window.addEventListener('resize', function () { chartCap.resize(); });
  }
})();
