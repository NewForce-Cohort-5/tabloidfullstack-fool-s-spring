import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/layout/Header";
import ApplicationViews from "./components/layout/ApplicationViews";
import { TagProvider } from './providers/TagProvider';
import { PostProvider } from './providers/PostProvider';
import { CommentProvider } from './providers/CommentProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
        <TagProvider>
        <CommentProvider>
          <Header />
          <ApplicationViews />
          </CommentProvider>
        </TagProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
