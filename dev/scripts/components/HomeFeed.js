import React from 'react';
import TextPost from "./TextPost.js";
import ImagePost from "./ImagePost.js";
import PollPost from "./PollPost.js";

// setState and render posts as the getPost loop runs?
// refactor this

export default class HomeFeed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
		}
	}
	handleLogout() {
		this.props.userLogout();
	}
	renderFeedPost(post) {
		switch(post.type) {
			case "text":
				return (
					<TextPost
					currPost={post}
					currUser={this.props.currUser} />
				)
			case "image":
				return (
					<ImagePost
					currPost={post}
					currUser={this.props.currUser} />
				)
			case "poll":
				return (
					<PollPost
					currPost={post}
					currUser={this.props.currUser} />
				)
		}
	}
	render() {
		return (
			<div className="wrapper">
				{this.state.posts.map((post) => {
					return this.renderFeedPost(post);
				})}
			</div>
		)
	}
	componentDidMount() {
		var userId = this.props.currUser.uid;
		var postsRef = firebase.database().ref("posts/");
		var userRef = firebase.database().ref("users/"+userId);
		postsRef.on("value", (snapshot) => {
			var allPosts = snapshot.val();
			var userPosts = [];
			for (let key in allPosts) {
				if (allPosts[key].user.id == userId) {
					userPosts.push(allPosts[key]);
				}
			}
			this.setState({
				posts: userPosts
			});
		}); 
	}
}