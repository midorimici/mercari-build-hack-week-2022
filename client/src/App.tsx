import './App.css';
import { Post } from './Post';
import { PostList } from './PostList';
import { ReplyDialog } from './components/ReplayDialog';

function App() {
  return (
    <div className="App">
      <h1> タイムライン</h1>
      <div>
        <Post />
        <PostList />
      </div>
      <ReplyDialog isVisible={true} />
    </div>
  );
}

export default App;
