import Cookies from 'js-cookie'; // Import the js-cookie library

export const requireAuth = (nextState, replace) => {
    const token = Cookies.get('token');
  
    if (!token) {
      replace('/signin'); // Redirect to the sign-in page
    }
  };
  