import React, { useState, useEffect } from "react";
import { ReplyDialog } from "./components/ReplayDialog";
import "./PostList.css";

interface Item {
	name: string;
	category: string;
	content: string;
	tags: string;
}

type Props = {
	isVisible: boolean;
};

const server = process.env.API_URL || "http://127.0.0.1:9000";

export function PostList() {
	const [items, setItems] = useState<Item[]>([]);
	const [visible, setVisible] = useState<boolean>(false);

	const fetchItems = () => {
		fetch(server.concat("/posts"), {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("GET success:", data);
				setItems(data);
			})
			.catch((error) => {
				console.error("GET error:", error);
			});
	};

	useEffect(() => {
		fetchItems();
	}, []);

	const postlist = (
		<div>
			{items.map((item) => {
				return (
					<div key={item.name} className="ItemList">
						{/* TODO: Task 1: Replace the placeholder image with the item image */}
						<div className="Info">
							<div className="Box">Name: {item.name}</div>
							<div className="Box">Category: {item.category}</div>
							<div className="Box">tag: {item.tags}</div>
						</div>
						<div className="Container">
							<div className="Content">content: {item.content}</div>
							<button onClick={() => setVisible(true)}>紹介</button>
						</div>
					</div>
				);
			})}
		</div>
	);

	return (
		<div>
			{postlist}
			<ReplyDialog isVisible={visible} />
		</div>
	);
}
