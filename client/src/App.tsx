import './App.css';
import { Post } from './Post';
import { PostList } from './PostList';

function App() {
  return (
    <div className="App">
      <h1> タイムライン</h1>
      <div>
        <Post />
        <PostList />
      </div>
    </div>
  );
}

export default App;
