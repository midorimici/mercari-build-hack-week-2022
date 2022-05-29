import { useState } from 'react';

const initialState = {
  name: '',
  category: '',
  content: '',
  tags: '',
};

const server = process.env.API_URL || 'http://localhost:9000';

export function Post() {
  const [values, setValues] = useState(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', values.name);
    data.append('category', values.category);
    data.append('content', values.content);
    data.append('tags', values.tags);

    fetch(server.concat('/posts'), {
      method: 'POST',
      mode: 'cors',
      body: data,
    })
      .then((response) => response.statusText)
      .then((data) => {
        console.log('POST success:', data);
        setValues({ ...values, name: '' });
        console.log(values);
      })
      .catch((error) => {
        console.error('POST error:', error);
      });
  };

  return (
    <div className="Listing">
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="category"
            onChange={onChange}
          />
          <input
            type="text"
            name="content"
            id="content"
            placeholder="content"
            onChange={onChange}
          />
          <input type="text" name="tags" id="tags" placeholder="tags" onChange={onChange} />
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}
