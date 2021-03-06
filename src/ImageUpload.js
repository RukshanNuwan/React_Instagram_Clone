import React, {useState} from "react";
import {storage, db} from "./firebase";
import {Input, Button} from "@material-ui/core";
import Axios from './axios';
import "./ImageUpload.css";
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {ref} from 'firebase/storage';

const ImageUpload = ({username}) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = ref(storage, `images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);

            Axios.post('/upload', {
              caption: caption,
              user: username,
              image: url
            }).then(() => {
            });

            // post image inside db
            const colRef = collection(db, 'posts');

            addDoc(colRef, {
              imageUrl: url,
              caption: caption,
              username: username,
              timestamp: serverTimestamp(),
            }).then(() => {
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100"/>
      <Input
        placeholder="Enter a caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <div>
        <input type="file" onChange={handleChange}/>
        <Button className="imageupload__button" onClick={handleUpload}>
          Upload
        </Button>
      </div>

      <br/>
    </div>
  );
};

export default ImageUpload;
