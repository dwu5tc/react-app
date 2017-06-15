import React from 'react';

export default class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.convertPosts = this.convertPosts.bind(this);
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
		var userRef = firebase.database().ref("users/"+userId);
		var postsArray = userRef.child("posts").once("value").then((snapshot) => {
			postsArray = snapshot.val();
			this.setState({
				posts: this.convertPosts(postsArray, 0)
			});
		});
	}
	convertPosts(posts, i) {
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
	}
	componentDidMount() {
		this.getPosts(); // don't want to set state every time a single post is pulled, set state once after pulling all initial
	}
}