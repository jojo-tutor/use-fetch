import React, { useState, useEffect } from "react";
import useFetch from "../package/useFetch";

const URL = "https://jsonplaceholder.typicode.com/posts";

function UpdatePostError() {
  const [{ data: details }] = useFetch(`${URL}/1`);
  const [{ loading, error }, fetchPosts] = useFetch(URL, {
    lazy: true,
    method: "PUT",
    onError: handleError
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
    <div className="UpdatePostError">
      <h1>Update Post with Error callback</h1>

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

  function handleError(err) {
    console.error(err);
    const message = {
      title: "API Error!",
      ...err
    }
    alert(JSON.stringify(message))
  }
}

export default UpdatePostError;
