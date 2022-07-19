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
    onSuccess: () => Router.push(`/todo/${data.id}`),
    // onSuccess: (res) => console.log(res),
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
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}

export default TodoEdit;
