import React from 'react';
import GetPosts from './examples/GetPosts';
import GetLazyPosts from './examples/GetLazyPosts';
import UpdatePost from './examples/UpdatePost';

function App() {
  return (
    <div className="App">
      <GetPosts />
      <GetLazyPosts />
      <UpdatePost />
    </div>
  );
}

export default App;
