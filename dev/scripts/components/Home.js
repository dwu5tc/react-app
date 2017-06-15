import React from 'react';
import CreatePost from "./CreatePost.js";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.postCreate = this.postCreate.bind(this);
		this.postSubmitted = this.postSubmitted.bind(this);
		this.state = {
			user: this.props.currUser,
			posts: [],
			creatingPost: false 
			// add pagination
			// https://firebase.google.com/docs/database/admin/retrieve-data 
		}
	}
	postCreate() {
		this.setState({
			creatingPost: true
		});
	}
	postSubmitted() {
		this.setState({
			creatingPost: false
		});
	}
	renderPost(post) {
		switch(post.type) {
			case "text":
				return (
					<div className="post post--text">
						<h3>{post.title}</h3>
						<span>{post.content}</span>
					</div>
				);
			case "image":
				return (
					<div className="post post--image">
						<h3>{post.title}</h3>
						<div className="image__container">
							<img src={`${post.url}`} alt=""/>
						</div>
					</div>
				);
			case "poll":
				var totalVotes = 0;
				for (let i = 0; i < post.options.length; i++) {
					totalVotes += post.options[i].votes;
				}
				return <p>{totalVotes}</p>
				return (
					<div className="post post--poll">
						<h3>{post.question}</h3>
							{post.options.map((option) => {
								return (
									<div className="poll-content">
										<div className="poll-option">
											<span>{option.option}</span>
										</div>
										<div className="poll-option__bar" style={{width: `${option.votes/totalVotes*100}%`}}></div>
										<span>{option.votes}</span>
									</div>
								)
							})}
					</div>
				);
		}
	}
	render() {
		console.log("ASKLGASL:G", this.state.creatingPost)
		if (this.state.creatingPost) {
			return (
				<div className="new-post">
					<CreatePost 
					currUser={this.props.currUser}
					handleSubmitPost={this.postSubmitted} />
				</div>
			);
		}
		else {
			return (
				<div className="home">
					<button onClick={this.postCreate}>+ New Post</button>
					<div className="home__all-posts">
						{this.state.posts.map((post) => this.renderPost(post))}
					</div>
				</div>
			);
		}
			
	}
	componentDidMount() {
		// const userId = this.state.user.uid;
		// const userRef = firebase.database().ref(userId);
		// const postsRef = firebase.database.ref(userId+"/posts")
		// postsRef.on("value", (snapshot) => {
		// 	const dbPosts = snapshot.val();
		// 	conss.postCreates = [];
		// 	for (let post in dbPosts) {
		// 		if (post.author == )
		// 	}
		// }) 
	}
}