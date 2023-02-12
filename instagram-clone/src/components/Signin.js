import React from 'react'
import Input from '@mui/material/Input/Input'
import { useState } from 'react'
import "../PostEmbed.css"
import { FaRegHeart, IoChatbubbleOutline } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";


const Signin = () => {
  return (
      <>
        <div className="main">
            <div className="instagram-card">
              <div className="instagram-card-header">
                <div className="usernameandavatar">

                <img src="../../images/bggg.jpg" className="instagram-card-user-image"/>
                <a className="instagram-card-user-name" href="https://www.instagram.com/followmeto/">followmeto</a>
                </div>
                <div className="instagram-card-time">58 min</div>
            </div>
        
            <div >
              <img className='intagram-card-image' src="../../images/bggg.jpg"/>
            </div>
            <div className="ig__heart">
              <FaRegHeart/>
              <AiOutlineMessage/>
              <FiSend/>
            </div>
            <div className="instagram-card-content">
            <p className="likes">18M Likes</p>
            <p><a className="instagram-card-content-user" href="https://www.instagram.com/followmeto/">followmeto</a> So excited to have made it to Lapland! Our first stop was sleeping inside a room made entirely of ice at the Kemi Snow Hotel 😱 Stoked that I've ticked this off my bucket list and never have to do it again... Let's just say the novelty of sleeping in -5 degrees temperature quickly wears off (but hey, it was a COOL experience nonetheless) 😜❄️ <a className="hashtag" href="https://www.instagram.com/explore/tags/visitkemi/">#visitkemi</a></p>
            <p className="comments">48 comments</p>
            <br/><a className="user-comment" href="https://www.instagram.com/anitzakm/">sanguine.j@loaf_made</a> wowwwwww<br/>
            <br/><a className="user-comment" href="https://www.instagram.com/anitzakm/">spainstakeoverWow</a> 😍<br/>
            <br/><a className="user-comment" href="https://www.instagram.com/anitzakm/">edieandottotravelsSo</a> cool ❄️<br/>
            <hr/>
            </div>
            
            <div className="instagram-card-footer">
            <a className="footer-action-icons" href="#"><i className="fa fa-heart-o"></i></a>
            <FaRegHeart/>
            <input className="comments-input" type="text" placeholder="Add a comment..."/>
            <a className="footer-action-icons" href="#"><i className="fa fa-ellipsis-h"></i></a>
            </div>

        </div>
  </div>
      </>
  )
}

export default Signin