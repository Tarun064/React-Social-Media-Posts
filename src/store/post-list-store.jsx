import { createContext, useCallback, useReducer, useState, useEffect } from "react";


export const PostList = createContext({
  postList:[],
  addPost : ()=>{},
  // addInitialPost:()=>{},
  fetching:false,
  deletePost : ()=>{}
});

const postListReducer = (currPostList,action)=>{
  let newPostList=currPostList;
  if(action.type === "DELETE_POST"){
    newPostList = currPostList.filter((post)=>post.id !== action.payload.postId);
  }else if(action.type === "ADD_INITIAL_POSTS"){
    newPostList=action.payload.posts;
  }
  else if(action.type === "ADD_POST"){
    newPostList = [action.payload,...currPostList];
  }
  return newPostList;
}

const PostListProvider = ({children})=>{
  const [postList,dispatchPostList]=useReducer(postListReducer,[]);
  const [fetching,setFetching] = useState(false);

  //initially we did like this by adding data manually(hardcoded)
  // const addPost = (userId,postTitle,postBody,reactions,tags)=>{
  //   dispatchPostList({
  //     type:"ADD_POST",
  //     payload:{
  //       id:Date.now(),
  //       title:postTitle,
  //       body:postBody,
  //       reactions:reactions,
  //       userId:userId,
  //       tags:tags,
  //     }
  //   })
  // };

  const addPost = (post)=>{   //now getting data from the server
      dispatchPostList({
        type:"ADD_POST",
        payload:post,
      })
    };

  const addInitialPost = (posts)=>{  //hmne addinitial post htta diya abb post list se data htaa ke store mein
    dispatchPostList({        //daal ke kyunki abb initial data render krne ki jimmedaari store ne utha li hai
      type:"ADD_INITIAL_POSTS",  //toh abb store ko iss method ko expose krne ki jrurt nhi hai   
      payload:{
        posts,
      }
    })
  };

  //useCallback hook usage
  const deletePost = useCallback((postId)=>{
    dispatchPostList({
      type:"DELETE_POST",
      payload:{
        postId,
      }
    })
  },[dispatchPostList]);

  useEffect(()=>{
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://dummyjson.com/posts',{signal})
    .then(res => res.json())
    .then(data =>{
      addInitialPost(data.posts);
      setFetching(false);
    });

    return ()=>{
      controller.abort();
    };
  },[]);

  return (
    <PostList.Provider value = {{postList,addPost,fetching,deletePost}}>
      {children}
    </PostList.Provider>
  )
}

export default PostListProvider;