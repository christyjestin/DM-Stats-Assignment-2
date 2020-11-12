// PART I: Manipulating the DOM
d3.select("body").append("h2").text("We're learning D3!");
// Step 1: Select the body of the HTML document and append an h2 element
// with the text "We're learning D3!"


d3.select("body").append("div").attr("id","dynamic-content");
// Step 2: Select the body again and append a div with the id dynamic-content


d3.select("#dynamic-content").append("p").text("I hope this works")
// Step 3: Select the div you just created (using its id!) and append a
// paragraph with some text of your choice (you can also style this if you want!)



// PART II: Binding data

var schools = [
    { name: "Harvard", signups: 4695, region: "Northeast" },
    { name: "UW Madison", signups: 4232, region: "Midwest" },
    { name: "WashU", signups: 3880, region: "Midwest" },
    { name: "Brown", signups: 2603, region: "Northeast" },
    { name: "UChicago", signups: 2088, region: "Midwest" },
    { name: "UW", signups: 2042, region: "West" }
];

// Step 1: Append a new SVG element to HTML document with D3
// (width = 500px, height = 500px)

var svg = d3.select("body").append("svg")
    .attr("width",500)
    .attr("height",100);
// Step 2: Append a new SVG circle for every object in the schools array



svg.selectAll("circle")
    .data(schools)
    .enter()
    .append("circle")
    .attr("cy",40)
    .attr("cx",function (d,index){
        return (25+index*45);
    })
    .attr("fill",function(d){
        if (d.region==="Midwest") {
            return "red";
        }
        if (d.region==="Northesst") {
            return "blue";
        }
        if (d.region==="West") {
            return "green";
        }
    })
    .attr("r",function (d){
        if (d.signups>3500){
            return 20;
        }
        if (d.signups<2500){
            return 15;
        }
        return 10;
    })
    .attr("stroke","black");


// Step 3: Define the following dynamic properties for each circle:
//   - Position: set the x/y coordinates and make sure that the circles don’t overlap each other
//   - Radius: schools with over 3500 signups should be twice as big as schools with less than 2500 signups
//   - Colors: use a different color for each region
//   - Border: add a border to every circle (SVG property: stroke)
var UK = function (country){
    if (country==="United Kingdom") {
        return "UK";
    }
        return country;
}
var rowConverter = function (d){
    return{
        city: d.city,
        country: UK(d.country),
        eu: d.eu,
        population: parseFloat(d.population),
        x: parseFloat(d.x),
        y: parseFloat(d.y)
    };
}

// PART III: Loading data

// Step 1: Use D3 to load the CSV file "cities.csv". then, print the data
// to the console and inspect it in your browser
d3.csv("data/cities.csv", rowConverter, function (data){
    console.log(data);
    var europeanCities = data.filter(city => eval(city.eu));
    d3.select("body").append("p").text(europeanUnion.length);
    var svg2 = d3.select("body").append("svg")
        .attr("width",700)
        .attr("height",550);
    svg2.selectAll("circle")
        .data(europeanCities)
        .enter()
        .append("circle")
        .attr("fill","none")
        .attr("stroke","black")
        .attr("cx",function (d){
            return d.x;
        })
        .attr("cy",function (d){
            return d.y;
        })
        .attr("r",function (d){
            if (d.population<1000000){
                return 4;
            }
            return 8;
        });
    svg2.selectAll("text")
        .data(europeanCities)
        .enter()
        .append("text")
        .text(function (d){
            return d.city;
        })
        .attr("class","city-label")
        .attr("x",function (d){
            return (d.x);
    })
        .attr("y",function (d){
            return (d.y-10);
        })
        .attr("opacity",function (d){
            if (d.population>1000000){
                return "1.0";
            }
            return "0.0";
        });
})

// Step 2: Filter the dataset: Filter the dataset to only include cities that are
// part of the EU.

var europeanUnion = ["Austria", "Belgium", "Bulgaria", "Croatia",
    "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania",
    "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania",
    "Slovakia", "Slovenia", "Spain", "Sweden", "United Kingdom","UK"];



// Step 3: Append a new paragraph to your HTML document that shows the
// number of EU countries



// Step 4: Prepare the data - each value of the CSV file is stored as a string,
// but we want numerical values to be numbers.




// Step 5: Draw an SVG circle for each city in the filtered dataset
//   - All the elements (drawing area + circles) should be added dynamically with D3
//   - SVG container: width = 700px, height = 550px
//   - Use the x/y coordinates from the dataset to position the circles



// Step 6: Change the radius of the circle to be data-dependent
//   - The radius should be 4px for cities with population less than one million
//   - The radius for all other cities should be 8px



// Step 7: Add labels with the names of the European cities
//   - Use the SVG text element
//   - All the elements should be the class of city-label
//   - The labels should only be visible for cities with population greater
//   than one million (use opacity)



// Step 8: Styling - in the external stylesheet, do some styling
//   - Make sure to at least style city-label with font size = 11 px and
//   text anchor = middle


// Optional bonus step: add tooltips displaying the country for each city
// https://bl.ocks.org/d3noob/257c360b3650b9f0a52dd8257d7a2d73
