/* eslint-disable react/prop-types */
import { Component } from "react";

export default class Count extends Component {
    constructor(props) {
      super(props);
    }
    
    
    render() {
        return (
            <div className="count">
                Amount of tasks: {this.props.tasks.length}
            </div>
        )
    }
}