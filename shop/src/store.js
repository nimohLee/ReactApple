/* Redux */

import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useResolvedPath } from 'react-router-dom'

/**
 * useState 역할
 */

/* Redux의 state 변경하는 법
    1. state 수정해주는 함수만들고 
    - 원할 때 그 함수 실행해달라고 store.js에 요청
    */

let user = createSlice({ 
    name : 'user',
    initialState : {name : 'Kim',age : 20},
    reducers : {
            changeName(state){ // state는 기존 state
                return {name : 'Park',age : 20};
                /* return 없이 아래처럼도 가능 */
                // state.name = 'park'
            },
            plusAge(state,a){
                state.age = state.age+a.payload;
            }
    }

})

export let { changeName, plusAge } = user.actions

let stock = createSlice({ 
    name : 'stock',
    initialState : [10,11,12]
})

let items = createSlice({
    name: 'items',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],

    reducers : {
        plusStock(state,action){
            state.findIndex((a)=>{
                return a.id == action.payload;
            })
            state[action.payload].count++;
        },

        addItem(state,action){
            const item = action.payload;
            let isExist = state.findIndex((a)=>{
                return a.id == item.id;
            })
            console.log(isExist);
            if(isExist==-1){
                state.push(action.payload);
            }
            else
                state[isExist].count++;
            
            
        },
        deleteItem(state,action){
            state.splice(0,action.payload);
        }

        }
    
})
export let { plusStock, addItem, deleteItem } = items.actions

export default configureStore({
    reducer : {
        /* (중요) 여기에 등록해야 사용가능 */ 
        user : user.reducer,
        stock : stock.reducer,
        items : items.reducer
    }
})