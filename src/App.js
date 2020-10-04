import React from "react";
import GetPosts from "./examples/GetPosts";
import GetLazyPosts from "./examples/GetLazyPosts";
import UpdatePost from "./examples/UpdatePost";
import UpdatePostSuccess from "./examples/UpdatePostSuccess";
import UpdatePostError from "./examples/UpdatePostError";

function App() {
  return (
    <div className="App">
      <h2>useFetch Samples</h2>
      <GetPosts />
      <GetLazyPosts />
      <UpdatePost />
      <UpdatePostError />
      <UpdatePostSuccess />
      <UpdatePostError />
    </div>
  );
}

export default App;
