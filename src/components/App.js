import React from "react";
import {RouteHandler} from "react-router";

export default class App extends React.Component {
  state = { user: USER }

  render () {
    return <div>
      <div className='row'>
        <div className='three colums'>
          <h1> Wicker </h1>
          Login

          PageList
        </div>
        <div className='nine colums'>
          <RouteHandler user={this.state.user} />
        </div>
      </div>
    </div>;
  }
}