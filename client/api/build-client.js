import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on server request should be amde to
    // http://ingress-nginx-controller.ingress-ngix.svc.cluster.local/api/users/currentuser
    return axios.create({
      baseURL: '/',
      // 'http://todo-app-load-balancer-56769992.ap-northeast-1.elb.amazonaws.com',
      // baseURL: 'http://www.ticketing-app-fan.xyz/', use domain url when deployment online
      headers: req.headers,
    });
  } else {
    // we are on the browser
    // request can be made wiht a base url of ''
    return axios.create({
      baseURL: '/',
    });
  }
};
