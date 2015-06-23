define(function(require){
	'use strict';

	// deps
	var helpers = require('helpers');

	//
	// get cells helper
	//
	var _getCellsCount = function(cellSize) {
		var cellsCols = Math.floor(window.innerWidth / cellSize);
		var cellsRows = Math.floor(window.innerHeight / cellSize);
		var maxCells = cellsCols * cellsRows;

		return {
			maxCells: maxCells,
			maxCols: cellsCols,
			maxRows: cellsRows
		};
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
				query: helpers.getRandomChar()
			});
		}

		return memoryData;
	};

	//
	// build SINGLE memory helper
	//
	var _buildSingleMemory = function() {
		// console.log('Building single memory...');

		// return random memory query & color
		return {
			query: helpers.getRandomChar()
		};
	};

	// expose
	return {
		getCellsCount: _getCellsCount,
		createSingleMemory: _buildSingleMemory,
		createFullMemory: _buildFullMemory
	};
});
