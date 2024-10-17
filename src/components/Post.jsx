import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../store/reducers/posts.slice";

const Post = () => {
  const postId = 2;
  const post = useSelector((state) => selectPostById(state, postId));
  console.log(post);
  
  if (!post) {
    return <h2>404</h2>;
  }
  const { title, body, author, date } = post;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
      <div className="flex justify-between items-center mb-4 text-gray-500">
        <span>By {author}</span>
        <span>{date}</span>
      </div>
      <p className="text-lg text-gray-700 mb-6">{body}</p>

    
    </div>
  );
};

export default Post;
