import React from "react";
import GetPosts from "./examples/GetPosts";
import GetLazyPosts from "./examples/GetLazyPosts";
import UpdatePost from "./examples/UpdatePost";
import UpdatePostSuccess from "./examples/UpdatePostSuccess";
import UpdatePostError from "./examples/UpdatePostError";
import UpdatePostDynamicUrl from "./examples/UpdatePostDynamicUrl";

function App() {
  return (
    <div className="App">
      <h2>useFetch Samples</h2>
      <GetPosts />
      <GetLazyPosts />
      <UpdatePost />
      <UpdatePostSuccess />
      <UpdatePostError />
      <UpdatePostDynamicUrl />
    </div>
  );
}

export default App;
