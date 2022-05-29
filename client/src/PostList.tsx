import { useState } from 'react';

interface Item {
  name: string;
  category: string;
  content: string;
  tag: string;
}

export function PostList() {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item.name} className="ItemList">
            <p>
              <span>Name: {item.name}</span>
              <br />
              <span>Category: {item.category}</span>
              <br />
              <span>content: {item.content}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
