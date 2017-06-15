import React from 'react';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			postType: "text",
			privacySetting: "public"
		}
	}
	deletePost(path) {
		const userRef = firebase.database().ref(userId);
		const todoRef = firebase.database().ref(`${userId}/${key}`);
		todoRef.remove();
	}
	changePrivacy(privacy, path) {
		switch(privacy) {
			case("public"):
				break;
			case("friends"):
				break;
			case("private"):
				break;
		}
		const userRef = firebase.database().ref(userId);
		const todoRef = firebase.database().ref(`${userId}/${key}`);
		todoRef.remove();
	}
	privacySelection() {
		if (this.props.currUser.name === this.props.author.name) {
			return (
				<div className="post-control">
					<div className="privacy-settings">
						<button onClick={this.changeType("public")}>Public</button>
						<button onClick={this.changeType("friends")}>Friends</button>
						<button onClick={this.changeType("private")}>Private</button>
					</div>
					<button onClick={this.delete(author)}>Delete</button>
				</div>
			)
		}
	}
	render() {
		switch(this.state.postType) { // if post already exists, populate fields
			case "text":
				return (
					<TextPost
						privacySetting={this.privacySetting}
					/>
				);
			case "image":
				return ( 
					<ImagePost
						privacySetting={this.privacySetting}
					/>
				);
			case "poll":
				return ( 
					<PollPost
						privacySetting={this.privacySetting}
					/>
				);
		}
	}
}