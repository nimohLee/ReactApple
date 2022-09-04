import bg from './bg.png';
import {Shoes,data} from './data.js';
import {Button, Navbar, Container, Nav, Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import './pages.css';
import axios from 'axios';
import { addItem } from './store.js';
import { useDispatch, useSelector } from "react-redux";



let YellowBtn = styled.button`
  background : yellow;
  color : black;
  padding : 10px;
`

let Box = styled.div`
  background : grey;
  padding : 20px;
`

let FlexBox = styled.div`
  display : flex;
`
let count = 0;




function Home(props){
  let [onData,setOnData] = useState(false);
  let [jsonData,setJsonData] = useState();
  let [shoes,setShoes] = useState(data);
  let [loading,setLoading] = useState(false);
  return(
    <>
         <div className="main-bg" style={{backgroundImage : 'url('+bg+')'}}></div>
    <Container fluid>
      <Row>
        {shoes.map((a,i)=>{
          let imgTitle = 'shoes'+(i+1);
          return(     
            <Col>
              <Shoes shoesData = {shoes} idx = {i} img = {imgTitle}></Shoes>
            </Col>
          );
        })
        }
      </Row>
      </Container>
        {/* ajax 사용 옵션
        1.  XMLHttpRequest
        2. fetch()
        3. axios 같은 라이브러리*/} 

      <button onClick={()=>{ 
          setLoading(true);
          if(count==0){
          axios.get('https://codingapple1.github.io/shop/data2.json').then((j)=>{
          let copy = [...shoes, ...j.data];
          setShoes(copy);
          count++;
          setLoading(false);
        }).catch(()=>{console.log('실패');setLoading(false);});}
          else if(count==1){
            axios.get('https://codingapple1.github.io/shop/data3.json').then((j)=>{
              let copy = [...shoes, ...j.data];
              setShoes(copy);
              count++;
              setLoading(false);
            }).catch(()=>{console.log('실패');setLoading(false);})
          }else if(count>=2){
            alert('상품이 더 이상 존재하지 않습니다');
            setLoading(false);
          }

      }}>버튼</button>

      {onData == true ?<EventItem data={jsonData.data}/>:null}
     
     {
      loading == true ?<div><h4>로딩중입니다....</h4></div>:null
     }

        </>

  );
}

function EventItem(props){
return(
  <div>
    {
      props.data.map((a)=>{
        
        return(
          <FlexBox>
            <h3>{a.id}</h3>
            <h4>{a.title}</h4>
            <p>{a.price}</p>
            </FlexBox>
        );

      })

    }

  </div>

);


}


function Detail(props){

  let state = useSelector((state)=> state);
  let dispatch = useDispatch();


  /**
   * useParams 라이브러리 
   * Route 사용 시 /:id 처리 한 경우 해당 사용자가 get한 id값을 불러와줌
   * ex)  localhost:3000/detail/1  -> useParams = 1
   */
    let {id} = useParams();
    let 찾은상품 = props.shoes.find(function(x) {
      return x.id == id
    });
    

    let [count,setCount] = useState(0);
    let[on,setOn] = useState(true);
    let[text,setText] = useState("");
    let[nav,setNav] = useState(0);
    let[fade,setFade] = useState('');

    useEffect(()=>{
      setOn(true);
      let a = setTimeout(()=>{setOn(false); setFade('end')},2000);   
      let b = setTimeout(()=>{ setFade('end')},500);   // 기존 타이머 제거 후 타이머 실행
      return() =>{
        /* 여기 있는 게 먼저 실행됨 ( clean up function - html 같은 거 싹 지우고 실행할 수 있음)
           주로 1 .타이머제거 2. socket 연결요청제거 3. ajax요청 중단 등 데이터요청 관련 등에 사용됨
          컴포넌트 unmount 시에 1회 실행됨 mount 시 실행되는 것 아님
           */
          setFade('');
        clearTimeout(a); // 타이머 제거  
        clearTimeout(b);
      }
    }, [count] // []안에 있는 변수 or state가 변경이 있을 시 useEffect를 실행)
    );

    return(
        <div className={`container start ${fade}`}>
          <YellowBtn>버튼</YellowBtn>
          <Box>box</Box>
          
          {on==true?<div className='alert'>2초 이내 구매 시 할인</div>:null}
          <div className="row">
            <div className="col-md-6">
              <img src={"https://codingapple1.github.io/shop/shoes"+(parseInt(id)+1)+".jpg"} width="100%" />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5" >{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}</p>
              <button className="btn btn-danger" onClick={()=>{{
                dispatch(addItem({id : 찾은상품.id, name : 찾은상품.title, count : +1}));
              }
                
                }}>   주문하기</button> 
            </div>
          </div>
          <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=>{setNav(0)}}>버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=>{setNav(1)}}>버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=>{setNav(2)}}>버튼2</Nav.Link>
          </Nav.Item>
        </Nav>
        
        <TabContent nav = {nav}></TabContent>
        
        </div> 
    );
}

function TabContent({nav}){ // props 위치에 {} 쓰고 가능
  // if ( nav == 0){
  //     return <div>내용0</div>
  // }
  // if (nav == 1 ){
  //     return <div>내용1</div>
  // }
  // if (nav == 2 ){
  //     return  <div>내용2</div>
  // }

  let [fade,setFade] = useState('');

  // automatic batching - 가까이에 있는 state set함수 모아서 한번에 렌더링해줌(리액트 최신버전)
  useEffect(()=>{
    let a = setTimeout(()=>{setFade('end')},100);
    
    return ()=>{
      clearTimeout(a);
      setFade('');
    }
  },[nav])

  return <div className={"start "+fade}>{[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][nav]}</div>
}


export {Home,Detail};