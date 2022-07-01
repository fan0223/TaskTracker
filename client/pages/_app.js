import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/header';
import '../public/css/style.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="container">
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
