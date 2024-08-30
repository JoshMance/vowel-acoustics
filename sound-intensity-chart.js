var width = 600,
  height = 300,
  margin = 50;


  var svg = d3.select('#sound-intensity-chart')
  .append('svg')
  .style({
    'width': width + 2 * margin,
    'height': height + 2 * margin
  });