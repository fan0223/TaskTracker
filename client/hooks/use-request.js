import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

// useRequest hook only use in react component, disallow in SSR getInitialProps
export default ({ url, method, body, onSuccess, isMultipart }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      let response;
      if (isMultipart) {
        response = await axios[method](
          url,
          { ...body, ...props },
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      } else {
        response = await axios[method](url, { ...body, ...props });
      }

      if (onSuccess) {
        onSuccess(response.data);
      }

      // Router.push('/');
      return response.data;
    } catch (error) {
      console.log(error);
      setErrors(
        <div className="alert alert-danger opacity-75 mt-3">
          <h4>Oooop...</h4>
          <ul className="my-2">
            {error.response.data.errors.map((err) => (
              <li key={err.message}> {err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
