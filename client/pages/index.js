import buildClient from '../api/build-client';
import SingleTodo from '../component/SingleTodo';

const LandingPage = ({ data, currentUser }) => {
  const todoList = data.map((todo) => {
    return <SingleTodo todo={todo} key={todo.id} currentUser={currentUser} />;
  });

  return <div className="row gy-3">{todoList}</div>;
};

export default LandingPage;

export async function getServerSideProps(context) {
  const client = buildClient(context);
  const { data } = await client.get('/api/query');
  return {
    props: { data },
  };
}
