import React from "react";
import GetPosts from "./examples/GetPosts";
import GetLazyPosts from "./examples/GetLazyPosts";
import UpdatePost from "./examples/UpdatePost";
import UpdatePostDynamicUrl from "./examples/UpdatePostDynamicUrl";

function App() {
  return (
    <div className="App">
      <h2>useFetch Samples</h2>
      <GetPosts />
      <GetLazyPosts />
      <UpdatePost />
      <UpdatePostDynamicUrl />
    </div>
  );
}

export default App;
