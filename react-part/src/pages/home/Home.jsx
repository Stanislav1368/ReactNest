import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './Home.scss';

const Home = () => {

  const [boards, setBoards] = useState([
    {id: 1, title: 'Сделать', items: [{id: 1, title: 'Пойти в магазин'}, {id: 2, title: 'Прочитать книгу'}]},
    {id: 2, title: 'В процессе', items: [{id: 3, title: 'Домашка'}, {id: 4, title: 'Готовка'}]},
    {id: 3, title: 'Сделано', items: [{id: 5, title: 'Попить воды'}]}
  ])

  return (
    <div className="container-fluid" style={{height: '100vh'}}> 
      <div className='col p-4'>
        <div className="row">
          <Sidebar></Sidebar>
          <div className='col-10 ms-4 ' style={{height: '80vh', backdropFilter: 'blur(5px)'}}>
            <div className="rounded-4 " style={{backgroundColor: 'rgba(220,220,220,0.4)', height: '10%', backdropFilter: 'blur(5px)'}}></div>
            <div className="rounded-4 mt-4" style={{backgroundColor: 'rgba(220,220,220,0.4)', height: '86.9%', backdropFilter: 'blur(5px)'}}>
              <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around', padding: '16px'}}>
              {boards.map(board => (
                <div className="board">
                  <div className="board__title">{board.title}</div>
                  {board.items.map(item => (
                    <div className="item">{item.title}</div>
                  ))}
                </div>
              ))}
              </div>
              
            </div>
          </div>   
        </div>
      </div>
         
    </div>
  );
};

export default Home;

{/* <div className='col p-4'>
        <Navbar></Navbar>
        <div className="row">
        <Sidebar></Sidebar>
          <div className="col-md-10 rounded-4 ms-4 " style={{backgroundColor: 'rgba(220,220,220,0.4)', height: '80vh', backdropFilter: 'blur(5px)'}}>
            <div style={{backgroundColor: 'rgba(255,255,255,0.6)', height: '150px', maxWidth: '350px'}} className='rounded-4 ms-1 mt-3 p-2'>Widget1</div>
            <div style={{backgroundColor: 'rgba(255,255,255,0.6)', height: '150px', maxWidth: '350px'}} className='rounded-4 ms-1 mt-3 p-2'>Widget2</div>
          </div>
        </div>
      </div> */}