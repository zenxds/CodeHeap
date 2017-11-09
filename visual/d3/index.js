;(function() {
  var data = [4, 8, 15, 16, 23, 42]
  var fontScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, 100]);

  d3.select("body")
    .selectAll("p")
    .data(data)
    .enter().append("p")
    .text(function(d) { return "I’m number " + d + "!" })
    .transition()
    .duration(1000)
    .style("color", function() {
      return "hsl(" + Math.random() * 360 + ", 100%, 50%)"
    })
    .style("font-size", function(d) { return fontScale(d) + "px" })
})()

;(function() {
  // .curve(d3.curveCardinal) - 曲线，否则是直线
  var lineGenerator = d3.line().curve(d3.curveCardinal)
  var points = [
    [0, 80],
    [100, 100],
    [200, 30],
    [300, 50],
    [400, 40],
    [500, 80]
  ]

  d3.select("body")
    .append('svg')
    .attr('width', 800)
    .attr('heiht', 150)
    .append('path')
    .style('fill', 'none')
    .style('stroke', '#999')
    .attr('d', lineGenerator(points))

})()

// tree
;(function() {
  var data = {
    "name": "A1",
    "children": [
      {
        "name": "B1",
        "children": [
          {
            "name": "C1",
            "value": 100
          },
          {
            "name": "C2",
            "value": 300
          },
          {
            "name": "C3",
            "value": 200
          }
        ]
      },
      {
        "name": "B2",
        "value": 200
      }
    ]
  }

  var root = d3.hierarchy(data)
  var treeLayout = d3.tree()
  treeLayout.size([400, 200])
  treeLayout(root)

  var g = d3.select('body')
    .append('svg')
    .style('width', 400)
    .style('height', 220)
    .append('g')
    .attr('transform', 'translate(5, 5)')

  // Links
  g.append('g')
    .classed('links', true)  
    .selectAll('line.link')
    .data(root.links())
    .enter()
    .append('line')
    .classed('link', true)
    .attr('x1', function(d) {return d.source.x })
    .attr('y1', function(d) {return d.source.y })
    .attr('x2', function(d) {return d.target.x })
    .attr('y2', function(d) {return d.target.y })

  // Nodes
  g.append('g').classed('nodes', true)    
    .selectAll('circle.node')
    .data(root.descendants())
    .enter()
    .append('circle')
    .classed('node', true)
    .attr('cx', function(d) { return d.x })
    .attr('cy', function(d) { return d.y })
    .attr('r', 4)
})()