import React from 'react';
import axios from 'axios';

const API_URL = "https://jsonplaceholder.typicode.com/posts";

class PostApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            id: "",
            userId: "",
            body: "",
            title: "",
        };
    }



//CREATE Operations

createPost = async () => {
    console.log(this.state);
    try{
        const {data:post} = await axios.post(API_URL, {
            userId : this.state.userId,
            title : this.state.title,
            body : this.state.body,
        });
        let posts = [...this.state.posts];
        posts.push(post);
        this.setState({posts , userId:"",title:"",body:""}); 
    }
    catch (err){
        console.log("Error fetching data from server" , err);
    }
};

//READ Operations

getPosts = async () => {
    try{
        const {data} = await axios.get(API_URL);
        this.setState({ posts: data})
    }
    catch (err){
        console.log("Error creating data from server" , err);
    }
};

//Update Operations

updatePost = async () => {
    try{
        const {id,userId,title,body} = this.state;
        const {data:post} = await axios.put(`${API_URL}/${id}` , {
                userId,
                title,
                body,
        });
        const posts = [...this.state.posts];
        const index = posts.findIndex((post) => post.id === id);
        posts[index] = post;
        this.setState({posts , id:"",userId:"",title:"",body:""}); 
    }
    catch (err){
        console.log("Error updating data from server" , err);
    }
};


//Delete Opeartions

deletePost = async (postId) => {
    console.log(postId);
    try{
        await axios.delete(`${API_URL}/${postId}`);
        console.log(`${postId} Deleted  ` );
        let posts = [...this.state.posts];
        posts = posts.filter((post) => post.id !== postId);
        this.setState({posts});
    }
    catch (err){
        console.log("Error deleting data from server" , err);
    }
};



componentDidMount(){
    this.getPosts();
}

handleChange = ({target : { name, value }}) => {
    this.setState({ [name] : value});
};

handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.id)
        this.updatePost();
    else
        this.createPost();
  } 

selectPostToUpdate = (post) => {
    this.setState({...post});
}

render(){
        return (
        <>
            <h3>Post App</h3>
            <form onSubmit={this.handleSubmit} >
          <div>
            <label>User Id : </label>
            <input name = "userId" type="text" value={this.state.userId} onChange={this.handleChange} required/>
          </div>
          <br />
          <div>
          <label>Title :  </label>
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} required/>
          </div>
          <br />
          <div>
          <label>Body : </label>
            <input name="body" type="text" value={this.state.body} onChange={this.handleChange} required/>
          </div>
          <br />
          <div>
              <button type="submit">Submit</button>
          </div>
          <br />
          </form>
            <table>
                <thead>
                <tr>
                <th>PostId</th>
                <th>UserId</th>
                <th>Title</th>
                <th>Body</th>
                <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.posts.map((post,index) => {
                    return (
                        <tr key={index}>
                            <td>{post.id}</td>
                            <td>{post.userId}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td>
                                <button onClick={() => this.selectPostToUpdate(post)}>Update</button>
                                <button onClick={() => this.deletePost(post.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                    })}
                    </tbody>
            </table>
        </>
        )
    }
}

export default PostApp;