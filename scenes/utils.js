import base from '../config';
import superagent from 'superagent';

export default {
  checkAuth: () => {
    return new Promise((resolve, reject) => {
      base.auth().onAuthStateChanged((user) => {
        if(user) {
          superagent
          .post(db.url + '/getUser')
          .send({ email: user.email })
          .end((err, res) => {
            if(err) {
              reject(err);
            } else {
              let newUser = res.body[0];
              console.log(newUser)
              resolve(newUser)
            }
          });
        } else {
          reject({error: true})
        }
      });
    })
  }
}
