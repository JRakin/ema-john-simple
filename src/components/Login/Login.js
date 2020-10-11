import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    password: '',
    photoUrl: '',
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        const signedInUser = {
          isLoggedIn: true,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        setUserToken();

        history.replace(from);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const setUserToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem('token', idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const user = {
          isLoggedIn: false,
          name: '',
          email: '',
          photoUrl: '',
          error: '',
          success: false,
        };
        setUser(user);
        console.log('signed out');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChange = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isFormValid = re.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPassValid = e.target.value.length >= 6;
      const isNumber = /\d{1}/.test(e.target.value);

      isFormValid = isPassValid && isNumber;
    }

    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserInfo(user.name);
          // console.log(user);
        })
        .catch((error) => {
          let newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log(res.user.displayName);
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
    e.preventDefault();
  };

  const updateUserInfo = (name) => {
    const currentUser = firebase.auth().currentUser;

    currentUser
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log('User name updated successfully');
      })
      .catch(() => {
        console.log('Error');
      });
  };

  return (
    <div style={{ textAlign: 'center ' }}>
      {user.isLoggedIn ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={handleSignIn}>Sign with google</button>
      )}
      {user.isLoggedIn && <p>{user.name}</p>}
      <h1>Our own authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New user sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            onBlur={handleChange}
            name="name"
            placeholder="your name"
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleChange}
          name="email"
          id="email"
          placeholder="email"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleChange}
          name="password"
          id="pass"
          placeholder="password"
          required
        />
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && (
        <p style={{ color: 'green' }}>
          Successfully {newUser ? 'registered' : 'Logged in'}!
        </p>
      )}
    </div>
  );
}

export default Login;
