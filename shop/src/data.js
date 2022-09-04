
/**
 * id: id값 ,title : 상품명, content : 상품설명, price : 가격
 */
let data = [
    {
      id : 0,
      title : "White and Black",
      content : "Born in France",
      price : 120000
    },
  
    {
      id : 1,
      title : "Red Knit",
      content : "Born in Seoul",
      price : 110000
    },
  
    {
      id : 2,
      title : "Grey Yordan",
      content : "Born in the States",
      price : 130000
    }
  ] 
function Shoes(props){ 
  
    return(
        <div className="shoes-item">
            <img src={'https://codingapple1.github.io/shop/'+props.img+'.jpg'} width = "80%"></img>
            <h4>{props.shoesData[props.idx].title}</h4>
            <p>{props.shoesData[props.idx].content}</p>
            <p>₩ {props.shoesData[props.idx].price}</p>
        </div>
    );
}

export {Shoes, data}; // 내보내기
    // export {a,b}; /* 여러개 */