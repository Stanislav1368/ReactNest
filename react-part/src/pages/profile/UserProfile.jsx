import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserProfile.scss';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState('');
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('http://localhost:5000/users/' + id);
            setUser(response.data);
            setPosts(response.data.posts);
        };
        const token = localStorage.getItem('token');
        setToken(token);
        const headers = { 'Authorization': `Bearer ${token}` };
    
        axios.get('http://localhost:5000/users/me', { headers })
            .then(response => {
              setCurrentUserId(response.data.id);
            })
            .catch(error => console.error(error));
        fetchUser();
    }, [id]);

    const createPost = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post(`http://localhost:5000/users/${user.id}/posts`, { text });
            setPosts([...posts, response.data]);
            setText('');
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = (id) => {   
        axios.delete(`http://localhost:5000/users/posts/${id}`)
          .then(response => {
            console.log(response.data); // Результат запроса успешно обработан
          })
          .catch(error => {
            console.error('Произошла ошибка!', error);
          });
      
        setPosts(posts.filter(post => post.id !== id));
    };
  return (
    <div className="container-fluid" style={{height: '100vh'}}> 
      <div className='col p-4'>
        <div className="row">
          <Sidebar></Sidebar>
          <div className='col-10 ms-4 ' style={{height: '80vh', backdropFilter: 'blur(5px)'}}>
            <div className="rounded-4 " style={{backgroundColor: 'rgba(220,220,220,0.4)', height: '10%', backdropFilter: 'blur(5px)'}}></div>
            <div className="rounded-4 mt-4 mb-4 row" style={{backgroundColor: 'rgba(220,220,220,0.4)', height: '86.9%', backdropFilter: 'blur(5px)'}}>
                <div style={{backgroundColor: 'rgba(255,255,255,0.6)', height: '96%', maxWidth: '23%'}} className='rounded-4 ms-3 mt-3 p-2 '>
                    <p style={{width: '150px'}} className='border-bottom border-black'>{user?.name}</p>
                    <p style={{width: '150px'}} className='border-bottom border-black'>{user?.email}</p>
                </div>
                <div style={{height: '96%', maxWidth: '65.5%'}}  className='me-1 p-0 mt-3 ms-4'>
                    <div style={{backgroundColor: 'rgba(255,255,255,0.6)', height: '70%', maxWidth: '100%'}} className='rounded-4 p-2'>
                        <h1 >Posts</h1>
                        {user && (
                                user.id === currentUserId ? (
                                <>
                                    <form onSubmit={createPost}>
                                        <div className='mb-3'>
                                        <textarea type='area' placeholder='some text' value={text} onChange={e => setText(e.target.value)} />
                                        </div>
                                        <button style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '15%',
                                            marginLeft: '10px',
                                            height: '30px',
                                            border: 'none',
                                            borderRadius: '6px',
                                            backgroundColor: 'rgba(220, 0, 0, 0.4)',
                                        }} type='submit' className='btn'>create post</button>
                                    </form>
                                </>
                                ) : (
                                null
                                )
                        )}
                        <div style={{ overflow: 'auto', height: '61%'}} className='p-0 m-0'>
                            {user && (
                                    <React.Fragment>
                                        {posts.map(post => (
                                        <div className='rounded mb-4' key={post.id}>
                                            <p>{post.createdAt}</p>
                                            <div style={{width:'40%'}} className="d-flex align-items-center justify-content-between">
                                                <a>{post.text}</a>
                                                {user && (
                                                    user.id === currentUserId ? (
                                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(post.id)}>❌</button>
                                                    ) : (
                                                    <></>
                                                    )
                                                )}
                                            </div>
                                            
                                        </div>
                                        ))}
                                    </React.Fragment>
                                )}
                        </div>
                            
                    </div>
                </div>
            </div>
          </div>   
        </div>
      </div>
    </div>

  )
}

export default UserProfile
