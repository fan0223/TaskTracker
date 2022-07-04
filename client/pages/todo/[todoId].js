import Link from 'next/link';
import buildClient from '../../api/build-client';
const TodoShow = ({ data }) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p id="p_wrap">{data.content}</p>
      <Link href="/todo/edit/[todoId]" as={`/todo/edit/${data.id}`}>
        <a className="btn btn-primary">Edit</a>
      </Link>
      {/*  */}
    </div>
  );
};

export async function getServerSideProps(context) {
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

export default TodoShow;
