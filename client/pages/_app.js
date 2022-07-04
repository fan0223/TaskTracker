import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client';
import Header from '../component/header';
import '../public/css/style.css';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <div className="container">
        <Header currentUser={currentUser} />
        <div className="container-sm">
          <Component {...pageProps} />
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
