import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client';
import Header from '../component/header';
import '../public/css/style.css';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
        rel="stylesheet"
      ></link>
      <div className="container">
        <Header currentUser={currentUser} />
        <div className="container ">
          <Component {...pageProps} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default AppComponent;

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  return {
    currentUser: data.currentUser,
  };
};
