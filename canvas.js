// set up canvas
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var height = canvas.height;
var width = canvas.width;

// draws the grid, just once
var initializeGrid = function() {

	for (var i = 0; i <= width; i += 100) {
		context.moveTo(i, 0);
		context.lineTo(i, height);
	}

	for (var i = 0; i <= height; i += 100) {
		context.moveTo(0, i);
		context.lineTo(width, i);
	}

	context.strokeStyle = 'black';
	context.stroke();


}

// gets an int between min and max
var randomInRange = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// just an element to show the iteration count
var counter = document.getElementById('counter');
var iterations = 0;

// similar element to show how long the redraw loop was
var timer = document.getElementById('timer');

// could be doing complex calculations here
// but this is the stuff that happens in a redraw loop
var randomSquare = function() {

	setTimeout(function() {

		var startTime = performance.now();
		// get a random color
		var red = randomInRange(0, 255);
		var green = randomInRange(0, 255);
		var blue = randomInRange(0, 255);
		context.fillStyle = `rgb(${red}, ${green}, ${blue})`;

		// get a random location
		var randomX = randomInRange(0, 5);
		var randomY = randomInRange(0, 5);

		context.fillRect(randomX * 100, randomY * 100, 100, 100);

		// show the iterations
		iterations++;
		counter.innerText = 'iterations: ' + iterations;

		// show how long it took
		var currentTime = performance.now() - startTime;
		timer.innerText = 'compute time: ' + currentTime + 'ms';

		// this recursive call will only happen after all (possibly time-consuming)
		// calculations have occurred
		randomSquare();

	}, 100);

};

initializeGrid();
randomSquare();


// THIS WORKS TOO:
// 
// To uncomment this you need to:
// 1. Remove the setTimeout, so randomSquare just looks like the inner callback
// 2. Remove the recursive call to randomSquare
// 3. Remove the initial call to randomSquare (optional)
// 
// (Don't use setInterval unless the timing has to be exact)
// 
// 
// setInterval(function() {
// 	randomSquare();
// }, 100);