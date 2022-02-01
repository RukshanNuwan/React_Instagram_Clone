import React, {useState, useEffect, forwardRef} from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import {db} from "./firebase";
import {addDoc, collection, doc, onSnapshot} from "firebase/firestore";

const Post = forwardRef(
  ({user, username, postId, imageUrl, caption}, ref) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
      let unsubscribe;
      if (postId) {
        const docRef = doc(db, 'posts', postId);
        const colRef = collection(docRef, 'comments');

        unsubscribe = onSnapshot(colRef, (snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
      }

      return () => {
        unsubscribe();
      };
    }, [postId]);

    const postComment = (e) => {
      e.preventDefault();

      const docRef = doc(db, 'posts', postId);
      const colRef = collection(docRef, 'comments');

      addDoc(colRef, {
        text: comment,
        username: user.displayName,
      }).then(() => {
        console.log('data added');
      });

      setComment("");
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__header">
          <Avatar
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
          />
          <h3>{username}</h3>
        </div>

        <img className="post__image" src={imageUrl} alt="post"/>
        <h4 className="post__text">
          {username} <span className="post__caption">{caption}</span>
        </h4>

        <div className="post__comments">
          {comments.map((comment, index) => (
            <p key={index}>
              <b>{comment.username}</b> {comment.text}
            </p>
          ))}
        </div>

        {user && (
          <form className="post__commentBox">
            <input
              className="post__input"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              disabled={!comment}
              className="post__button"
              type="submit"
              onClick={postComment}
            >
              Post
            </button>
          </form>
        )}
      </div>
    );
  }
);

export default Post;
