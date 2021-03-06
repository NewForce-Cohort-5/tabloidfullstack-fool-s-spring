import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Login from "../auth/Login";
import Register from "../auth/Register";
import MyPostList from "../post/MyPostList";
import PostList from "../post/PostList";
import Hello from "./Hello";
import TagList from "../tag/TagList"
import TagForm from "../tag/TagForm"
import TagEditForm from "../tag/TagEditForm"
import CommentList from "../comment/PostComment";
import { CategoryForm } from "../Category/CategoryForm";
import { CategoryList } from "../Category/CategoryList";
import PostDetails from "../post/PostDetails";
import PostForm from "../post/PostForm";
import { PostTagManager } from "../postTag/PostTagManager";

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
        <Route path="/posts/create" element={<PostForm />} />
        <Route path="/posts/:id/edit" element={<PostForm />} />
        <Route path="/posts/comments/:id" element={<CommentList />} />
        <Route path="/tags" element={<TagList />} />
        <Route path="/tags/add" element={<TagForm />} />
        <Route path="/tags/edit/:id" element={<TagEditForm />} />
        <Route path="/posts/posttag/:id" element={<PostTagManager />} />
      </Routes>
   );
  }
}
