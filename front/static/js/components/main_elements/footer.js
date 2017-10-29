import React from 'react'
import $ from 'jquery'

require('./../../../css/footer/footer.css');

export default class Footer extends React.Component {
    constructor() {
        super();
        this.backgroundLink = 'https://i.giphy.com/l2Jeai4sW0NCl4cla.gif';
        this.state = {
            buttonText: "DESIGN OFF"
        }
    }

    backgroundChange() {
        const body = $('body');

        if (body.css('backgroundImage').indexOf(this.backgroundLink) > 0) {
            body.css('backgroundImage', `url()`);
            this.setState({
                buttonText: "DESIGN ON"
            });
        } else {
            body.css('backgroundImage', `url(${this.backgroundLink})`);
            this.setState({
                buttonText: "DESIGN OFF"
            });
        }
    }

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="twelve columns">
                        <button className="footer__button_white" onClick={this.backgroundChange.bind(this)}>{this.state.buttonText}</button>
                    </div>
                </div>
            </footer>
        )
    }
}