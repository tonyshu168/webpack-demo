import * as React from 'react'
import Hello from './components/Hello/index';

export default class App extends React.Component {
  constructor(props:any){
    super(props);
    this.state={}
  }

  render(){
    return (
      <Hello
        name="typescript"
        amout={4}
      />
    )
  }
}