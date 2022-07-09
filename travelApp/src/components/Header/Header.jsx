import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import postApi from "../../api/postApi";
import "./Header.scss";

export default function Header() {
  let navigate = useNavigate();
  const [search, setSearch] = useState();
  const [postAll, setPostAll] = useState([]);
  const [post, setPost] = useState([]);
  const [display, setDisplay] = useState("none");
  const arrayPost = [];

  function handleSearch() {
    localStorage.setItem("search", search);
    setDisplay("none");
    let path = `/app/search`;
    navigate(path);
    window.location.reload();
  }

  function changeSearch(searchKey) {
    setDisplay("block");
    setSearch(searchKey);
    postAll
      .filter((post) => post.content.includes(search))
      .map((filteredPost) => {
        if (arrayPost.length < 5) {
          arrayPost.push(filteredPost);
        }
        setPost(arrayPost);
      });
  }

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const post = await postApi.getAllPost();
        setPostAll(post);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostList();
  }, []);

  return (
    <div className="Header">
      <div className="Header-logo">
        <Link to="/">
          <img src="/assets/images/logo.png" alt="" />
        </Link>
      </div>
      <div className="Header-search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="Search..."
          autoComplete="off"
          value={search}
          onChange={(e) => changeSearch(e.target.value)}
        ></input>
        <FontAwesomeIcon
          className="Header-seach-icon"
          size="xl"
          icon={faSearch}
          onClick={handleSearch}
        />
      </div>
      <div className="searchHelp" style={{ display: display }}>
        <div className="search-top">
          <h5>Gợi ý tìm kiếm</h5>
          <FontAwesomeIcon
            className="Header-seach-icon-close"
            size="lg"
            icon={faClose}
            onClick={() => setDisplay("none")}
          />
        </div>
        {post?.map((filteredPost) => {
          return (
            <div className="search-content" key={filteredPost.id}>
              <p
                onClick={() => {
                  setSearch(filteredPost.content);
                  setDisplay("none");
                }}
              >
                {filteredPost.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
