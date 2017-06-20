import Post from "./Post.js";
import React from 'react';

export default class PollPost extends Post { //props are question, and 
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	renderPollOption(option, total) {
		if (option.option != "") {
			if (option.votes == 0) { 
				var width = 1; 
			}
			else { 
				var width = (option.votes/total*100)+1; 
			}
			return (
				<div className="poll-option">
					<p>{option.option} ({option.votes}/{total})</p>
					<div className="poll-option__bar" style={{width: `${width}%`}}></div>
				</div>
			)
		}
	}
	render() {
		var totalVotes = 0;
		for (let i = 0; i < this.props.currPost.options.length; i++) {
			if (this.props.currPost.options[i].option != "") {
				totalVotes += this.props.currPost.options[i].votes;
			}
		}
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
						{console.log(this.props.currPost)}
						<h2>{this.props.currPost.question}</h2>
						<div className="poll-container">
							{this.props.currPost.options.map((option) => {
								return this.renderPollOption(option, totalVotes);
							})}
						</div>
					</div>
				</div>
				{this.props.currUser.uid != this.props.currPost.user.id && 
					this.renderEngagementSection()}
			</div>
		)
	}
}