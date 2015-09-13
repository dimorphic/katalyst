define(function(require){
	'use strict';

	// deps
	var React = require('react');
	var helpers = require('common/helpers');
	var stats = require('common/stats');

	// models
	var Memory = require('models/Memory');

	// components
	var Braincell = require('components/Braincell');

	// stats meter trackers
	var debugMeters = true;

	var fpsMeter,
		msMeter,
		mbMeter = null;

	//
	//	Animation MIXIN
	//
	var animMixin = {
		// animation options
		animation: {
			// play with this!
			alive: 1, // brain is 'alive' (randomize memory activity) ?
			updateMode: 0,		// 0 - full memory
								// 1 - single memory

			// animation settings
			useRAF: true,		// steroids mode on?
			updateDelay: 1000,	// ignored if RAF true, slowpoke

			// trackers
			updateTimer: null	// update timer (raf / interval)
		},

		update: function() {
			// console.log('update memory!');

			// snapshot current memory
			var snapshot = this.state.memory;

			// update memory
			snapshot.update();

			this.setState({
				memory: snapshot,
				redrawCounter: this.state.redrawCounter + 1
			});
		},

		redraw: function() {
			// console.log('redraw!');

			// benchmark start
			if (debugMeters) {
				fpsMeter.begin();
				msMeter.begin();
				mbMeter.begin();
			}

			// update & render
			this.update();

			// benchmark end
			if (debugMeters) {
				fpsMeter.end();
				msMeter.end();
				mbMeter.end();
			}

			// request another frame?
			if (this.animation.useRAF) {
				this.animation.updateTimer = window.requestAnimFrame(this.redraw);
			}
		}
	};

	//
	//	Brain component
	//
	var Brain = React.createClass({
		mixins: [animMixin],

		getInitialState: function() {
			return {
				memory: null,
				redrawCounter: 0
			};
		},

		componentWillMount: function() {
			// create benchmark meters
			if (debugMeters) {
				fpsMeter = stats.createMeter('fps', { top: 0, left: 0 });
				msMeter = stats.createMeter('ms', { top: 0, left: 80 });
				mbMeter = stats.createMeter('mb', { top: 0, left: 160 });
			}

			// create new memory
			var newMemory = new Memory({
				// cellSize: 30,
				updateMode: this.animation.updateMode
			});

			// set new memory
			this.setState({
				memory: newMemory
			});
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

			// randomize memory activity
			if (this.animation.alive) {
				setInterval(function() {
					this.state.memory.generateNoise();
				}.bind(this), 6600);
			}
		},

		onScreenResize: function() {
			// snapshot current memory
			var snapshot = this.state.memory;

			// rebuild/reboot memory
			snapshot.boot();

			this.setState({
				memory: snapshot
			});
		},

		render: function() {
			var brainCells = null;
			var counter = null;

			if (this.state.memory && this.state.memory.cells) {
				var memory = this.state.memory;

				brainCells = memory.cells.map(function(cell) {
					return (
						<Braincell key={cell.name}
									size={cell.size}
									query={cell.query}
									noise={cell.noise} />
					);
				});

				// cells counter
				counter = brainCells.length;
			}

			return (
				<div>
					<div className="debug">
						cells: {counter}
						<br />
						draw #{this.state.redrawCounter}
					</div>

					<ul>
						{brainCells}
					</ul>
				</div>
			);
		}
	});

	// expose
	return Brain;
});
