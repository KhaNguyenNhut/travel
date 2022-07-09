import { React, useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import postApi from "../../api/postApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchPage.scss";

function SearchPage(searchKey) {
  const [post, setPost] = useState([]);
  const arrayPost = [];
  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const post = await postApi.getAllPost();
        post
          .filter((post) => post.content.includes(searchKey.search))
          .map((filteredPost) => {
            arrayPost.push(filteredPost);
            setPost(arrayPost);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostList();
  }, []);
  return (
    <div className="search-container">
      <h4>
        Kết quả tìm kiếm{" "}
        <FontAwesomeIcon
          className="Header-seach-icon"
          size="lg"
          icon={faSearch}
        />
      </h4>
      {post.length > 0 ? (
        post.map(function (post) {
          return <Post post={post} key={post.id} />;
        })
      ) : (
        <div className="noneOfPost">
          <p>Không có kết quả tìm kiếm</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
