// index.js
import '@babel/polyfill';

import css from './index.css';
import './index.less';

import pic from '../public/images/png01.png';

const img = new Image();
img.src = pic;
img.classList.add('logo');
document.getElementById('root').append(img);

const json = require('./index.json');
import { add } from './other.js';
console.log(json, add(2, 3));
