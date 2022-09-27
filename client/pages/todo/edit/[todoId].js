import buildClient from '../../../api/build-client';
import { useState } from 'react';
import useRequest from '../../../hooks/use-request';
import Router from 'next/router';

const TodoEdit = ({ data }) => {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

  const { doRequest, errors } = useRequest({
    url: `/api/todo/${data.id}`,
    method: 'put',
    body: {
      title,
      content,
    },
    onSuccess: () => Router.push('/'),
    // onSuccess: (res) => console.log(res),
  });
  const { doRequest: deleteRequest, errors: deletError } = useRequest({
    url: `/api/todo/${data.id}`,
    method: 'delete',
    onSuccess: () => Router.push('/'),
    // onSuccess: (res) => console.log(res),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  const deleteSubmit = async () => {
    await deleteRequest();
  };

  return (
    <div className="row">
      <div className="col-6">
        <div className="mx-5 px-5 py-3 bg-white bg-opacity-50 rounded">
          <h1>Edit Todo</h1>
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
            <button className="btn btn-outline-dark ">Submit</button>
            <button
              className="btn btn-outline-danger "
              type="button"
              onClick={deleteSubmit}
            >
              Delete
            </button>
          </form>
          {errors}
        </div>
      </div>
      <div className="col-6">
        <div className="card bg-white bg-opacity-75" style={{ width: '25rem' }}>
          <img src={data.imageUrl} className="card-img-top" alt="Cover image" />
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            <p className="card-text">{data.content}</p>
            <p className="card-text text-end">
              <small className="text-muted">{data.createdAt}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  // console.log(context.req.rawHeaders.slice(-1));
  // if (!context.req.rawHeaders.slice(-1)) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  const { params } = context;
  const id = params.todoId;
  const client = buildClient(context);
  try {
    const { data } = await client.get(`/api/todo/${id}`);
    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}

export default TodoEdit;
