import Button  from '@mui/material/Button/Button'
import React, {useState} from 'react'
import {db, storage} from "../firebase"
import firebase from 'firebase/compat/app'
import './ImageUpload.css';

const ImageUpload = ({username}) => {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState('')

    const handleChange = (e)=>{
        if(e.target.files[0]){ //select the first selected file if multiple files are selected
            setImage(e.target.files[0])
        }
    }

    const handleUpload = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress function
                const progr = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progr)
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            ()=>{
                //complete function
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    //post image inside db
                    db.collection("post").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imgUrl: url,
                        username: username,
                        likes: 0,
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }
        );
    }

  return (
    <div className='imageupload' >
        

      {/* caption input  */}
      {/* File Picker */}
      {/* post button  */}
    <input type="text" name="" id="input__caption" placeholder='Enter a caption...' onChange={e => setCaption(e.target.value)} value={caption} />
    <input type="file" name="" id="input__file" onChange={handleChange} />
    <progress className='imageupload___progress' value={progress} max="100" />
    <Button onClick={handleUpload} color='primary' >Upload</Button>
    </div>
  )
}

export default ImageUpload