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
import CommentList from "../comment/PostComment";
import TagForm from "../tag/TagForm";
import PostDetails from "../post/PostDetails";

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
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/tags" element={<TagList />} />
        <Route path="/posts/comments/:id" element={<CommentList />} />
        <Route path="/tags/add" element={<TagForm />} />
      </Routes>
   );
  }
}
