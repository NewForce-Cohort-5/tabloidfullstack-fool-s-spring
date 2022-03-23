import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/layout/Header";
import ApplicationViews from "./components/layout/ApplicationViews";
import { TagProvider } from './providers/TagProvider';
import { PostProvider } from './providers/PostProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
        <TagProvider>
          <Header />
          <ApplicationViews />
        </TagProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
