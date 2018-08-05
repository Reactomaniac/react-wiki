import React from "react";
import {markdown} from "markdown";
import * as API from "../api";

export default class Section extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getState(props);
  }

  componentWillReceiveProps(nextProps) {
    var state = this.getState(nextProps);

    this.setState(state);
  }

  getState = props => ({
    editing: props.user && props.user.username === props.section.editor,
    content: props.section.content,
    html: props.section.content ? markdown.toHTML(props.section.content) : ""
  })

  render () {
    let content;
    console.log(this.state);
    // let content = <span dangerouslySetInnerHTML={{ __html: this.state.html }} />;
    if (this.state.editing) {
      content = <textarea className="twelve columns"
                          defaultValue={this.state.content}
                          onChange={this.updateContent}
                          onBlur={this.save}/>;
    } else {
      content = <span dangerouslySetInnerHTML={ { __html: this.state.html } } />
    }

    let classes = ["row", "section"];

    if (this.state.editing) classes.push("editing");
    if (this.props.user) classes.push("editable");

    return <section onClick={this.startEditing} className={ classes.join(" ")}>
      {content}
    </section>;
  }

  updateContent = evt => this.setState({ content: evt.target.value });

  save = evt => {
    console.log("I am called");
    this.setState({ editing: false });

    API.pages.child(this.props.path).update({
      editor: null,
      content: this.state.content || null
    });
  }

  startEditing = evt => {
    if (!this.props.user || this.state.editing) return;
    this.setState({ editing: true });
    API.pages.child(this.props.path).update({
      editor: this.props.user.username
    })
  }
}