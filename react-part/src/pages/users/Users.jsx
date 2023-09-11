import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'


const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => { 
    
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    axios.get('http://localhost:5000/users', { headers })
        .then(response => setUsers(response.data))
        .catch(error => console.error(error));

    axios.get('http://localhost:5000/users/me', { headers })
      .then(response => setCurrentUser(response.data))
      .catch(error => console.error(error));
  }, []);
  



  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    axios.delete(`http://localhost:5000/users/${id}`, {headers})
      .then(response => {
        console.log(response.data); // Результат запроса успешно обработан
      })
      .catch(error => {
        console.error('Произошла ошибка!', error);
      });
  
    setUsers(users.filter(user => user.id !== id));
  };


  return (
    <div className="container-fluid" style={{height: '100vh'}}> 
      <div className='col p-4'>
        <div className="row">
          <Sidebar></Sidebar>
          <div className='col-10 ms-4 ' style={{height: '80vh', backdropFilter: 'blur(5px)'}}>
            <div className="rounded-4 " style={{backgroundColor: 'rgba(220,220,220,0.4)', height: '10%', backdropFilter: 'blur(5px)'}}></div>
            <div className="rounded-4 mt-4" style={{backgroundColor: 'rgba(220,220,220,0.4)', height: '86.9%', backdropFilter: 'blur(5px)'}}>
            {users.length === 0 ? (
                    <>Loading</>
                  ) : (
                    <div className="">
                      <table className='rounded-4 ms-1 mt-3 p-5' style={{backgroundColor: 'rgba(255,255,255,0.6)', minWidth: '600px'}}>
                       <thead>
                          <tr className='p-2'>
                            <th className='p-2'></th>
                            <th >EMAIL</th>
                            <th >NAME</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody >
                          {users.map(user => (
                            <tr  key={user.id}>
                              <th ></th>
                              <td> <a title='Перейти к профилю' href={`users/${user.id}`}>{user.email}</a></td>                    
                              <td>{user.name}</td>
                              {currentUser && (
                                <>
                                  {currentUser.role?.value !== 'ADMIN' ? (
                                    <td></td>
                                  ) : (
                                    <td><button title='Удалить'  style={{alignItems: 'center', justifyContent: 'center', border: 'none'}} type="button" className="btn" onClick={() => handleDelete(user.id)}>❌</button></td>
                                  )}
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                    </table>
                    </div>
                    
                  )}
            </div>
          </div>   
        </div>
      </div>
    </div>
    
  
  )
}

export default Users
