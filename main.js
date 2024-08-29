// Defining the vowel chart lines by its anchor points
var min_coord = 100
var max_coord = 700

// The distance between horizontal lines
var interval  = (max_coord - min_coord) / 3

// The angle between the horizon and the outer, left-most vertical line in radians
var theta  =  (2/3)*Math.PI

init_x = 500
init_y = 500


function get_x_coord(y, angle) {
    return min_coord + (min_coord - y)/Math.tan(angle);
  }

var svg = d3.select('#dataviz_area')

svg.append('line')         
    .style('stroke', 'black')  
    .attr('x1', max_coord)     
    .attr('y1', min_coord)     
    .attr('x2', max_coord)     
    .attr('y2', max_coord);    

svg.append("line")         
    .style("stroke", "black")  
    .attr("x1", max_coord)     
    .attr("y1", min_coord)     
    .attr("x2", get_x_coord(min_coord, theta))     
    .attr("y2", min_coord);   
    
svg.append("line")         
    .style("stroke", "black")  
    .attr("x1", max_coord)     
    .attr("y1", min_coord + interval)     
    .attr("x2", get_x_coord(min_coord + interval, theta))     
    .attr("y2", min_coord + interval);   

svg.append("line")         
    .style("stroke", "black")  
    .attr("x1", max_coord)     
    .attr("y1", min_coord + 2*interval)     
    .attr("x2", get_x_coord(min_coord + 2*interval, theta))     
    .attr("y2", min_coord + 2*interval);   

svg.append("line")         
    .style("stroke", "black")  
    .attr("x1", max_coord)     
    .attr("y1", max_coord)     
    .attr("x2", get_x_coord(max_coord, theta))     
    .attr("y2", max_coord);   

svg.append("line")         
    .style("stroke", "black")  
    .attr("x1", min_coord)     
    .attr("y1", min_coord)     
    .attr("x2", get_x_coord(max_coord, theta))     
    .attr("y2", max_coord); 

svg.append("line")         
    .style("stroke", "black")  
    .attr("x1", 300)     
    .attr("y1", min_coord)     
    .attr("x2", max_coord - (max_coord - get_x_coord(max_coord, theta))/2)     
    .attr("y2", max_coord);

svg.append('circle')
    .attr('cx', init_x)
    .attr('cy', init_y)
    .attr('r', 10)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2')
    .attr("id", "handle");
    
let points = [{id: 0, x: init_x, y: init_y}];

let drag = d3.drag()
    .on('drag', handleDrag);

function handleDrag(e) {

    let new_x = e.x;
    let new_y = e.y;

    // Correcting new_x and new_y if marker is out of bounds
    let x_bound = get_x_coord(e.y, theta)

    if (new_x <= x_bound) {
        new_x = max(x_bound, min_coord)
    }
    else if (new_x > max_coord) {
        new_x = max_coord 
    }
    if (new_y < min_coord) {
        new_y = min_coord
    }
    else if (new_y > max_coord) {
        new_y = max_coord
    }
    
    e.subject.x = new_x;
    e.subject.y = new_y;

    $("#vowel-cursor-x").html(new_x);
    $("#vowel-cursor-y").html(new_y);

    update();
}

function initDrag() {
    d3.select('svg')
        .selectAll('circle')
        .call(drag);
}


function update() {
    d3.select('svg')
        .selectAll('circle')
        .data(points)
        .join('circle')
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', 15);
}
    
update();
initDrag();