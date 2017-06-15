import React from 'react';

export default class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
		}
	}
	handleLogout() {
		this.props.userLogout();
	}
	render() {
		return <h1>Hi</h1>
	}
	getPosts() {
		var userId = this.props.currUser.uid;
		var postsRef = firebase.database().ref("posts/");
		var userRef = firebase.database().ref("users/"+userId);
		postsRef.once("value").then((snapshot) => {
			var allPosts = snapshot.val();
			var userPosts = [];
			for (post in allPosts) {
				if (post.uid == userId) {
					userPosts.push(post);
				}
			}
			// var userPosts = allPosts.filter((post) => {
			// 	return post.uid == UserId;
			// });
			// console.log(allPosts);
			console.log(userPosts);
		});
	}
	componentDidMount() {
		this.getPosts(); // don't want to set state every time a single post is pulled, set state once after pulling all initial
	}
}