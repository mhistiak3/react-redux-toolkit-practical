import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../store/reducers/posts.slice";
import { selectAllusers } from "../store/reducers/users.slice";
const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllusers);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !userId) return;


    dispatch(postAdded(title, content, userId));
    setTitle("");
    setContent("");
  };
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mb-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Post</h2>
      <input
        type="text"
        placeholder="Post Title"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="users">Author</label>
      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none mt-1"
        id="users"
      >
        <option value="">Select Author</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Post Content"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-32 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button disabled={!canSave} className={"w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 " + (canSave ? "cursor-pointer" : "cursor-not-allowed")}>
        Post
      </button>
    </form>
  );
};
export default AddPost;
