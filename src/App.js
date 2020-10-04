import React from "react";
import GetPosts from "./examples/GetPosts";
import GetLazyPosts from "./examples/GetLazyPosts";
import UpdatePost from "./examples/UpdatePost";
import UpdatePostSuccess from './examples/UpdatePostSuccess'

function App() {
  return (
    <div className="App">
      <h2>useFetch Samples</h2>
      <GetPosts />
      <GetLazyPosts />
      <UpdatePost />
      <UpdatePostSuccess />
    </div>
  );
}

export default App;
