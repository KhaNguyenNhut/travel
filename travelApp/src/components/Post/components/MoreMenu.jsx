import { faFlag, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import reportApi from "../../../api/reportApi.js";
import React, { useState } from "react";

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
function MoreMenu({ open, post, handleClose }) {
  const post_id = post.id;
  var user = JSON.parse(localStorage.getItem("user"));
  const [alertSuccess, setAlertSuccess] = useState("none");
  function handleReport(e) {
    const data = {
      content: "Vi phạm chính sách",
      post: post_id,
      user: user.id,
    };
    const createReport = async () => {
      try {
        const report = await reportApi.create(data);
        setAlertSuccess("block");
        handleClose();
        setTimeout(() => {
          setAlertSuccess("none");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };
    createReport();
  }
  return (
    <div className="moremu">
      <Stack spacing={1}>
        <Alert
          style={{ display: alertSuccess }}
          severity="success"
          className="AlertContainer"
        >
          <AlertTitle>Success</AlertTitle>
          Báo cáo bài viết thành công —{" "}
          <strong>Mời bạn tiếp tục trải nghiệm!</strong>
        </Alert>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="extendmodal">
          <div className="extendmodal-content">
            <FontAwesomeIcon
              className="Header-seach-icon"
              size="xl"
              icon={faEdit}
            />
            <p>Sửa bài viết</p>
          </div>
          <div className="extendmodal-content">
            <FontAwesomeIcon
              className="Header-seach-icon"
              size="xl"
              icon={faTrash}
            />
            <p>Xóa bài viết</p>
          </div>
          {post.user[0].id !== user.id ? (
            <div className="extendmodal-content" onClick={() => handleReport()}>
              <FontAwesomeIcon
                className="Header-seach-icon"
                size="xl"
                icon={faFlag}
              />
              <p>Báo cáo bài viết</p>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}

export default MoreMenu;
