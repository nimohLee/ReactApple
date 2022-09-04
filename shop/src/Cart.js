import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, plusAge } from "./store.js"
import { plusStock , deleteItem} from "./store.js"


function Cart() {
  let state = useSelector((state)=> state);
  let a = useSelector((state) => state.user); // Redux store 가져와줌
  let items = useSelector((state) => state.items);
 
  /**
   * store.js에 요청하는 함수
   */
  let dispatch = useDispatch();

  return (
    <div>

      {state.user.age}살 {state.user.name}의 장바구니
        
        <button onClick={()=>{dispatch(plusAge()); console.log(state.user.age)}}>+</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>안녕</td>
            <td>안녕</td>
            <td>안녕</td>
          </tr>
          {items.map((item,i) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                    <button onClick={()=>{
                      
                        dispatch(plusStock(i))
                    }}>+</button>
                </td>
                <td>
                  <button onClick={()=>{
                      
                        dispatch(deleteItem(i));
                  }}>삭제</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
