import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import Comment from "./components/Comment";
import MoreMenu from "./components/MoreMenu";
import PostContent from "./components/PostContent";
import PostInfo from "./components/PostInfo";
import "./Post.scss";

export default function Post({ post }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="Post">
      <div className="mapPost">
        <div className="Post-top">
          <PostInfo post={post} />
          <div className="post-avatar-3dots">
            <FontAwesomeIcon
              size="xl"
              icon={faEllipsisVertical}
              onClick={handleOpen}
            />
            <MoreMenu open={open} post={post} handleClose={handleClose} />
          </div>
        </div>
        <div className="post-main">
          <PostContent post={post} />
        </div>
        <Comment post={post} />
      </div>
    </div>
  );
}
