import { useState } from 'react';
import './App.css';
import { Post } from './Post';
import { PostList } from './PostList';

function App() {
  const [shouldReload, setShouldReload] = useState(true);

  return (
    <div className="App">
      <h1> タイムライン</h1>
      <div>
        <Post onPostCompleted={() => setShouldReload(true)} />
        <PostList shouldReload={shouldReload} onListCompleted={() => setShouldReload(false)} />
      </div>
    </div>
  );
}

export default App;
