import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import axios from 'axios';

const NewTodo = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const { doRequest, errors } = useRequest({
    url: '/api/todo',
    method: 'post',
    body: {
      title,
      content,
      image: file,
    },
    onSuccess: () =>
      setTimeout(function () {
        Router.push('/');
      }, 1000),

    isMultipart: true,
  });

  const onSubmit = async (event) => {
    console.log(file);
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="mx-5 px-5 py-3 bg-white bg-opacity-50 rounded">
      <h1>Create Todo</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="customFile">
            Cover image
          </label>
          <br />
          <input
            className="form-control"
            id="customFile"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            className="form-control"
            accept="image/*"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label>Content</label>
          <textarea
            rows="5"
            cols="50"
            className="form-control"
            id="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-dark">Submit</button>
      </form>
      {errors}
    </div>
  );
};

export default NewTodo;
