import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import TimeAgo from "react-timeago";
import { faComment, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import "./Comment.scss";
import commentApi from "../../../api/commentApi.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #1E90FF",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};
function Comment(post) {
  var user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [alertSuccess, setAlertSuccess] = useState("none");
  const [alertError, setAlertError] = useState("none");
  const [isLove, setIsLove] = useState(false);
  const [countLove, setCountLove] = useState(0);
  const [isComment, setIsComment] = useState(false);
  const [countComment, setCountComment] = useState(0);
  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState("");
  const [contenAlert, setContentAlert] = useState("");

  useEffect(() => {
    const id = post.post.id;
    const fetchPostList = async () => {
      try {
        const comment = await commentApi.getComment(id);
        setCountComment(Object.keys(comment).length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostList();
  }, []);

  function hanldeLove() {
    if (isLove === false) {
      setCountLove(countLove + 1);
      setIsLove(true);
    } else {
      setCountLove(countLove - 1);
      setIsLove(false);
    }
  }
  function hanldeComment(e) {
    setCountComment(countComment + 1);
    setIsComment(true);
    const data = {
      content: comment,
      post: post.post.id,
      user: user.id,
    };
    const createComment = async () => {
      try {
        const comment = await commentApi.create(data);
        setAlertSuccess("block");
        setComment("");
        setTimeout(() => {
          setAlertSuccess("none");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };
    createComment();
  }

  function getComment() {
    const id = post.post.id;
    const fetchDistrict = async () => {
      try {
        const comment = await commentApi.getComment(id);
        setListComment(comment);
        setOpen(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDistrict();
  }
  const handleDeleteComment = async (id) => {
    const comment = await commentApi.update(id);
    setCountComment(countComment - 1);
    setContentAlert("Xóa bình luận");
    setAlertSuccess("block");
    handleClose();
    setComment("");
    setTimeout(() => {
      setAlertSuccess("none");
    }, 3000);
  };

  return (
    <div className="post-bot mt-4">
      <Stack spacing={1}>
        <Alert
          style={{ display: alertError }}
          severity="error"
          className="AlertContainer"
        >
          <AlertTitle>Error</AlertTitle>
          Đăng bài viết thất bại — <strong>Vui lòng kiểm tra lại!</strong>
        </Alert>
        <Alert
          style={{ display: alertSuccess }}
          severity="success"
          className="AlertContainer"
        >
          <AlertTitle>Success</AlertTitle>
          {contenAlert ? (
            <p>{contenAlert} thành công</p>
          ) : (
            <p>Bình luận bài viết thành công</p>
          )}
          <strong>Mời bạn tiếp tục trải nghiệm!</strong>
        </Alert>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bình Luận
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {listComment ? (
              listComment.map((comments) => (
                <div className="comment-modal" key={comments.id}>
                  <div className="comment-grp">
                    <img
                      src={
                        comments.user[0].avatar
                          ? comments.user[0].avatar
                          : "/assets/images/avatar.jpg"
                      }
                      alt=""
                    />
                    <h4>{comments.user[0].name}</h4>
                    <TimeAgo className="createdAt" date={comments.createdAt} />
                    {comments.user[0].id === user.id ? (
                      <FontAwesomeIcon
                        className="trash-icon"
                        size="xl"
                        icon={faTrash}
                        onClick={() => handleDeleteComment(comments.id)}
                      />
                    ) : null}
                    {post.post.user[0].id === user.id ? (
                      <FontAwesomeIcon
                        className="trash-icon"
                        size="xl"
                        icon={faTrash}
                        onClick={() => handleDeleteComment(comments.id)}
                      />
                    ) : null}
                  </div>
                  <div className="comment-content">
                    <p>{comments.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Chưa có bình luận</p>
            )}
          </Typography>
        </Box>
      </Modal>

      <div className="post-bot-icon">
        <FontAwesomeIcon
          className="love-icon"
          size="xl"
          icon={faHeart}
          onClick={hanldeLove}
        />
        <p>{countLove}</p>
      </div>
      <div className="post-bot-icon">
        <FontAwesomeIcon
          className="comment-icon"
          size="xl"
          icon={faComment}
          onClick={() => getComment()}
        />
        <p>{countComment}</p>
      </div>
      <input
        type="text"
        className="input-comment"
        placeholder="Nhập bình luận..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={() => hanldeComment()}>Bình luận</button>
    </div>
  );
}

export default Comment;
