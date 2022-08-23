import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-6 col-xl-4">
        <div className="card my-3 bg-white bg-opacity-50">
          <div className="card-body d-flex flex-column align-item-center">
            <form className="text-center" onSubmit={onSubmit}>
              <h1>Sign In</h1>
              <div className="form-group  mb-3">
                <label>Email Address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group  mb-3">
                <label>Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                />
              </div>
              <button className="btn btn-outline-dark">Sign In</button>

              {errors}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
