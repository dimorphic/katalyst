define(function(require){
	'use strict';

	// deps
	var React = require('react');

	//
	// Braincell
	//
	var Braincell = React.createClass({
		propTypes: {
			color: React.PropTypes.string,
			noise: React.PropTypes.any,

			size: React.PropTypes.oneOfType([
				React.PropTypes.string,
				React.PropTypes.number
			]),

			query: React.PropTypes.string
		},

		shouldComponentUpdate: function(nextProps, nextState) {
			return nextProps.query !== this.props.query;
		},

		getCellColor: function() {
			var hue, saturation,
				lightness, textLightness;

			var randomness = Math.floor(Math.random() * 25);

			var val = this.props.noise;

			// Hue
			if (val < 70) {
				hue = 200 + (randomness / 2);
			} else {
				hue = 60 - randomness;
			}

			// Lightness
			if (val < 50) {
				lightness = 5;
			} else {
				lightness = val / 1.5 - randomness;
			}

			//Saturation
			saturation = 90;

			// Text lightness
			if (val < 45) {
				textLightness = lightness;
			} else if (val < 80) {
				textLightness = lightness + 10;
			} else {
				textLightness = lightness - 10;
			}

			var bgColor = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
			var textColor = 'hsl(' + hue + ', ' + saturation + '%, ' + textLightness + '%)';

			return {
				bgColor: bgColor,
				textColor: textColor
			};
		},

		render: function() {
			var cellColor = this.getCellColor();

			var style = {
				width: this.props.size,
				height: this.props.size,
				fontSize: (this.props.size * 0.5),

				color: cellColor.textColor,
				backgroundColor: cellColor.bgColor || ''
			};

			return (
				<li className="Braincell" style={style}>{this.props.query}</li>
			);
		}
	});

	// expose
	return Braincell;
});
