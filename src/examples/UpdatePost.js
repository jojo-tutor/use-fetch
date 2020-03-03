import React, { useState, useEffect } from "react";
import useFetch from "../package/useFetch";

const URL = "https://jsonplaceholder.typicode.com/posts/1";

function UpdatePost() {
  const [{ data: details }] = useFetch(URL);
  const [{ loading, error }, fetchPosts] = useFetch(URL, {
    lazy: true,
    method: "PUT"
  });
  const [formValues, setFormValues] = useState({
    title: "",
    body: ""
  });

  useEffect(() => {
    if (details) {
      setFormValues({
        title: details.title,
        body: details.body
      });
    }
  }, [details]);

  const handleSubmit = evt => {
    evt.preventDefault();
    fetchPosts({
      body: formValues
    });
  };

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <div className="UpdatePost">
      <h1>Update Post</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formValues.title}
          onChange={handleInputChange}
        />

        <label htmlFor="body">Body</label>
        <textarea
          rows={4}
          name="body"
          id="body"
          value={formValues.body}
          onChange={handleInputChange}
        />

        <div>
          <button disabled={loading} type="submit">
            Save
          </button>
        </div>
      </form>

      {loading && "Loading..."}
      {error && error.message}
    </div>
  );
}

export default UpdatePost;
