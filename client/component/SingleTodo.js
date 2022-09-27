import React, { useState, useEffect } from 'react';
import useRequest from '../hooks/use-request';
import Router from 'next/router';
import Link from 'next/link';

const SingleTodo = ({ todo, currentUser }) => {
  const [content, setContent] = useState('');
  const comments = todo.comments;

  const { doRequest, errors } = useRequest({
    url: `/api/todo/${todo.id}/comment`,
    method: 'post',
    body: {
      content,
    },
    onSuccess: () =>
      setTimeout(function () {
        Router.push('/');
      }, 500),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
    setContent('');
  };

  return (
    <div className="col-4" key={todo.id}>
      <div className="card bg-white bg-opacity-75" style={{ width: '25rem' }}>
        {todo.userId === currentUser?.id ? (
          <Link href="/todo/edit/[todoId]" as={`/todo/edit/${todo.id}`}>
            <a>
              <img
                src={todo.imageUrl}
                className="card-img-top"
                alt="Cover image"
              />
            </a>
          </Link>
        ) : (
          <img src={todo.imageUrl} className="card-img-top" alt="Cover image" />
        )}
        <div className="card-body">
          <h5 className="card-title">{todo.title}</h5>
          <p className="card-text">{todo.content}</p>
          <p className="card-text text-end">
            <small className="text-muted">{todo.createdAt}</small>
          </p>
          {comments.map((comment) => {
            return (
              <div key={comment.commentId}>
                <h6 className="card-title">{comment.userName}</h6>
                <p className="card-text">{comment.content}</p>
                <p className="text-end">
                  <small>{comment.createdAt}</small>
                </p>
              </div>
            );
          })}
        </div>

        <form className="text-center mx-3" onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Add comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button className="btn" type="submit">
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleTodo;
