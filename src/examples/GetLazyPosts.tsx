import React from "react";
import useFetch from "../package/useFetch";

function GetLazyPosts() {
  const [
    { data, loading, error },
    fetchPosts
  ] = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
    lazy: true
  });

  return (
    <div className="GetLazyPosts">
      <h1>Get Lazy Posts</h1>
      <button onClick={fetchPosts}>Fetch!</button>
      {loading && "Loading..."}
      {error && error.message}
      {data && (
        <ol>
          {data.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default GetLazyPosts;
