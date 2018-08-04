import React, { Component } from 'react';
import Header from '../layout/Header';
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
        <div>
            <Header />
            <h1>Your Login</h1>
        </div>
    )
  }
}

export default connect()(Home);


