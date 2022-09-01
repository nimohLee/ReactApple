import bg from './bg.png';
import {Shoes,data} from './data.js';
import {Button, Navbar, Container, Nav, Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import './pages.css';


let YellowBtn = styled.button`
  background : yellow;
  color : black;
  padding : 10px;
`

let Box = styled.div`
  background : grey;
  padding : 20px;
`


function Home(props){
  return(
    <>
         <div className="main-bg" style={{backgroundImage : 'url('+bg+')'}}></div>
    <Container fluid>
      <Row>
        {[0,1,2].map((a)=>{
          let imgTitle = 'shoes'+(a+1);
          return(     
            <Col>
              <Shoes idx = {a} img = {imgTitle}></Shoes>
            </Col>
          );
        })
        }
      </Row>
      </Container>
        </>

  );
}


function Detail(props){

  /**
   * useParams 라이브러리 
   * Route 사용 시 /:id 처리 한 경우 해당 사용자가 get한 id값을 불러와줌
   * ex)  localhost:3000/detail/1  -> useParams = 1
   */
    let {id} = useParams();
    let 찾은상품 = props.shoes.find(function(x) {
      return x.id == id
    });

    let[on,setOn] = useState(true);
    const alert = document.querySelector('.alert');

    useEffect(()=>{
   
    setTimeout(()=>{setOn(false)},2000);

    })

    


    console.log();
    return(
        <div className="container">
          <YellowBtn>버튼</YellowBtn>
          <Box>box</Box>
          
          {on==true?<div className='alert'>2초 이내 구매 시 할인</div>:null}
          <div className="row">
            <div className="col-md-6">
              <img src={"https://codingapple1.github.io/shop/shoes"+(parseInt(id)+1)+".jpg"} width="100%" />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}</p>
              <button className="btn btn-danger">주문하기</button> 
            </div>
          </div>
        </div> 
    );
}

export {Home,Detail};