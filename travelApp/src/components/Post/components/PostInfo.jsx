import React from "react";
import TimeAgo from "react-timeago";

function PostInfo({ post }) {
  return (
    <div className="post-avatar-info">
      <img
        src={
          post.user[0].avatar
            ? post.user[0].avatar
            : "/assets/images/avatar.jpg"
        }
        alt="avatar người dùng"
      />
      <div className="post-avatar-time">
        <b>{post.user[0].name}</b>
        <p>
          <TimeAgo date={post?.createdAt} />
        </p>
      </div>
    </div>
  );
}

export default PostInfo;
