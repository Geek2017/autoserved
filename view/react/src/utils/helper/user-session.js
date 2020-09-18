import { sessionService } from 'redux-react-session';

export default callback => {
  return new Promise((resolve, reject) => {
    sessionService
      .loadSession()
      .then(session => {
        if (session) {
          sessionService
            .loadUser()
            .then(callback)
            .catch(() => reject(true));
          resolve(session);
        } else {
          reject(true);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
