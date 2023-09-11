import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
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
            <div className="row p-4">
            <Sidebar></Sidebar>
                <div className="col-md-10 rounded-4 ms-4" style={{backgroundColor: 'rgba(220,220,220,0.4)', height: '80vh', backdropFilter: 'blur(5px)'}}>
                    {user && (
                        user.id === currentUserId ? (
                        <>
                            <form onSubmit={createPost}>
                                <div className='mb-3'>
                                <input type='text' className='form-control' placeholder='some text' value={text} onChange={e => setText(e.target.value)} />
                                </div>
                                <button type='submit' className='btn btn-primary'>create post</button>
                            </form>

                        </>
                        
                        ) : (
                        <p>Вы находитесь в чужом профиле, посты доступны только в вашем профиле.</p>
                        )
                    )}
                    <h1>{user?.email}</h1>


                    {user && (
                    <React.Fragment>
                        {posts.map(post => (
                        <div className='mb-3 bg-light rounded p-2 shadow border border-dark' key={post.id}>
                            <a>{user.name} {post.createdAt}</a>
                            <hr />
                            <a>{post.text}</a>
                            <hr />
                            {user && (
                                user.id === currentUserId ? (
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
                                ) : (
                                <></>
                                )
                            )}  
                        </div>
                        ))}
                    </React.Fragment>
                    )}
                </div>
            </div>
        </div>
     
    )
}

export default Profile;

