import Post from "./Post.js";
import React from 'react';

export default class ImagePost extends Post {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render() {
		return (
			<div className="post image-post">
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
						<div className="post__main__image-container">
							<img src={this.props.currPost.imagePath} alt="" />
						</div>
						{(this.props.currPost.caption) && 
						<div className="post__main__image-caption">
							<p>{this.props.currPost.caption}</p>
						</div>}
					</div>
				</div>
				{this.props.currUser.uid != this.props.currPost.user.id && 
					this.renderEngagementSection()}
			</div>
		)
	}
}