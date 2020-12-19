import * as React from 'react'
// import { tsImportEqualsDeclaration } from '@babel/types';

export interface ChildProps {
  amout: number,
  name: string
}
export default class Hello extends React.Component<ChildProps, {}> {
  constructor(props:any){
    super(props);
    this.state={}
  }

  render(){
    return (
      <div>{this.props.amout}{this.props.name}</div>
    )
  }
}