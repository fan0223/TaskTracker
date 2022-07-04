import buildClient from '../api/build-client';
import Link from 'next/link';

const LandingPage = ({ data }) => {
  const todoList = data.map((todo) => {
    return (
      <Link href="/todo/[todoId]" as={`/todo/${todo.id}`} key={todo.id}>
        <a className="list-group-item list-group-item-action" key={todo.id}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{todo.title}</h5>
            <small>{todo.createAt}</small>
          </div>
          <p className="mb-1">{todo.content}</p>
          <small>By. {todo.userEmail}</small>
        </a>
      </Link>
    );
  });

  return (
    <div className="container">
      <h3>TODO</h3>
      <div className="list-group opacity-75">{todoList}</div>
    </div>
  );
};

export default LandingPage;

export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { data } = await client.get('/api/todo');
  return {
    props: { data },
  };
}
