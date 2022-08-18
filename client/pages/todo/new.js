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
    onSuccess: () => Router.push('/'),
    isMultipart: true,
  });

  const onSubmit = async (event) => {
    console.log(file);
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="mb-3">
      <h1>Create Todo</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>Cover</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
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
