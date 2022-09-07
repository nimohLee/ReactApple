import { lazy, useEffect, useState, Suspense } from "react";

import logo from './logo.svg';
import './App.css';
/* import bootstrap components */
import {Button, Navbar, Container, Nav, Col, Row} from 'react-bootstrap';
import bg from './bg.png'; // import로 이미지 불러오기
import {Shoes,data} from './data.js';
import {Routes,Route,Link, useNavigate, Outlet} from 'react-router-dom'
import {Home,Detail} from './pages.js';
import Cart from './Cart.js';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

// const Detail = lazy(()=> import('./pages.js'))

let Label = styled.div`
  
  color : white;
 
`

function App() {

  let obj = {name : 'kim'}
 
  localStorage.setItem('data', JSON.stringify(obj));

  let 꺼낸거 = localStorage.getItem('data');
  console.log(JSON.parse(꺼낸거));

  /**
   * 네비게이트 하는 변수
   */
  let navigate = useNavigate();
  let [shoes,setShoes] = useState(data);
  let userdata;

let result = useQuery(['작명'], ()=>
 axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{return a.data})
);

 
 
 
 
        return (
    <div className="App">

 <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link> 
               <Nav.Link onClick={()=>{navigate('/detail/0')}}>Detail</Nav.Link>
                <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
             </Nav>
        
        <Nav className="ms-auto">
          {/* {result.isLoading ? "로딩중" : result.data.name};
           */}
           <Label>안녕하세유</Label>
        </Nav>
        </Container>
      </Navbar>
    <Link to="/">홈</Link>
    <Link to="/detail">상세페이지</Link>
    <button onClick={()=>{
      let shoesCopy = [...shoes];
      shoesCopy.sort(function(a, b) {
        var nameA = a.title.toUpperCase(); // ignore upper and lowercase
        var nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // 이름이 같을 경우
        return 0;
      });
      setShoes(shoesCopy);
    }} >정렬</button>
    <Routes>
      
      {/* <Route path = "/detail/0" element = {<Detail shoes = {shoes} idx = {0} />} />
      <Route path = "/detail/1" element = {<Detail shoes = {shoes} idx = {1}/>} />
      <Route path = "/detail/2" element = {<Detail shoes = {shoes} idx = {2}/>} /> */}
      <Route path = "/detail/:id" element = {<Detail shoes = {shoes} idx = {2}/>} />
      <Route path='/' element = {<Home/> }></Route>
      <Route path='/event' element = {<Event/>}>
        <Route path='one' element = {<div>첫 주문 시 양배추즙 서비스</div>}/>
        <Route path='two' element = {<div>생일기념 쿠폰받기</div>}/>
      </Route>
      <Route path='/about' element = {<About/>}>
        <Route path='member' element = {<div>멤버임</div>}></Route>
        <Route path='location' element = {<div>위치정보임</div>}></Route>
      </Route>
      <Route path='*' element= {<h4>없는 페이지입니다</h4>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
    </Routes>
  
    


      {/* <Row>
        <Col>
          
          <Shoes >

          </Shoes>
          </Col>
        <Col>
        <img src="https://codingapple1.github.io/shop/shoes2.jpg" alt="" width = "80%"></img>
        <h4>{data[1].title}</h4>
        <p>{data[1].content}</p>
        <p>₩ {data[0].price}</p>
        </Col>
        <Col><img src="https://codingapple1.github.io/shop/shoes3.jpg" alt="" width = "80%"></img>
        <h4>{data[2].title}</h4>
        <p>{data[2].content}</p>
        <p>₩ {data[0].price}</p>
        </Col>
      </Row> */}
  
    
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>

  )
}


export default App;
