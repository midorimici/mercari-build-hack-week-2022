import React, { useState, useEffect } from 'react';

interface Item {
    name: string;
    category: string;
    content: string;
    tag: string
  };

const server = process.env.API_URL || 'http://127.0.0.1:9000';

export function PostList(){
    
    const [items, setItems] = useState<Item[]>([])
    const fetchItems = () => {
      fetch(server.concat('/posts'),
      {
        method: 'GET',
        mode: 'cors',
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('GET success:',data);
          setItems(data.items);
        })
        .catch(error => {
          console.error('GET error:',error)
        })
    }

    useEffect(() => {
      fetchItems();
    }, []);


    return (
        <div>
          { items.map((item) => {
            return (
              <div key={item.name} className='ItemList'>
                {/* TODO: Task 1: Replace the placeholder image with the item image */}
                <p>
                <span>Name: {item.name}</span>
                <br/>
                <span>Category: {item.category}</span>
                <br/>
                <span>content: {item.content}</span>
                <br/>
                <span>tag: {item.tag}</span>
                </p>
              </div>
            )
          })}
        </div>
      )

      
    }