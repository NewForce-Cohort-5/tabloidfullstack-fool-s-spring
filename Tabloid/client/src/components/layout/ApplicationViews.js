import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Login from "../auth/Login";
import Register from "../auth/Register";
import MyPostList from "../post/MyPostList";
import PostList from "../post/PostList";
import Hello from "./Hello";
import TagList from "../tag/TagList"
import { CategoryForm } from "../Category/CategoryForm";
import { CategoryList } from "../Category/CategoryList";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  else{
   return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/myposts" element={<MyPostList />} />
        <Route path="/category" element={<CategoryList />} />

        <Route path="/category/add" element={<CategoryForm />} />
        <Route path="/tags" element={<TagList />} />
      </Routes>
   );
  }
}
