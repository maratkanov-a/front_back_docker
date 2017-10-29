import React from 'react'

require('./../../../css/header/header.css');

export default class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="logo three columns">
                    </div>
                </div>
            </header>
        )
    }
}