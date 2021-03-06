import React, { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import notificationApi from "../../api/notificationApi";
import "./Notification.scss";
import { useNavigate } from "react-router-dom";

function Notification() {
  let navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("user"));
  const [notification, setNotification] = useState([]);
  const arrayNotifications = [];
  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const notification = await notificationApi.getAllNotifications();
        notification
          .filter((notification) => notification.post[0].user[0] === user.id)
          .map((filteredNotification) => {
            if (filteredNotification.isSeen === false) {
              localStorage.setItem("notification", true);
            }
            arrayNotifications.push(filteredNotification);
            setNotification(arrayNotifications);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostList();
  }, 3000);

  const handleGoto = async (content) => {
    const notification = await notificationApi.update(content.id);
    localStorage.setItem("search", content.post[0].content);
    let path = `/app/search`;
    navigate(path);
    window.location.reload();
  };

  return (
    <div className="Notification">
      {notification ? (
        notification.map((noti) => (
          <div
            className="notification-container"
            key={noti.id}
            onClick={() => handleGoto(noti)}
          >
            <div className="notification-info">
              <img
                src={
                  noti.user[0].avatar
                    ? noti.user[0].avatar
                    : "/assets/images/avatar.jpg"
                }
                alt=""
              />
              <b>{noti.user[0].name}</b>
              <TimeAgo className="createdAt" date={noti.createdAt} />
              <b className="notification-new">
                {noti.isSeen.toString() === "false" ? "New" : null}
              </b>
            </div>
            <div className="notification-content">
              {noti.content === "Vi ph???m ch??nh s??ch" ? (
                <p style={{ color: "red" }}>
                  ???? b??o c??o b??i vi???t c???a b???n {noti.content}
                </p>
              ) : (
                <p>???? b??nh lu???n b??i vi???t c???a b???n {noti.content}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Ch??a c?? b??nh lu???n</p>
      )}
    </div>
  );
}

export default Notification;
