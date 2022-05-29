import { useState } from "react";
import "./App.css";
import { Post } from "./Post";
import { PostList } from "./PostList";
import { NavBar } from "./NavBar";

function App() {
	const [shouldReload, setShouldReload] = useState(true);

	return (
		<div className="App">
			<div className="Header">
				<p className="Logo">MerMatch</p>
				<p> タイムライン</p>
			</div>
			<NavBar />
			<div>
				<Post onPostCompleted={() => setShouldReload(true)} />
				<PostList
					shouldReload={shouldReload}
					onListCompleted={() => setShouldReload(false)}
				/>
			</div>
		</div>
	);
}

export default App;
