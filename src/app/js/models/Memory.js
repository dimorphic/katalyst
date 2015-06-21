define(function(require){
	'use strict';

	// deps
	var helpers = require('helpers');

	//
	// get max cells helper
	//
	var _getMaxCells = function(cellSize) {
		var cellsX = Math.floor(window.innerWidth / cellSize);
		var cellsY = Math.floor(window.innerHeight / cellSize);

		var maxCells = cellsX * cellsY;

		return maxCells;
	};

	//
	// build FULL memory helper
	//
	var _buildFullMemory = function(cellSize, cellsCount) {
		if (!cellSize || !cellsCount) {
			console.log('cell size&count: ', cellSize, cellsCount);
			throw new Error('Need cell size & count bro!');
		}

		// console.log('Building memory of ', cellsCount, ' cells...');

		var memoryData = [];
		for (var i = 0; i < cellsCount; i++) {
			memoryData.push({
				id: i,
				name: 'memory' + i,
				size: cellSize,
				query: helpers.getRandomChar(),
				color: helpers.getRandomColor()
			});
		}

		return memoryData;
	};

	//
	// build SINGLE memory helper
	//
	var _buildSingleMemory = function() {
		console.log('Building single memory...');

		// return random memory query & color
		return {
			query: helpers.getRandomChar(),
			color: helpers.getRandomColor()
		};
	};

	// expose
	return {
		getMaxCells: _getMaxCells,
		createSingleMemory: _buildSingleMemory,
		createFullMemory: _buildFullMemory
	};
});
