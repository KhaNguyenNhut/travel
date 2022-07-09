import React from "react";
import "./HomePage.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PostPage from "../PostPage/PostPage";
import Message from "../Message";
import Notification from "../Notification/Notification";
import User from "../User/User";
import { Navigate, Route, Routes } from "react-router-dom";
import Follow from "../Follow/Follow";
import Followed from "../Followed/Followed";
import SearchPage from "../SearchPage/SearchPage";
export default function HomePage() {
  return (
    <div className="HomePage">
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<PostPage />} />
          <Route
            path="/search"
            element={<SearchPage search={localStorage.getItem("search")} />}
          />
          <Route path="/message" element={<Message />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/user" element={<User />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/followed" element={<Followed />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
