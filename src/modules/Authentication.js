import firebase, { providerGoogle } from '../firebase';
import { User } from '../models';
import { PATH } from '../config';

class Authentication {
  static loginWithGoogle = () => {
    firebase.auth().signInWithRedirect(providerGoogle);
  };

  static completeLoginWithGoogle = async history => {
    const result = await firebase.auth().getRedirectResult();
    const { user } = result;

    // ログインor会員登録でなければreturn
    if (!user) return;

    const isNewUser = result.additionalUserInfo.isNewUser;
    if (isNewUser) {
      return history.push(`${PATH.REGISTRATION}/${user.uid}`);
    }

    return history.push(PATH.TOP);
  };

  static createNewUser = (uid, info, history) => {
    User.fillData(uid, info);
    history.push(PATH.TOP);
  };

  static signupWithEmail = async (info, history) => {
    const { email, password } = info;

    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    User.fillData(user.uid, info);
    if (user) {
      history.push(PATH.TOP);
    }
  };

  static loginWithEmail = async (email, password, history) => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (user) {
      history.push(PATH.TOP);
    }
  };

  static fetchUserId = () => {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      });
    });
  };

  static transitionLoginIfNotLogin = async history => {
    const uid = await Authentication.fetchUserId();
    if (uid) {
      return uid;
    }

    history.push(PATH.LOGIN);
  };

  static fetchUserDataById = id => {
    return User.fetchById(id);
  };

  static updateUserInfo = info => {
    const { uid } = info;
    User.fillData(uid, info);
  };
}

export default Authentication;
