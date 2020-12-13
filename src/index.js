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
import { add, increment } from './other.js';
console.log(json, add(2, 3));
console.log(increment( 5 ));

import axios from 'axios';

axios.get('/api/info').then(res => { 
  console.log(res)
})

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.getElementById('root').appendChild(btn);

btn.onclick = function() {
  const div = document.createElement('div');
  div.innerHTML = 'item';
  document.getElementById('root').appendChild(div);
}