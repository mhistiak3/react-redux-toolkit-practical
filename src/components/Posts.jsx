import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "../store/reducers/posts.slice";
import Author from "./Author";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { useEffect } from "react";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
    console.log(posts);
  }, [status, dispatch]);
  // make posts ordered by date


  if (status === "loading") {
    return <h2 className="text-center text-4xl">Loading...</h2>;
  }
  if (status === "failed") {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full max-w-lg space-y-6">
      {posts &&
        posts.map((post, index) => (
          <div className="bg-white shadow-md rounded-lg p-6" key={index}>
            <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.body}</p>
            <div className="mt-4">
              <Author userId={post.userId} />
              <TimeAgo timestamp={post.date} />
            </div>
            <ReactionButton postId={post.id} reactions={post.reactions} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
