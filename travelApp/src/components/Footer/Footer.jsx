import {
  faArrowRightFromBracket,
  faBell,
  faHouse,
  faMessage,
  faUser,
  faCloud,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
  const noti = localStorage.getItem('notification');
  const [activedHome, setActivedHome] = useState('rgb(15, 119, 255)');
  const [activedMess, setActivedMess] = useState(false);
  const [activedNoti, setActivedNoti] = useState(false);
  const [activedUser, setActivedUser] = useState(false);

  function handleChangeActive(select) {
    if (select === 'home') {
      setActivedHome('rgb(15, 119, 255)');
      setActivedMess('#222');
      setActivedNoti('#222');
      setActivedUser('#222');
    } else if (select === 'mess') {
      setActivedMess('rgb(15, 119, 255)');
      setActivedHome('#222');
      setActivedNoti('#222');
      setActivedUser('#222');
    } else if (select === 'noti') {
      setActivedNoti('rgb(15, 119, 255)');
      setActivedMess('#222');
      setActivedHome('#222');
      setActivedUser('#222');
    } else {
      setActivedUser('rgb(15, 119, 255)');
      setActivedMess('#222');
      setActivedHome('#222');
      setActivedNoti('#222');
    }
  }

  function Logout() {
    localStorage.clear();
    window.location.assign('/login');
  }
  return (
    <div className="Footer">
      <div className="footer-container">
        <div className="footer-icons">
          <Link to="/app/home">
            <FontAwesomeIcon
              style={{ color: activedHome }}
              className="Header-seach-icon footer-icons"
              size="xl"
              icon={faHouse}
              onClick={() => handleChangeActive('home')}
            />
          </Link>
        </div>
        <div className="footer-icons">
          <Link to="/app/message">
            <FontAwesomeIcon
              style={{ color: activedMess }}
              className="Header-seach-icon footer-icons"
              size="xl"
              icon={faCloud}
              onClick={() => handleChangeActive('mess')}
            />
          </Link>
        </div>
        <div className="footer-icons">
          <Link to="/app/notification">
            <FontAwesomeIcon
              style={{ color: activedNoti }}
              className="Header-seach-icon footer-icons"
              size="xl"
              icon={faBell}
              onClick={() => handleChangeActive('noti')}
            />
            {noti ? <span className="noti-dot">●</span> : null}
          </Link>
        </div>
        <div className="footer-icons">
          <Link to="/app/user">
            <FontAwesomeIcon
              style={{ color: activedUser }}
              className="Header-seach-icon footer-icons"
              size="xl"
              icon={faUser}
              onClick={() => handleChangeActive('user')}
            />
          </Link>
        </div>
        <div className="footer-icons">
          <FontAwesomeIcon
            onClick={() => Logout()}
            className="Header-seach-icon footer-icons"
            size="xl"
            icon={faArrowRightFromBracket}
          />
        </div>
      </div>
    </div>
  );
}
