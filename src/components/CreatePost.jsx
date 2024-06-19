import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";

const CreatePost = ()=>{
  const {addPost} = useContext(PostList);
  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event)=>{
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const postreactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value="";
    postTitleElement.current.value="";
    postBodyElement.current.value="";
    reactionsElement.current.value="";
    tagsElement.current.value="";

    fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title:postTitle,
        body:postBody,
        reactions:{likes:postreactions,
          dislikes:100},
        userId:userId,
        tags:tags,
      })
    })
    .then(res => res.json())
    .then((post)=>{
      addPost(post)});

    // addPost(userId,postTitle,postBody,reactions,tags)
  };

  return <form className="create-post" onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="userId" className="form-label">Enter your User Id </label>
    <input type="text" ref={userIdElement} className="form-control" id="userId" placeholder="Your user id"/>
  </div>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Post Title</label>
    <input type="text" ref={postTitleElement} className="form-control" id="title" placeholder="How are you feeling today..."/>
  </div>
  <div className="mb-3">
    <label htmlFor="body" className="form-label">Post Content</label>
    <textarea rows="4" type="text" ref={postBodyElement} className="form-control" id="body" placeholder="Tell us more about it."/>
  </div>
  <div className="mb-3">
    <label htmlFor="reactions" className="form-label">Number of reactions</label>
    <input type="text" ref={reactionsElement} className="form-control" id="reactions" placeholder="How many people reacted to this post"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tags" className="form-label">Enter your Hashtags</label>
    <input type="text" ref={tagsElement} className="form-control" id="tags" placeholder="Enter your tags using space"/>
  </div>
  <button type="submit" className="btn btn-primary">Post</button>
</form>

}

export default CreatePost;