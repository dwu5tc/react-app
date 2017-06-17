import React from 'react';
import TextPost from "./TextPost.js";
import ImagePost from "./ImagePost.js";
import PollPost from "./PollPost.js";

// POSTS WHICH ARE THE USERS

export default class HomeFeed extends React.Component {
	constructor(props) {
		super(props);
		// this.convertPosts = this.convertPosts.bind(this);
		this.state = {
			posts: [],
		}
	}
	handleLogout() {
		this.props.userLogout();
	}
	getPosts() {
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
		console.log("HOMEFEED");
		return (
			<div className="wrapper">
				{this.state.posts.map((post) => {
					return this.renderFeedPost(post);
				})}
			</div>
		)
	}
	componentDidMount() {
		this.getPosts(); 
	}

	// CANT THIS BE FIXED????
	/*
	getPostsRecursive() {
		var userId = this.props.currUser.uid;
		var userRef = firebase.database().ref("users/"+userId);
		var postsArray = userRef.child("posts").once("value").then((snapshot) => {
			postsArray = snapshot.val();
		});
	}
	convertPostsRecrusive(posts, i) {
		console.log(i);
		console.log(posts[i]);
		if (!posts[i]) {
			return [];
		}
		else {
			// var temp = [];
			// var returned = this.convertPosts(posts, i+1);
			// if (returned != undefined) {
			// 	temp.push(returned);
			// }
			// var (this.convertPosts(posts, i+1) != undefined) {

			// }
			// var temp = this.convertPosts(posts, i+1);
			firebase.database().ref("posts/"+posts[i]).once("value").then((snapshot) => {
				// console.log(snapshot.val());
				// temp.push(snapshot.val());
				// console.log(temp);
				var temp = [];
				temp = this.convertPosts(posts, i+1).push(snapshot.val());
				return temp;
			});
		}
	}*/
}