import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/layout/Header";
import ApplicationViews from "./components/layout/ApplicationViews";
import { TagProvider } from './providers/TagProvider';
import { PostProvider } from './providers/PostProvider';
import {CategoryProvider} from './providers/CategoryProvider';

function App() {
  return (
    <Router>
      <CategoryProvider>
      <UserProfileProvider>
        <PostProvider>
        <TagProvider>
          <Header />
          <ApplicationViews />
        </TagProvider>
        </PostProvider>
      </UserProfileProvider>
      </CategoryProvider>
    </Router>
  );
}

export default App;
