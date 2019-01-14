import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Blog extends Component {
  state = {
    author: "",
    content: "",
    comments: [],
    showBlogInput: false
  };

  componentDidMount = async () => {
    let res = await axios.get("/api/blog");
    this.setState({
      comments: res.data
    });
    console.log(this.state.comments);
  };

  createComment = async e => {
    e.preventDefault();

    const { author, content } = this.state;

    const comment = {
      author,
      content
    };

    let res = await axios.post(`/api/blog`, comment);
    console.log(res.data);
    this.setState({
      comments: [...this.state.comments, res.data],
      showBlogInput: false
    });

  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showBlogInput = bool => {
    this.setState({
      showBlogInput: bool
    });
  };


  render() {
    return (
      <div className="column" style={{ padding: "15px 5px 5px 5px" }}>
        <div
          style={{ fontSize: "50px" }}
          className="ui grey center aligned huge header"
        >
          Original Graphics
        </div>

        <div className='ui grid segment container'>
          <div className='sixteen wide column'>
            {this.state.showBlogInput ? (
              <div>
                <div style={{ paddingBottom: "10px" }} className="ui form">
                  <div
                    onClick={this.createComment}
                    className="ui large teal button"
                  >
                    Submit
                    </div>
                  <div
                    onClick={this.showBlogInput.bind(this, false)}
                    className="ui large red button"
                  >
                    Cancel
                    </div>
                  <div className='ui stacked segment'>
                    <div className='two fields'>
                      <div className="field">
                        <textarea
                          rows='3'
                          name="content"
                          onChange={this.onInputChange}
                          type="text"
                          placeholder="Content"
                        />
                      </div>
                      <div className="field">
                        <input
                          name="author"
                          onChange={this.onInputChange}
                          type="text"
                          placeholder="Author"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
                <div>
                  <div style={{ paddingBottom: "10px" }}>
                    <div
                      onClick={this.showBlogInput.bind(this, true)}
                      className="ui large teal button"
                    >
                      Create Blog
                  </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        <div className="ui text container">
          <div className="ui comments">
            {this.state.comments.map(comment => {
              return (
                <div className="comment" key={comment._id}>
                  <div className="content">
                    <Link to="/" className="author">
                      {comment.author}
                    </Link>
                    <div className="metadata">
                      <span className="date">{comment.dateCreated}</span>
                    </div>
                    <div className="text">{comment.content}</div>
                    <div className="actions">
                      <a href="" className="reply active">
                        Reply
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }
}
export default Blog;