import React, { useState, useEffect } from "react";
import useFetch from "../package/useFetch";

const URL = "https://jsonplaceholder.typicode.com/posts/2";

function UpdatePostSuccess() {
  const [{ data: details }] = useFetch(URL);
  const [{ loading, error }, fetchPosts] = useFetch(URL, {
    lazy: true,
    method: "PUT",
    onSuccess: handleSuccess
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
    <div className="UpdatePostSuccess">
      <h1>Update Post with Success callback</h1>

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

  function handleSuccess(response) {
    alert(JSON.stringify(response))
  }
}

export default UpdatePostSuccess;
