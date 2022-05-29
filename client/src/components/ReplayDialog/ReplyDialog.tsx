import { useState } from "react";
import { PhotoUploader } from "../PhotoUploader";
import "./ReplayDialog.css";

type Props = {
	isVisible: boolean;
};

export const ReplyDialog: React.FC<Props> = ({ isVisible }) => {
	const [image, setImage] = useState<File>();
	const [content, setContent] = useState<string>("");

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData();
		if (image !== undefined) {
			data.append("image", image);
		}
		data.append("content", content);
		console.info(data.get("image"));
		console.info(data.get("content"));
	};

	const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(event.target.value);
	};

	if (!isVisible) {
		return null;
	}

	return (
		<div className="container">
			<div className="dialog">
				<h2>あなたの持ち物をアピールしよう！</h2>
				<form onSubmit={onSubmit} className="form">
					<PhotoUploader image={image} setImage={setImage} />
					<textarea
						name="content"
						onChange={onTextChange}
						rows={8}
						cols={30}
						placeholder="どんな商品ですか？"
						maxLength={200}
					/>
					<button type="submit">投稿する</button>
				</form>
			</div>
		</div>
	);
};
