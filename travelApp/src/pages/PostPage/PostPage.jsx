import { React, useState, useEffect } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import postApi from "../../api/postApi";

function PostPage() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const post = await postApi.getAllPost();
        setPost(post);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostList();
  }, []);
  return (
    <div>
      <CreatePost />
      {post.map(function (post) {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
}

export default PostPage;
