import React from "react";

//main components
import Header from './header'
import Footer from './footer'

// main styles
require('./../../../css/lib/normalize.css');
require('./../../../css/lib/skeleton.css');
require('./../../../css/main.css');


// bam styles
require('./../../../css/content/content.css');
require('./../../../css/footer/footer.css');

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <main className="content">
                    {this.props.children}
                </main>
                {/*<Footer/>*/}
            </div>
        );
    }
}