import React from 'react';
import CreatePost from "./CreatePost.js";
import HomeFeed from "./HomeFeed.js";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.postCreate = this.postCreate.bind(this);
		this.postSubmitted = this.postSubmitted.bind(this);
		this.state = {
			posts: [],
			creatingPost: false 
			// add pagination
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
		if (this.state.creatingPost) {
			return (
				<section className="creating-post">
					<div className="new-post">
						<CreatePost 
						currUser={this.props.currUser}
						handleSubmitPost={this.postSubmitted} />
					</div>
				</section>
			);
		}
		else {
			return (
				<section className="home">
					<button className="btn btn--new-post" onClick={this.postCreate}><i className="fa fa-plus-circle" aria-hidden="true"></i>New Post</button>
					<HomeFeed 
					currUser={this.props.currUser}/>
				</section>
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

	// idk() {
	// 	<div className="home__all-posts">
	// 		{this.state.posts.map((post) => this.renderPost(post))}
	// 	</div>
	// }
}