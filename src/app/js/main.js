// styles test
import 'scss/main.scss';

const canvas = document.querySelector('#cvs');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = '#0f0';
ctx.fillRect(30, 30, 100, 100);
