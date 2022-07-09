import React from "react";
import Carousel from "react-bootstrap/Carousel";

function PostContent({ post }) {
  const path = "/assets/images/";
  return (
    <div className="post-main-content">
      <p>{post.content}</p>
      {post.images && post.images.length > 1 ? (
        <Carousel fade>
          {post.map((item, index) => (
            <Carousel.Item key={index}>
              {item &&
                (post.images[0].split(".")[1] === "mp4" ? (
                  <video src={path + post.images[0]} controls />
                ) : (
                  <img
                    className="d-block w-100 cursor"
                    src={path + post.images[0]}
                    alt=""
                  />
                ))}
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        post.images &&
        post.images.length === 1 &&
        (post.images[0].split(".")[1] === "mp4" ? (
          <video src={path + post.images[0]} controls />
        ) : (
          <img
            className="d-block w-100 cursor"
            src={path + post.images[0]}
            alt=""
          />
        ))
      )}
    </div>
  );
}

export default PostContent;
