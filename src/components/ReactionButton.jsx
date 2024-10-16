import { useDispatch } from "react-redux";
import { reactionsAdded } from "../store/reducers/posts.slice";

const ReactionButton = ({ postId, reactions }) => {
  const reactionsEmoji = {
    thumbUp: "👍",
    heart: "❤️",
    haha: "😂",
  };

  const dispatch = useDispatch();
  return (
    <div className="flex justify-end space-x-4 mt-4">
      {Object.entries(reactions).map(([key, value]) => (
        <span
          key={key}
          role="img"
          aria-label="like"
          className="cursor-pointer text-2xl"
          onClick={() => dispatch(reactionsAdded({ postId, key }))}
        >
          {reactionsEmoji[key]} {value}
        </span>
      ))}
    </div>
  );
};
export default ReactionButton;
