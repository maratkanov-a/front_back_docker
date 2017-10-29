import React from "react";
import $ from "jquery";
import {MultiSelect, SimpleSelect} from "react-selectize";
import Error from "../helpers/error";
import Footer from "../main_elements/footer";
import swal from 'sweetalert'

require('./../../../css/content/__home/home.css');

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        $.getJSON("http://127.0.0.1:8000/users/", (data) => {
            this.setState({
                users: data
            });
        })
    }

    updateState(value) {
        this.setState({
            receivers: value.map(el => {return el.value})
        });
    }

    fromUserUpdate(value) {
        this.setState({
            sender: value
        });
    }

    changeAmount(event) {
        this.setState({
            amount: parseFloat(event.target.value)
        });
    }

    submitForm() {
        let isReceiversValid, isAmountValid, isSenderValid;
        // sender validation
        isSenderValid = !!(this.state.sender);
        if (!isSenderValid) {
            this.setState({
                senderError: <Error message={"There is no sender"}/>
            });
        } else {
            this.setState({
                senderError: ''
            });
        }

        // receivers validation
        isReceiversValid = !!(this.state.receivers && this.state.receivers.length > 0);
        if (!isReceiversValid) {
            this.setState({
                receiversError: <Error message={"There is no receivers"}/>
            });
        } else {
            this.setState({
                receiversError: ''
            });
        }

        // amount validation
        isAmountValid = !!(this.state.amount);
        if (!isAmountValid) {
            this.setState({
                amountError: <Error message={"There is no amount"}/>
            });
        } else {
            this.setState({
                amountError: ''
            });
        }

        if (isReceiversValid && isAmountValid && isSenderValid) {
            $.ajax({
                url: `http://127.0.0.1:8000/users/${this.state.sender.value}/`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    from: this.state.sender.value,
                    users: this.state.receivers,
                    amount: this.state.amount
                }),
                error: function(error) {
                    swal("Error", error.responseJSON.error, "error");
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="content__home">
                        <div className="offset-by-four four columns">
                            <div className="row content__home__selector_margin">
                                <label  htmlFor="summary">Sender</label>
                                { !this.state.isSenderValid ? this.state.senderError : null }
                                <SimpleSelect
                                    placeholder="Choose sender"
                                    options = {this.state.users.map(
                                        userJson => ({label: userJson.username, value: userJson.id})
                                    )}
                                    onValueChange={value => this.fromUserUpdate(value)}
                                />
                            </div>
                            <div className="row content__home__selector_margin">
                                <label  htmlFor="summary">Receivers</label>
                                { !this.state.isReceiversValid ? this.state.receiversError : null }
                                <MultiSelect
                                    placeholder = "Choose inn to send"
                                    options = {this.state.users.map(
                                        userJson => ({label: `${userJson.inn}`, value: userJson.inn})
                                    )}
                                    onValuesChange = {value => this.updateState(value)}
                                />
                            </div>
                            <div className="row content__home__selector_margin">
                                <label  htmlFor="summary">Amount to send</label>
                                { !this.state.isAmountValid ? this.state.amountError : null }
                                <input id="summary" className="u-full-width" type="text" onChange={this.changeAmount.bind(this)}/>
                            </div>
                            <div className="row content__home__selector_margin">
                                <button className="content__home__button_white" onClick={this.submitForm.bind(this)} type="submit">Send</button>
                            </div>
                        </div>
                    <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}