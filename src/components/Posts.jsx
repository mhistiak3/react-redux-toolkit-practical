import { useSelector } from "react-redux";
import { selectAllPosts } from "../store/reducers/posts.slice";
import Author from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const Posts = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date));


  return (
    <div className="w-full max-w-lg space-y-6">
      {
        orderedPost.map((post) => (
          <div className="bg-white shadow-md rounded-lg p-6" key={post.id}>
            <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.content}</p>
            <div className="mt-4">
              <Author userId={post.userId} />
              <TimeAgo timestamp={post.date} />
            </div>
           <ReactionButton postId={post.id} reactions={post.reactions}/>
          </div>
        ))}
    </div>
  );
};

export default Posts;
