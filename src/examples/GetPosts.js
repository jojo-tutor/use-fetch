import React from "react";
import useFetch from "../package/useFetch";

function GetPosts() {
  const [{ data, loading, error }] = useFetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );

  return (
    <div className="GetPosts">
      <h1>Get Posts</h1>
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

export default GetPosts;
