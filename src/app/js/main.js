// var comp = require('./components/component');
import Comp from './components/component';

// styles test
import 'scss/main.scss';

// bye bye requirejs!
console.log('main.js bro');

var b = 2;
a = 'lol';


const msg1 = Comp.hallo();
const msg2 = Comp.msg;

console.log('msg1: ', msg1);
console.log('msg2: ', msg2);
