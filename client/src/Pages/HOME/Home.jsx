import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import Posts from "../../Components/posts/Posts";
import Sidebar from "../../Components/Sidebar/SideBar";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  console.log(search);
 // fetching data from Api
    useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts" + search);
      setPosts(response.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts pos={posts} />
        <Sidebar />
      </div>
    </>
  );
}

export default Home;
