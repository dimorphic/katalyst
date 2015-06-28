define(function(require){
	'use strict';

	// deps
	var React = require('react');
	var helpers = require('helpers');
	var Noise = require('noise');

	// models
	var Memory = require('models/Memory');

	// components
	var Braincell = require('components/Braincell');

	//
	// Brain component
	//
	var Brain = React.createClass({
		getInitialState: function() {
			return {
				// cells size
				cellsSize: 25,

				brainCells: []
			};
		},

		componentWillMount: function() {
			// get cells max count
			this.anim.cellsCount = Memory.getCellsCount(this.state.cellsSize);

			this.buildMemory();

			// randomize memory activity
			if (this.anim.randomizeMemory) {
				setInterval(function() {
					this.buildNoiseMap(this.state.brainCells);
				}.bind(this), 7000);
			}
		},

		componentDidMount: function() {
			// handle window resize
			window.addEventListener('resize', this.onScreenResize);

			// start anim (rebuild memory)
			if (this.anim.useRAF) {
				this.redraw();
			} else {
				this.anim.updateTimer = setInterval(this.redraw, this.anim.updateDelay);
			}
		},

		onScreenResize: function() {
			// recount max cells
			this.anim.cellsCount = Memory.getCellsCount(this.state.cellsSize);

			// rebuild memory
			this.buildMemory();
		},

		getCellIndex: function(cellId) {
			var rowIndex = null;
			var colIndex = null;

			// find row index
			for (var currentRow = 1; currentRow <= this.anim.cellsCount.maxRows; currentRow++) {
				var max = currentRow * this.anim.cellsCount.maxCols;

				if (cellId < max) {
					rowIndex = currentRow;
					break;
				}
			}

			// find col index
			colIndex = cellId - (this.anim.cellsCount.maxCols * (rowIndex - 1));

			return {
				colIndex: colIndex,
				rowIndex: rowIndex
			};
		},

		getCellNoise: function(cellPosition) {
			var noise = this.anim.noise;

			var cellValue = noise.perlin2(cellPosition.colIndex / 15, cellPosition.rowIndex / 15);
			var cellPercent = Math.floor(((cellValue + 1) / 2) * 100);

			return cellPercent;
		},

		render: function() {
			// build cells list
			var cells = this.state.brainCells.map(function(cell) {
				return (
					<Braincell key={cell.name}
								size={cell.size}
								query={cell.query}
								color={cell.color}
								noise={cell.noise} />
				);
			});

			return (
				<div>
					<div className="debug">
						{cells.length}
						<br/>
						{this.anim.cellsCount.maxCols + ' x ' + this.anim.cellsCount.maxRows}
					</div>

					<ul>
						{cells}
					</ul>
				</div>
			);
		},

		// animation options
		anim: {
			// play with this!
			randomizeMemory: 1, // randomize memory activity?
			updateMode: 0,		// 0 - full memory
								// 1 - single memory

			// animation settings
			useRAF: true,		// steroids mode on?
			updateDelay: 1000,	// ignored if RAF true, slowpoke

			// trackers
			updateTimer: null,	// update timer (raf / interval)
			cellsCount: null,	// memory cells counters (max cols / rows)
			noise: null			// noise map
		},

		buildMemory: function() {
			// build memory
			var newMemory = Memory.createFullMemory(this.state.cellsSize, this.anim.cellsCount.maxCells);

			// add noise to memory cells
			newMemory = this.buildNoiseMap(newMemory);

			// ...and update it
			this.setState({ brainCells: newMemory });
		},

		buildNoiseMap: function(memoryCells) {
			// reset noise
			this.anim.noise = new Noise(Math.random());

			// add noise to memory cells
			memoryCells.forEach(function(memoryCell, idx) {
				var cellPosition = this.getCellIndex(memoryCell.id);
				memoryCell.noise = this.getCellNoise(cellPosition);
			}.bind(this));

			return memoryCells;
		},

		redraw: function() {
			// request another frame?
			if (this.anim.useRAF) {
				this.anim.updateTimer = window.requestAnimFrame(this.redraw);
			}

			if (this.anim.updateMode) {
				this.updateSingleMemory();
			} else {
				this.updateMultipleMemories();
			}
		},

		updateSingleMemory: function() {
			// console.log('!! updating single memory');

			// grab random brain cell
			var randomCell = this.state.brainCells[Math.floor(Math.random() * this.state.brainCells.length)];

			// generate random memory
			var newMemory = Memory.createSingleMemory();

			// assign new query 'activity'
			randomCell.query = newMemory.query;

			this.setState({ brainCells: this.state.brainCells });
		},

		updateMultipleMemories: function() {
			var maxCells = parseInt(this.state.brainCells.length / 2);
			var activeCells = ~~(Math.random() * maxCells) + 1;

			// console.log('!! updating multiple memories ', maxCells, activeCells);

			for (var i = 0; i <= activeCells; i++) {
				// grab random brain cell
				var randomCell = this.state.brainCells[Math.floor(Math.random() * this.state.brainCells.length)];

				// generate random memory
				var newMemory = Memory.createSingleMemory();

				// assign new query 'activity'
				randomCell.query = newMemory.query;
			}

			this.setState({ brainCells: this.state.brainCells });
		}

	});

	// expose
	return Brain;
});
