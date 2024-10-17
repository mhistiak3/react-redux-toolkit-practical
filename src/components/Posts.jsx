import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
  selectPostIds,
} from "../store/reducers/posts.slice";

import {  useEffect } from "react";
import PostExp from "./PostExp";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPostIds);
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
        posts.map((postId, index) => (
          <PostExp postId={postId} index={index} key={index} />
        ))}
    </div>
  );
}

export default Posts;
