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
	//	Animation MIXIN
	//
	var animMixin = {
		// animation options
		animation: {
			// play with this!
			randomizeMemoryNoise: 1, // randomize memory activity?
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
			var newMemory = Memory.createFullMemory(this.state.cellsSize, this.animation.cellsCount.maxCells);

			// add noise to memory cells
			newMemory = this.buildNoiseMap(newMemory);

			// ...and update it
			this.setState({ brainCells: newMemory });
		},

		buildNoiseMap: function(memoryCells) {
			// reset noise
			this.animation.noise = new Noise(Math.random());

			// add noise to memory cells
			memoryCells.forEach(function(memoryCell, idx) {
				var cellPosition = this.getCellIndex(memoryCell.id);
				memoryCell.noise = this.getCellNoise(cellPosition);
			}.bind(this));

			return memoryCells;
		},

		redraw: function() {
			// request another frame?
			if (this.animation.useRAF) {
				this.animation.updateTimer = window.requestAnimFrame(this.redraw);
			}

			if (this.animation.updateMode) {
				this.updateSingleMemory();
			} else {
				this.updateMultipleMemories();
			}
		}
	};

	//
	//	Cells MIXIN
	//
	var cellsMixin = {
		getCellIndex: function(cellId) {
			var rowIndex = null;
			var colIndex = null;

			// find row index
			for (var currentRow = 1; currentRow <= this.animation.cellsCount.maxRows; currentRow++) {
				var max = currentRow * this.animation.cellsCount.maxCols;

				if (cellId < max) {
					rowIndex = currentRow;
					break;
				}
			}

			// find col index
			colIndex = cellId - (this.animation.cellsCount.maxCols * (rowIndex - 1));

			return {
				colIndex: colIndex,
				rowIndex: rowIndex
			};
		},

		getCellNoise: function(cellPosition) {
			var noise = this.animation.noise;

			var cellValue = noise.perlin2(cellPosition.colIndex / 15, cellPosition.rowIndex / 15);
			var cellPercent = Math.floor(((cellValue + 1) / 2) * 100);

			return cellPercent;
		}
	};

	//
	// Brain component
	//
	var Brain = React.createClass({
		mixins: [animMixin, cellsMixin],

		getInitialState: function() {
			return {
				// cells size
				cellsSize: 25,

				brainCells: []
			};
		},

		componentWillMount: function() {


			//





			// get cells max count
			this.animation.cellsCount = Memory.getCellsCount(this.state.cellsSize);

			this.buildMemory();

			// randomize memory activity
			if (this.animation.randomizeMemoryNoise) {
				setInterval(function() {
					this.buildNoiseMap(this.state.brainCells);
				}.bind(this), 7000);
			}
		},

		componentDidMount: function() {
			// handle window resize
			window.addEventListener('resize', this.onScreenResize);

			// start animation (rebuild memory)
			if (this.animation.useRAF) {
				this.redraw();
			} else {
				this.animation.updateTimer = setInterval(this.redraw, this.animation.updateDelay);
			}
		},

		onScreenResize: function() {
			// recount max cells
			this.animation.cellsCount = Memory.getCellsCount(this.state.cellsSize);

			// rebuild memory
			this.buildMemory();
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
						{this.animation.cellsCount.maxCols + ' x ' + this.animation.cellsCount.maxRows}
					</div>

					<ul>
						{cells}
					</ul>
				</div>
			);
		},

		updateSingleMemory: function() {
			console.log('!! updating single memory');

			// grab random brain cell
			var randomCell = this.state.brainCells[Math.floor(Math.random() * this.state.brainCells.length)];

			// generate random memory
			var newMemory = Memory.createSingleMemory();

			// assign new query 'activity'
			randomCell.query = newMemory.query;

			this.setState({ brainCells: this.state.brainCells });
		},

		updateMultipleMemories: function() {
			var maxCells = parseInt(this.state.brainCells.length / 5);
			var activeCells = ~~(Math.random() * maxCells) + 1;

			console.log('!! updating multiple memories ', maxCells, activeCells);

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
