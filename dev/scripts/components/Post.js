import React from 'react';

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	renderHeaderDiv(user, post) {
		if (user.uid == post.user.id) {
			return (
				<div className="header-icon">
					<button onClick={() => this.deletePost(post.key)}><i className="fa fa-times" aria-hidden="true"></i></button>
				</div>
			)
		}
		if (!(post.likes) || post.likes < 1) { // can be removed after probably
			return (
				<div className="header-icon">
					<button onClick={() => this.toggleLike(user.uid, post.key)}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
				</div>
			)
		}
		if (post.likes.includes(user.uid)) {
			return (
				<div className="header-icon">
					<span>{post.likes.length}</span>
					<button onClick={() => this.toggleLike(user.uid, post.key)}><i className="fa fa-heart" aria-hidden="true"></i></button>
				</div>
			)
		} 
		else {
			return (
				<div className="header-icon">
					<span>{post.likes.length}</span>
					<button onClick={() => this.toggleLike(user.uid, post.key)}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
				</div>
			)
		}
	}
	renderEngagementSection() {
		return (
			<div className="engagement-section">
			</div>
		)
	}
	deletePost(key) {
		const postRef = firebase.database().ref("posts/"+key);
		postRef.remove();
	}
	toggleLike(user, key) {
		const postRef = firebase.database().ref("posts/"+key);
		postRef.child("likes").once("value").then((snapshot) => {
			var temp = snapshot.val();
			if (temp == 0) {
				postRef.update({ likes: [user] });
			}
			else if (temp.includes(user)) {
				temp.splice(temp.indexOf(user), 1);
				if (temp == 0) {
					postRef.update({ likes: 0 });
				}
				else {
					postRef.update({ likes: temp });
				}
			}
			else {
				temp.push(user);
				postRef.update({ likes: temp });
			}
		});
	}
	// privacySelection() {
	// 	if (this.props.user.name == this.props.author.name) {
	// 		return (
	// 			<div className="post-control">
	// 				<div className="privacy-settings">
	// 					<button onClick={this.changeType("public")}>Public</button>
	// 					<button onClick={this.changeType("friends")}>Friends</button>
	// 					<button onClick={this.changeType("private")}>Private</button>
	// 				</div>
	// 				<button onClick={this.delete(author)}>Delete</button>
	// 			</div>
	// 		)
	// 	}
	// }
	render() {
	}
}