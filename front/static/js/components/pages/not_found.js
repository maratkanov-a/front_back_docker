import React from "react";
import { Link } from 'react-router'

export default class NotFound extends React.Component {
    render() {
        return (
            <div className="container">
                Такой страницы нет :( <Link to="/">Вернуться на главную</Link>
            </div>
        )
    }
}