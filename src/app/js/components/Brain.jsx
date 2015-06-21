define(function(require){
	'use strict';

	// deps
	var React = require('react');
	var helpers = require('helpers');

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
				cellsSize: 20,
				maxCells: null,

				brainCells: []
			};
		},

		componentWillMount: function() {
			this.state.maxCells = Memory.getMaxCells(this.state.cellsSize);
			this.updateMemory();
		},

		componentDidMount: function() {
			// handle window resize
			window.addEventListener('resize', this.handleResize);

			// rebuild memory
			if (this.anim.useRAF) {
				this.redraw();
			} else {
				this.anim.updateTimer = setInterval(this.redraw, this.anim.updateDelay);
			}
		},

		render: function() {
			// build cells list
			var cells = this.state.brainCells.map(function(cell) {
				return (
					<Braincell key={cell.name}
								size={cell.size}
								query={cell.query}
								color={cell.color} />
				);
			});

			return (
				<div>
					<ul>
						{cells}
					</ul>
				</div>
			);
		},

		// animation options
		// (hint: check mode param)
		anim: {
			useRAF: true,
			updateDelay: 1000, // ignored if rAF true
			updateTimer: null, // update tracker

			mode: 0 // 0 - full memory
					// 1 - single memory
		},

		redraw: function() {
			// request another frame?
			if (this.anim.useRAF) {
				this.anim.updateTimer = window.requestAnimFrame(this.redraw);
			}

			if (this.anim.mode) {
				this.updateSingleMemory();
			} else {
				this.updateMemory();
			}
		},

		updateMemory: function() {
			// console.log('Building ', this.state.maxCells, ' cells sizes...');

			// build memory
			var newMemory = Memory.createFullMemory(this.state.cellsSize, this.state.maxCells);

			// ...and update it
			this.setState({ brainCells: newMemory });
		},

		updateSingleMemory: function() {
			var newMemory = Memory.createSingleMemory();

			// grab random brain cell
			var randomCell = this.state.brainCells[Math.floor(Math.random() * this.state.brainCells.length)];

			randomCell.query = newMemory.query;
			randomCell.color = newMemory.color;

			this.setState(this.state);
		},

		handleResize: function() {
			this.state.maxCells = Memory.getMaxCells(this.state.cellsSize);
			this.updateMemory();
		}

	});

	// expose
	return Brain;
});
