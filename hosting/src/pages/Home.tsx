import React from 'react';
import * as firebase from 'firebase';
import classes from './Home.module.css';
import { auth } from '../utils/firebase';
import Button from '../components/Button';
import Header from '../components/Header';
import TwitterLoginButton from '../components/TwitterLoginButton';

const loginWithTwitter = () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    if (auth.currentUser) {
      auth.currentUser.getIdToken(true).then((idToken) => {
        console.log(idToken);
      });
    }
  }).catch((error) => {
    console.error(error);
  });
};

const Home: React.FC = () => (
  <>
    <Header style={{ position: 'fixed', width: '100vw', zIndex: 1000 }} />
    <div className={classes.container}>
      <div className={classes.image}>
        <img src="/assets/fvx.png" alt="FVX" />
      </div>
      <section className={classes.login}>
        <div>
          <p>「好き」を共有しませんか？</p>
          <h3>What is your favorite?</h3>
          <TwitterLoginButton onClick={() => loginWithTwitter()} />
        </div>
      </section>
    </div>
    <Button onClick={loginWithTwitter}>login</Button>
  </>
);

export default Home;