import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Post from "./components/Post"
import ImageUpload from "./components/ImageUpload"
import Signin from "./components/Signin"
import {db, auth} from "./firebase"
import Button from '@mui/material/Button/Button';
import Input from '@mui/material/Input/Input';
import "./Signin.css"
import InstagramEmbed from 'react-instagram-embed'


// https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png

function App() {

 

//=================states=========================//
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); //for authentication
  const [openSignIn, setOpenSignIn] = useState(false)
  const [comment, setComment] = useState("")

//================useEffects=======================//

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
      //if user logged in
        setUser(authUser);
      }
      else{
        // if user logged out
        setUser(null);
      }
    })

    return ()=>{
      unsubscribe();
    }

  }, [user, username])

  useEffect(()=>{
    db.collection('post').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      //every time new post is added, this code is fired
      setPosts(snapshot.docs.map(doc=>({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, [posts]);

  const toggle = () =>{
    setOpen((!open));
  }
  
  
  function handleSubmit(event) {
    event.preventDefault();
    
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=>alert(error.message)) 
    
    setOpen(false);
    
  }
  
  const toggleSignIn = () =>{
    setOpenSignIn((!openSignIn));
  }
  const signIn = (event)=>{

    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((e)=>alert(e.message))

    setOpenSignIn(false);
  }



  return (
    <div className="App">
      
      {
        (open)?<div className='signin__mainContainer'>
                <button className='signin__closeBtn' onClick={toggle}> X </button>
          {/* <span className='signin__closeBtn' > <h1>X</h1> </span> */}
        <div className='signin__element2'>
            <form className="signin__element" >
                <img className="signin__headerImage" src="../../images/igworg.svg" alt="No logo" />
                {/* <h1>Login</h1> */}
                <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='signin__loginBtn' type='submit' onClick={handleSubmit}> Sign Up </button>
            </form>
        </div>
    </div>:""
      }

{
        (openSignIn)?<div className='signin__mainContainer'>
                <button className='signin__closeBtn' onClick={toggleSignIn}> X </button>
          {/* <span className='signin__closeBtn' > <h1>X</h1> </span> */}
        <div className='signin__element2'>
            <form className="signin__element" >
                <img className="signin__headerImage" src="../../images/igworg.svg" alt="No logo" />
                {/* <h1>Login</h1> */}
                <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='signin__loginBtn' type='submit' onClick={signIn}> Sign In </button>
            </form>
        </div>
    </div>:""
      }

      

      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="No logo" />
        {
        user?(
          <div className='dflex_Center'>
            <span>
              <strong>
              @{user.displayName}
              </strong>
            </span>
          <Button onClick={()=> auth.signOut()}> Logout</Button> 
          </div>
          ):(
            <div className="app__loginContainer">
              <Button onClick={()=> setOpenSignIn(true)} >Sign In</Button>
              <Button onClick={()=> setOpen(true)} >Sign Up</Button>
            </div>
        )
      }
      </div>
      
      {/* post */}
      <div className="app__posts">
        <div className="app__postsleft">
            {
              posts.map(({id, post}) => (
                <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imgUrl={post.imgUrl} Likes={post.likes} />
                ))
            }
        </div>
        <div className="app__postsright">

          <Signin/>
        </div>
        </div>
      {/* post */}


      {user?.displayName ?(
        <ImageUpload username={user.displayName} />
      ):(
        <h3>Sorry! You need to login...</h3>
      )}


    </div>
  );
}

export default App;
