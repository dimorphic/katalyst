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

			size: React.PropTypes.oneOfType([
				React.PropTypes.string,
				React.PropTypes.number
			]),

			query: React.PropTypes.string
		},

		render: function() {
			var style = {
				width: this.props.size,
				height: this.props.size,
				fontSize: (this.props.size * 0.7),
				backgroundColor: this.props.color || ''
			};

			return (
				<li className="Braincell" style={style}>{this.props.query}</li>
			);
		}
	});

	// expose
	return Braincell;
});
