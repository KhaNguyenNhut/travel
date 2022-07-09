import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import postApi from "../../api/postApi";
import "./User.scss";

export default function User() {
  var user = JSON.parse(localStorage.getItem("user"));
  const [post, setPost] = useState([]);
  const arrayPost = [];

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const post = await postApi.getAllPost();
        post
          .filter((post) => post.user[0].id === user.id)
          .map((filteredPost) => {
            arrayPost.push(filteredPost);
            setPost(arrayPost);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostList();
  }, []);
  return (
    <div className="user">
      <div className="user-container">
        <div className="user-info">
          <img
            src={user.avatar ? user.avatar : "/assets/images/avatar.jpg"}
            alt=""
          />
        </div>
        <div className="user-info-name">
          <b>{user.name}</b>
        </div>
        <div className="user-info-follow">
          <div className="user-info-follower">
            <b>10K</b>
            <p>Follower</p>
          </div>
          <div className="user-info-following">
            <b>1,2K</b>
            <p>Following</p>
          </div>
        </div>
        <div className="user-info-edit">
          <button>
            <Link to="/app/follow">Theo dõi</Link>
          </button>
          <button>Cập nhật thông tin</button>
        </div>
        <div className="user-post">
          <hr />
          <p>Bài viết</p>
          <hr />
        </div>
      </div>

      {post.map(function (post) {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
}
