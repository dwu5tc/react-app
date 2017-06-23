import Post from "./Post.js";
import React from 'react';

export default class PollPost extends Post { 
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
		}
	}
	pushVote(index) {
		var user = this.props.currUser.uid;
		const postRef = firebase.database().ref("posts/"+this.props.currPost.key);
		postRef.child("options").once("value").then((snapshot) => {
			var temp = snapshot.val();
			for (let i = 0; i < temp.length; i++) { // unvote first
				if (temp[i].votes == 0 || typeof temp[i].votes == "number") { // can remove typeof after
					continue;
				}
				else if (temp[i].votes.includes(user)) {
					temp[i].votes.splice(temp[i].votes.indexOf(user), 1);
					if (temp[i].votes == 0) {
						postRef.child("options/"+i).update({ votes: 0 });
					}
					else {
						postRef.child("options/"+i).update({ votes: temp[i].votes });
					}
					break;
				}
			}
			if (temp[index].votes == 0 || typeof temp[index].votes == "number") {
				postRef.child("options/"+index).update({ votes: [user] })
			}
			else {
				temp[index].votes.push(user);
				postRef.child("options/"+index).update({ votes: temp[index].votes })
			}
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.pushVote(this.state.index);
		this.setState({
			hasVoted: true
		})
	}
	selectOption(index) {
		this.setState({
			index: index
		});
	}
	reselectOption(index) {
		this.setState({
			hasVoted: false
		})
	}
	renderPollButton(option, index) {
		if (option.option != "") {
			if (index == this.state.index) {
				return (
					<button className="btn btn--selected" onClick={() => {this.selectOption(index)}}><span>{option.option}</span></button>
				)
			}
			else {
				return (
					<button className="btn" onClick={() => {this.selectOption(index)}}><span>{option.option}</span></button>
				)
			}
		}
	}
	renderUnvotedPoll() {
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
						<h2>{this.props.currPost.question}</h2>
						<div className="poll-options">
							{this.props.currPost.options.map((option, index) => {
								return this.renderPollButton(option, index);
							})}
							<button className="btn btn--submit" onClick={this.handleSubmit}><span>Submit</span></button>
						</div>
					</div>
				</div>
				{/*this.renderEngagementSection()*/}
			</div>
		)
	}
	renderPollOption(option, b) {
		var a = option.votes.length;
		if (option.option != "") {
			if (a == 0 || typeof a != "number") { 
				var width = 1;
				a = 0;
			}
			else { 
				var width = (a/b*100)+1; 
			}
			return (
				<div className="poll-option">
					<p>{option.option} ({a}/{b})</p>
					<div className="poll-option__bar" style={{width: `${width}%`}}></div>
				</div>
			)
		}
	}
	renderVotedPoll() {
		var totalVotes = 0;
		for (let i = 0; i < this.props.currPost.options.length; i++) {
			if (this.props.currPost.options[i].option != "") {
				if (typeof this.props.currPost.options[i].votes.length == "number") {
					totalVotes += this.props.currPost.options[i].votes.length;
				}
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
						<h2>{this.props.currPost.question}</h2>
						<div className="poll-container">
							{this.props.currPost.options.map((option) => {
								return this.renderPollOption(option, totalVotes); // why do i have to return if im using an arrow function???
							})}
						</div>
						<button className="btn btn--revote" onClick={() => {this.reselectOption()}}><span>Revote</span></button>
					</div>
				</div>
				{/*this.renderEngagementSection()*/}
			</div>
		)
	}
	render() {
		if (this.state.hasVoted) { // has voted
			return this.renderVotedPoll();
		}
		else if (this.state.index) { // user has voted but wants to revote; index exists
			return this.renderUnvotedPoll();
		}
		else { // vote has not been checked (first time rendering)
			return this.renderUnvotedPoll();
		}
	}
	componentDidMount() {
		for (let i = 0; i < this.props.currPost.options.length; i++) {
			if (this.props.currPost.options[i].votes == 0 || typeof this.props.currPost.options[i].votes == "number") { // no votes
				continue;
			}
			else if (!this.props.currPost.options[i].votes.includes(this.props.currUser.uid)) { // unvoted by currUser
				continue;
			}
			else { // has voted
				this.setState({
					index: i,
					hasVoted: true
				});
			}
		} 
	}
}