import Author from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { useSelector } from "react-redux";
import { selectPostById } from "../store/reducers/posts.slice";

const PostExp = ({ postId }) => {
    const post = useSelector((state) => selectPostById(state, postId));
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
      <p className="text-gray-600 mt-2">{post.body}</p>
      <div className="mt-4">
        <Author userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButton postId={post.id} reactions={post.reactions} />
    </div>
  );
};
export default PostExp;
