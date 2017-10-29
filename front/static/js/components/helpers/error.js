import React from "react";

require('./../../../css/main.css');

export default class Error extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="error">
                {this.props.message}
            </div>
        )
    }
}