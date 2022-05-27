import React, { useState } from 'react';



export function Post(){
    const initialState = {
        name: "",
        category: "",
        content: "",
        tag: "",
      };
      const [values, setValues] = useState(initialState);
      const server = process.env.API_URL || 'http://127.0.0.1:9000';
      const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData()
        data.append('name', values.name)
        data.append('category', values.category)
        data.append('content', values.content)
        data.append('tag', values.tag)
        //console.log(data.get('name'))
  
        fetch(server.concat('/posts'), {
          method: 'POST',
          mode: 'cors',
          body: data,
        })
        .then(response => response.json())
        .then(data => {
          console.log('POST success:', data);
        })
        .catch((error) => {
          console.error('POST error:', error);
        })


    }
        
    
      return (
        <div className='Listing'>
          <form onSubmit={onSubmit}>
            <div>
                <input type='text' name='name' id='name' placeholder='name' onChange={onChange} required/>
                <input type='text' name='category' id='category' placeholder='category' onChange={onChange}/>
                <input type='text' name='content' id='content' placeholder='content' onChange={onChange}/>
                <input type='text' name='tag' id='tag' placeholder='tag' onChange={onChange}/>
                
                <button type='submit'>Post</button>
                
            </div>
          </form>
        </div>
    
      );

      
    }