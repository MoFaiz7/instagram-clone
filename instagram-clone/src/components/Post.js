import React, {useState, useEffect} from 'react'
import './Post.css'
import  Avatar  from '@mui/material/Avatar'
import { db } from '../firebase'

import firebase from 'firebase/compat/app'


import { FaRegHeart, IoChatbubbleOutline } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { AiOutlineMessage, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import avatar from '../../images/linkedin.png'
const Post = ({postId, user, username, caption, imgUrl, Likes}) => {

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [like, setLike] = useState([])
  // const [likeTogg, setLikeTogg] = useState('like__white')

  useEffect(() => {
    let unsubscribe, likerCounter;
    if(postId){
      unsubscribe = db.collection("post").doc(postId).collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) =>{
        setComments(snapshot.docs.map((doc)=>({
          id:doc.id,
          comm: doc.data()
        })));
      });
      // console.log(comments);
      likerCounter = db.collection("post").doc(postId).collection('likes').onSnapshot((snapshot) =>{
        setLike(snapshot.docs.map((doc)=>({
          id:doc.id,
          comm: doc.data()
        })));
      });
    }
  
    return () => {
      unsubscribe();
      likerCounter();
    }
  }, [postId])

  const postComment = (e)=>{
    e.preventDefault();
    db.collection('post').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setComment('');
  }

  const postLike2 = async ()=>{
    const likesRef = db.collection('post').doc(postId).collection('likes');
    const snapshot = await likesRef.where('username', '==', user.displayName).get();
      if (snapshot.empty) {
        db.collection('post').doc(postId).collection('likes').doc(user.displayName).set({
          username: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        // setLikeTogg('like__red');
      }
      else{
        const del = await likesRef.doc(user.displayName).delete()
        // setLikeTogg('like__white');
      }
  }

  return (
    <div className='post'>

        {/* avatar and username */}
        <div className="post__header">
          <Avatar className='post__avatar' src="../../images/bggg.jpg" alt="Remy Sharp" />
          <h3>{username}</h3>
          
        </div>
        {/* images  */}
        <img className='post__image' src={imgUrl} alt="NO Post" />

        <div className="ig__heart">
              <AiOutlineHeart onClick={postLike2} />
              <AiOutlineMessage/>
              <FiSend/>
            </div>

        {/* username + caption  */}
        <p className="post__likesCount">{like.length} Likes</p>  
        <h4 className='post__text'><strong className='post__username' >{username}</strong> {caption}</h4>
        <p className="post__commentsCount">{comments.length} comments</p>  

        

        <div className="post__comments">
        {comments.map(({id, comm}) =>(
          <p key={id}>
            <strong>{comm.username}</strong> {comm.text}
          </p>
        ))}
        {/* {upadateCount} */}
        {/* {no=0} */}
        </div>

        {user && (
          <form className='post__commentBox' >
          <input
            className='post__input'
            type='text' 
            placeholder="Add a comment..."
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
          />

          <button
            className='post__btn'
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >Post</button>

        </form>
        )}

    </div>
  )
}

export default Post


{/*
  const cityRef = db.collection('cities').doc('DC');

// Set the 'capital' field of the city
const res = await cityRef.update({capital: true});

*/ }