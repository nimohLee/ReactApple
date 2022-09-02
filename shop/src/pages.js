import bg from './bg.png';
import {Shoes,data} from './data.js';
import {Button, Navbar, Container, Nav, Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import './pages.css';
import axios from 'axios';

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
    

    useEffect(()=>{
      setOn(true);
      let a = setTimeout(()=>{setOn(false)},2000);   // 기존 타이머 제거 후 타이머 실행
      return() =>{
        /* 여기 있는 게 먼저 실행됨 ( clean up function - html 같은 거 싹 지우고 실행할 수 있음)
           주로 1 .타이머제거 2. socket 연결요청제거 3. ajax요청 중단 등 데이터요청 관련 등에 사용됨
          컴포넌트 unmount 시에 1회 실행됨 mount 시 실행되는 것 아님
           */
        clearTimeout(a); // 타이머 제거  
      }
    }, [count] // []안에 있는 변수 or state가 변경이 있을 시 useEffect를 실행)
    );

    useEffect(()=>{
      alert('hi');
    },[text]);


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
              <h4 className="pt-5" >{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}</p>
              <button className="btn btn-danger" onClick={()=>{{setCount(count+1)}}}>주문하기</button> 
            </div>
          </div>
        </div> 
    );
}

export {Home,Detail};