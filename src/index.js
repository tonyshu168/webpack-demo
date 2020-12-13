// index.js
import css from './index.css';
import './index.less';
const json = require('./index.json');
import { add } from './other.js';
console.log(json, add(2, 3));
