import React from "react";

require('./../../../css/content/__login_form/login_form.css');

export default class Login extends React.Component {
    render() {
        return (
            <div className="container">
                <div>
                    <div className="offset-by-four four columns">
                        <div className="content__login_border">
                            <form className="content__login_form" action="#">
                                <div className="row">
                                    <label htmlFor="emailInput">Email</label>
                                    <input className="u-full-width" type="email" placeholder="lala@gmail.com" id="emailInput"/>
                                </div>
                                <div className="row">
                                    <label htmlFor="passwordInput">Пароль</label>
                                    <input className="u-full-width" type="password" placeholder="Секретный пароль" id="passwordInput"/>
                                </div>
                                <div className="row">
                                    <input className="u-full-width button-primary" type="submit" value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}