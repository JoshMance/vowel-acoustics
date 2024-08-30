// Defining the vowel chart lines by its anchor points
var min_coord = 60
var max_coord = 450

// The distance between horizontal lines
var interval  = (max_coord - min_coord) / 3

// The angle between the horizon and the outer, left-most vertical line in radians
var theta  =  (2/3)*Math.PI

init_x = max_coord/2
init_y = max_coord/2


function get_x_coord(y, angle) {
    return min_coord + (min_coord - y)/Math.tan(angle);
  }

var svg = d3.select('#vowel-chart-svg')

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#00000000");

// Drawing the vowel chart line segments
svg.append('line')         
    .style('stroke', '#01050CAA')  
    .attr('x1', max_coord)     
    .attr('y1', min_coord)     
    .attr('x2', max_coord)     
    .attr('y2', max_coord);    

svg.append("line")         
    .style("stroke", '#01050CAA')  
    .attr("x1", max_coord)     
    .attr("y1", min_coord)     
    .attr("x2", get_x_coord(min_coord, theta))     
    .attr("y2", min_coord);   
    
svg.append("line")         
    .style("stroke", '#01050CAA')  
    .attr("x1", max_coord)     
    .attr("y1", min_coord + interval)     
    .attr("x2", get_x_coord(min_coord + interval, theta))     
    .attr("y2", min_coord + interval);   

svg.append("line")         
    .style("stroke", '#01050CAA')  
    .attr("x1", max_coord)     
    .attr("y1", min_coord + 2*interval)     
    .attr("x2", get_x_coord(min_coord + 2*interval, theta))     
    .attr("y2", min_coord + 2*interval);   

svg.append("line")         
    .style("stroke", '#01050CAA')  
    .attr("x1", max_coord)     
    .attr("y1", max_coord)     
    .attr("x2", get_x_coord(max_coord, theta))     
    .attr("y2", max_coord);   

svg.append("line")         
    .style("stroke", '#01050CAA')  
    .attr("x1", min_coord)     
    .attr("y1", min_coord)     
    .attr("x2", get_x_coord(max_coord, theta))     
    .attr("y2", max_coord); 

svg.append("line")         
    .style("stroke", '#01050CAA')  
    .attr("x1", 300)     
    .attr("y1", min_coord)     
    .attr("x2", max_coord - (max_coord - get_x_coord(max_coord, theta))/2)     
    .attr("y2", max_coord);
    

// Adding labels
svg.append("text")
	.text("Front")
	.attr("x", min_coord - 20)
	.attr("y", min_coord - 20)
    .style("font-size", "20px");

svg.append("text")
	.text("Central")
	.attr("x", get_x_coord(max_coord, theta) - 30) 
	.attr("y", min_coord - 20)
    .style("font-size", "20px");

svg.append("text")
	.text("Back")
	.attr("x", max_coord - 20) 
	.attr("y", min_coord - 20)
    .style("font-size", "20px");

svg.append("text")
	.text("Close")
	.attr("x", min_coord - 60) 
	.attr("y", min_coord + 10)
    .style("font-size", "20px");

svg.append("text")
	.text("Half close")
	.attr("x", get_x_coord(min_coord + interval, theta) - 100) 
	.attr("y", min_coord + interval + 10)
    .style("font-size", "20px");

svg.append("text")
	.text("Half open")
	.attr("x", get_x_coord(min_coord + 2*interval, theta) - 100) 
	.attr("y", min_coord + 2*interval + 10)
    .style("font-size", "20px");

svg.append("text")
	.text("Open")
	.attr("x", get_x_coord(max_coord -120, theta)) 
	.attr("y", max_coord)
    .style("font-size", "20px");

// IPA symbols
svg.append("text")
	.text("\u{0259}")
	.attr("x", 400) 
	.attr("y", 385)
    .style("font-size", "20px");


// Marker
svg.append('circle')
    .attr('cx', init_x)
    .attr('cy', init_y)
    .attr('stroke', '#0E7CD6')
    .attr('fill', '#0E7CD6');

    

let points = [{id: 0, x: init_x, y: init_y}];

let drag = d3.drag()
    .on('drag', handleDrag);

function handleDrag(e) {

    let new_x = e.x;
    let new_y = e.y;

    // Correcting new_x and new_y if marker is out of bounds
    let x_bound = get_x_coord(e.y, theta)

    if (new_x <= x_bound) {
        new_x = max(x_bound, min_coord) + 5
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
        .attr('r', 10);
}
    
update();
initDrag();