import React from "react";
import { Link } from "react-router-dom";
import "./Follow.scss";

export default function Follow() {
  const Follow = [
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
    <div className="Follow">
      <div className="Follow-container">
        <div className="Follow-top">
          <h5>Đề xuất theo dõi</h5>
          <Link to="/app/followed">Đã theo dõi</Link>
        </div>
        {Follow &&
          Follow.map((item) => (
            <div className="Follow-map" key={item.id}>
              <div className="Follow-avatar">
                <img src={item.avatar} alt="" />
              </div>
              <div className="Follow-info">
                <div className="Follow-info-name">
                  <p>{item.name}</p>
                </div>
              </div>
              <div className="Follow-btn">
                <button>Theo dõi</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
