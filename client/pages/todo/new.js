import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const NewTodo = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/todo',
    method: 'post',
    body: {
      title,
      content,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="mb-3">
      <h1>Create Todo</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            className="form-control"
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
