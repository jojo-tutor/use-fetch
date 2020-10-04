import React from "react";
import GetPosts from "./examples/GetPosts";
import GetLazyPosts from "./examples/GetLazyPosts";
import UpdatePost from "./examples/UpdatePost";
import UpdatePostDynamicUrl from "./examples/UpdatePostDynamicUrl";

function App() {
  return (
    <div className="App">
      <GetPosts />
      <GetLazyPosts />
      <UpdatePost />
      <UpdatePostDynamicUrl />
    </div>
  );
}

export default App;
