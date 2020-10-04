import React from "react";
import GetPosts from "./examples/GetPosts";
import GetLazyPosts from "./examples/GetLazyPosts";
import UpdatePost from "./examples/UpdatePost";
import UpdatePostError from "./examples/UpdatePostError";

function App() {
  return (
    <div className="App">
      <GetPosts />
      <GetLazyPosts />
      <UpdatePost />
      <UpdatePostError />
    </div>
  );
}

export default App;
