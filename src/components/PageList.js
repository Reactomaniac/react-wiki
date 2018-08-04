import React from "react";
import * as API from "../api";

export default class PageList extends React.Component {
  state = {
    newPageTitle: ""
  }

  render() {
    return <div>
      { this.props.user ?
          <input type="text"
                  className="u-full-width"
                  value={this.state.newPageTitle}
                  placeholder="New Page Title"
                  onChange={this.update}
                  onKeyPress={this.createPage}/> :
                  null
      }
    </div>;
  }

  update = evt => this.setState({ newPageTitle: evt.target.value });
  createPage = evt => {
    if (evt.charCode !== 13) return;
    API.pages.push({ title: this.state.newPageTitle });
    this.setState({ newPageTitle: "" });
  }
}