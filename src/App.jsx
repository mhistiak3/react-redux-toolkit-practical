import AddPost from "./components/AddPost";
import Posts from "./components/Posts";

const App = () => {
  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <AddPost/>
      <Posts />
    </div>
  );
};
export default App;
