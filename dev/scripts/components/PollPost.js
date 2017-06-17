import Post from "./Post.js";
import React from 'react';

export default class PollPost extends Post { //props are question, and 
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render() {
		return (
			<div className="post poll-post">
				<div className="post__author">
					<div className="post__author__image-container">
						<img src={`${this.props.currPost.user.photo}`} alt="" />
					</div>
				</div>
				<div className="post__content">
					<div className="post__header">
						<p>{this.props.currPost.user.name}</p>
						<p>{this.props.currPost.date}</p>
						{Post.prototype.renderHeaderDiv(this.props.currUser, this.props.currPost)}
					</div>
					<div className="post__main">
						<h3>{this.props.currPost.pollQuestion}</h3>
						{}
					</div>
				</div>
			</div>
		)
	}
}