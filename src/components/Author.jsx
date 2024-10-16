import { useSelector } from "react-redux";
import { selectAllusers } from "../store/reducers/users.slice";

const Author = ({ userId }) => {
  const users = useSelector((state) => selectAllusers(state));
  const author = users.find((user) => user.id == userId);
  return (
    
      <span className="text-gray-600  text-[12px] p-1 rounded-md bg-gray-200">
        Post By {author ? author.name:'Unknown Author'}
      </span>
    
  );
};
export default Author;
