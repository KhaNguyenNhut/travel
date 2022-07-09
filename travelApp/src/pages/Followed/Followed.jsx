import React from "react";
import { Link } from "react-router-dom";
import "./Followed.scss";

export default function Followed() {
  const Followed = [
    {
      id: "1",
      name: "Priscillia Shane",
      avatar: "/assets/images/avatar.jpg",
    },
    {
      id: "2",
      name: "Priscillia Shane",
      avatar: "/assets/images/avatar.jpg",
    },
    {
      id: "3",
      name: "Priscillia Shane",
      avatar: "/assets/images/avatar.jpg",
    },
  ];

  return (
    <div className="Followed">
      <div className="Followed-container">
        <div className="Followed-top">
          <h5>Danh sách đã theo dõi</h5>
          <Link to="/app/follow">Đề xuất theo dõi</Link>
        </div>
        {Followed &&
          Followed.map((item) => (
            <div className="Followed-map" key={item.id}>
              <div className="Followed-avatar">
                <img src={item.avatar} alt="" />
              </div>
              <div className="Followed-info">
                <div className="Followed-info-name">
                  <p>{item.name}</p>
                </div>
              </div>
              <div className="Followed-btn">
                <button>Theo dõi</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
