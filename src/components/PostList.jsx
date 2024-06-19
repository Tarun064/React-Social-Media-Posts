import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as postListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = ()=>{
  const {postList,fetching} = useContext(postListData);
  //yeah yha se htaaenge kyunki abb hmm data post krr rhe hai toh usse kya ho rha hai ki home aur create post 
  //do alg alg tareeke se behave krr rhe hai mtlb jbb hmm kuch post krr rhe hai data toh home page kaa data 
  //marr jaa rha hai aur fir uske baad agr hmm home pe click krrenge toh create kiya hua data marr jaayega
  //kyunki onload pe data fetch krr rha hai home page jo ki hmme nhi chahiye hmme chahiye ki voh purra app ek baar render krke uske baad show krre data bar baar home yaa create post pe jaane se render naa ho 

  // const [fetching,setFetching] = useState(false);

  // useEffect(()=>{
  //   setFetching(true);
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   fetch('https://dummyjson.com/posts',{signal})
  //   .then(res => res.json())
  //   .then(data =>{
  //     addInitialPost(data.posts);
  //     setFetching(false);
  //   });

  //   return ()=>{
  //     console.log("fetching is aborted...");
  //     controller.abort();
  //   };
  // },[]);
    
  return <>
  {fetching && <LoadingSpinner/>}
  {!fetching && postList.length === 0 && <WelcomeMessage />}
  {!fetching && postList.map((post)=><Post key={post.id} post={post}/>)}
  </>

}

export default PostList;