import React, { useState, useEffect } from "react";
import useFetch from "../package/useFetch";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts/";
const getPostUrlById = (id) => `${BASE_URL}/${id}`;
const postIds = new Array(10).fill(true).map((val, index) => index + 1);

function UpdatePost() {
  const [{ data: details }, fetchDetails] = useFetch(BASE_URL, { lazy: true });
  const [{ loading, error }, fetchUpdatePost] = useFetch(BASE_URL, {
    lazy: true,
    method: "PUT",
  });
  const [formValues, setFormValues] = useState({
    id: "1",
    title: "",
    body: "",
  });

  useEffect(() => {
    if (formValues.id) {
      fetchDetails({
        url: getPostUrlById(formValues.id),
      });
    }
  }, [fetchDetails, formValues.id]);

  useEffect(() => {
    if (details) {
      setFormValues((prev) => ({
        ...prev,
        title: details.title,
        body: details.body,
      }));
    }
  }, [details]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const values = {
      title: formValues.title,
      body: formValues.body,
    };
    fetchUpdatePost({
      url: getPostUrlById(formValues.id),
      body: values,
    });
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="UpdatePost">
      <h1>Update Post with Dynamic Url</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID</label>
        <select name="id" value={formValues.id} onChange={handleInputChange}>
          {postIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>

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
