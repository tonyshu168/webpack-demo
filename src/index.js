// index.js
import '@babel/polyfill';

import React, { Components } from 'react';
import ReactDom from 'react-dom';

function App() {
  return <div>Hello react</div>
}

ReactDom.render(<App />, document.getElementById('root'));