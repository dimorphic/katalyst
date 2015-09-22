define(function(require){
	'use strict';

	// deps
	var $ = require('jquery');
	var helpers = require('common/helpers');
	var stats = require('common/stats');

	// model
	var Memory = require('models/Memory');

	// performance
	var FPSmon = stats.createMeter('fps', { top: 0, left: 0 });

	//
	//	HAL
	//
	var Brain = function(element) {
		this.canvas = null;
		this.memory = null;

		this.cells = [];

		// animation options
		this.animation = {
			// play with this!
			alive: 1, // brain is 'alive' (randomize memory activity) ?
			updateMode: 0,		// 0 - full memory
								// 1 - single memory

			// animation settings
			useRAF: true,		// steroids mode on?
			updateDelay: 1000,	// ignored if RAF true, slowpoke

			// trackers
			updateTimer: null	// update timer (raf / interval)
		};

		// init
		this.boot(element);
	};

	//
	//	Brain boot
	//
	Brain.prototype.boot = function(element) {
		console.log('[Brain] Booting @ ' + element + ' ...');

		// setup & attach to canvas
		this.attach(element);

		// #debug
		// create new Memory
		this.memory = new Memory({ updateMode: 0 });

		// go dream
		this.dream();
	};

	//
	//	Brain attach helper
	//
	Brain.prototype.attach = function(el) {
		var cvs = document.querySelector(el);

		if (!cvs || !cvs.getContext) {
			throw new Error('Need a canvas element bro!');
		}

		// set canvas to full window size
		cvs.width = window.innerWidth;
		cvs.height = window.innerHeight;

		// set pointers
		this.canvas = cvs;
		this.ctx = cvs.getContext('2d');

		// set composite operation
		// this.ctx.globalCompositeOperation = 'lighter';

		// handle window resize
		window.addEventListener('resize', this.onScreenResize.bind(this));
	};

	Brain.prototype.onScreenResize = function() {
		console.log('[Brain] screen resize!', this.memory.grid.maxCells);

		// cancel animation
		if (this.animation.useRAF) {
			window.cancelRequestAnimFrame(this.animation.updateTimer);
		} else {
			clearInterval(this.animation.updateTimer);
		}

		// reboot memory
		this.memory.boot();

		// restart dream / animation
		setTimeout(function() {
			this.dream();
		}.bind(this), 300);
	};

	//
	//	Brain dream memory
	//
	Brain.prototype.dream = function() {
		// console.log('[Brain] Dreaming ', this.memory.cells.length, ' cells...');

		// start animation
		if (this.animation.useRAF) {
			this.animation.updateTimer = window.requestAnimFrame(this.render.bind(this));
		} else {
			this.animation.updateTimer = setInterval(this.render, this.animation.updateDelay);
		}

		// randomize memory activity
		if (this.animation.alive) {
			setInterval(function() {
				this.memory.generateNoise();
			}.bind(this), 2000);
		}
	};

	Brain.prototype.paintGrid = function() {
		// draw vertical lines
		for (var x = 0.5; x < this.canvas.width; x += this.memory.cellSize) {
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.canvas.height);
		}

		// draw horizontal lines
		for (var y = 0.5; y < this.canvas.height; y += this.memory.cellSize) {
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.canvas.width, y);
		}

		// paint grid
		this.ctx.strokeStyle = '#444';
		this.ctx.stroke();
	};

	Brain.prototype.paintCell = function(cell) {
		// start new path
		this.ctx.beginPath();

		// set color and draw rect
		this.ctx.fillStyle = cell.fill.bgColor;
		this.ctx.fillRect(cell.x, cell.y, cell.size, cell.size);

		// draw text
		this.ctx.font = '14px Exo';
		this.ctx.textBaseline = 'middle';

		var textX = cell.x + (cell.size / 2) - (this.ctx.measureText(cell.query).width / 2);
		var textY = cell.y + (cell.size / 2);

		this.ctx.fillStyle = cell.fill.textColor;
		this.ctx.fillText(cell.query, textX, textY);
	};

	//
	//
	//
	Brain.prototype.update = function() {
		// console.log('[Brain] Updating memory...');

		// update memory
		this.memory.update();
	};

	Brain.prototype.draw = function() {
		// console.log('[Brain] Draw memory...');

		// clear canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// #debug
		for (var idx = 0; idx < this.memory.cells.length; idx++) {
			var cell = this.memory.cells[idx];
			this.paintCell(cell);
		}
	};

	//
	//
	//
	Brain.prototype.render = function() {
		// console.log('[Brain] Render...', this.animation);

		// request another frame?
		if (this.animation.useRAF) {
			this.animation.updateTimer = window.requestAnimFrame(this.render.bind(this));
		}

		FPSmon.begin();

		// update
		this.update();

		// render
		this.draw();

		FPSmon.end();
	};

	// expose
	return Brain;
});
