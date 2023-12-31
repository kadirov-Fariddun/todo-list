import {React,useEffect,useRef,useState} from 'react';
import PropTypes from 'prop-types';
// components
import Loading from '../loading/Loading';
import InputSearch from '../input-search/inputSearch';
//styles
import './todos.scss';
//images
import addBtn from '../images/add-btn.svg';
import emptyPng from '../images/empty.png';
import emptyDarkPng from '../images/empty-dark.png';
export default function Todo(props) {
  const {searchValue,valueFilter} = props;
  // ,setTodosAll,setTodosActive,setTodosCompleted,setTodosSearch
  // функция которая получает список todos из сервера 
  const [todos,setTodos] = useState([]);
  const [searchFilterTodos,setSearchFilterTodos] = useState([]);
  const [showForm,setShowForm] = useState(false);
  const [addInputValue,setAddInputValue] = useState('');
  const [addObj,setAddObj] = useState({});
  const [id,setId] = useState(1);
  const [editValue,setEditValue] = useState('');
  const [completedTodos,setCompletedTodos] = useState([]);
  const [activeTodos,setActiveTodos] = useState([]);
  function completedTodosFunc(){
    let newArr = [...todos];
    let res = newArr.filter(item=>item.completed===true);
    return setCompletedTodos(res);
  }
  function activeTodosFunc(){
    let newArr = [...todos];
    let res = newArr.filter(item=>item.completed===false);
    return setActiveTodos(res);
  }
  function filterSearch(){
    let updatedTodos = [...todos];
    if(searchValue !== ''){
      let res = [];
      updatedTodos.forEach(item =>{
        if(item.title.toLowerCase().includes(searchValue.toLowerCase())){
          res.push(item);
        };
      }
      );
      return setSearchFilterTodos(res.length!=0?res:[]);
    }else setSearchFilterTodos([]);
  }
  useEffect(()=>{
    filterSearch();
    // завершенные туду
    completedTodosFunc();
    // активные туду
    activeTodosFunc();
    // setTodosAll(todos);
    // setTodosActive(activeTodos);
    // setTodosCompleted(completedTodos);
    // setTodosSearch(searchFilterTodos);
  },[addObj,todos,searchValue,valueFilter]);
 
  return (
    <>
    {
      (searchValue!=''?searchFilterTodos:
      (valueFilter.toLowerCase()=='all'?todos:valueFilter.toLowerCase()=='active'?activeTodos:
      valueFilter.toLowerCase()=='completed'?completedTodos:[])).length !== 0?
    <div className="todos">
    {/* <Loading /> */}
    {
      (searchFilterTodos.length!=0?searchFilterTodos:(valueFilter.toLowerCase()=='completed'?
      completedTodos:valueFilter.toLowerCase()=='active'?activeTodos:todos)).map(todo=>(
      <div className={`todo ${todo.completed?'finish':''}`} key={todo.id}>
        <div className={`complete ${todo.completed?'active':''}`}>
          <input type="checkbox" name='complete' onClick={(e)=>{
            if(todo.edit) return e.target.checked=false
            let newArr = [...todos];
            newArr.forEach(item=>{
              if(item.id === todo.id) {
                todo.completed = !todo.completed;
              } 
            });
            setTodos(newArr);
          }}/>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
          </svg>
        </div>
        <div className="todo-title">
          {todo.edit?
          <div className="edit-title">
            <textarea className='edit-input' type='text' defaultValue={todo.title} onChange={(e)=>{
              return setEditValue(e.target.value);
            }}></textarea>
            <button className='edit-btn' onClick={()=>{
              setAddInputValue(editValue);
              let newArr = [...todos];
              newArr.forEach(item=>{
                if(item.id === todo.id){
                  if(editValue.trim()!=''){
                  todo.title = editValue;
                  todo.edit = !todo.edit;
                  }else{
                    todo.edit = !todo.edit;
                    return todo.title;
                  }
                }
              });
              return setTodos(newArr);
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
              </svg>
            </button>
          </div>
          :todo.title}
        </div>
        <div className="todo-btns">
          {todo.completed?'':
          <button className="btn-edit" name='edit' onClick={()=>{
             let newArr = [...todos];
             newArr.forEach(item=>{
               if(item.id === todo.id) {
                 todo.edit = !todo.edit;
               } 
             });
             setTodos(newArr);
          }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736" stroke="#CDCDCD" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </button>}
          <button className="btn-delete" name='delete' onClick={()=>{
            let newArr = [...todos];
            
            newArr.forEach((item,index)=>{
              if(todo.id === item.id){
              newArr.splice(index,1);
              }
            });
            setTodos(newArr);
          }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD"/>
                  <path d="M14.625 3.75H3.375" stroke="#CDCDCD" strokeLinecap="round"/>
                  <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD"/>
                  <path d="M10.5 9V12.75" stroke="#CDCDCD" strokeLinecap="round"/>
                  <path d="M7.5 9V12.75" stroke="#CDCDCD" strokeLinecap="round"/>
              </svg>
          </button>
        </div>
      </div>
      ))
     }
    </div>:
     <div className="empty">
        <div></div>
        {/* <img src={emptyPng} alt="description" /> */}
        <p className="empty-title">Empty...</p>
     </div>
}
    {/* add todo  */}
    <div className={`add-form ${showForm?'show':''}`}
    onClick={(e)=>{
      e.target.className == 'add-form show'?setShowForm(false):'';
  }}>
        <div className="add-form-wrapper">
            <form onSubmit={(e)=>{
                e.preventDefault();
                e.target.querySelector('.add-form-input').value = '';
                setTodos([addObj,...todos]);
                setAddInputValue('')
            }}>
                <h2 className="add-form-title">New Note</h2>
                <InputSearch onChange={(e)=>{
                  setAddInputValue(e.target.value);
                }} className="add-form-input"
                btnNone={true}
                placeholder='Input your note...'/>
                <div className="add-form-btns">
                    <button type='reset' className="add-form-cancel" onClick={(e)=>{
                      setShowForm(false);
                    }}>Cancel</button>
                    <button className="add-form-apply" onClick={()=>{
                      if(addInputValue!=''){
                      setShowForm(false);
                      setId(id+1)
                      setAddObj({
                        id:id,
                        title:addInputValue,
                        completed:false,
                        edit:false
                      })
                    }else return;
                    }}>Apply</button>
                </div>
            </form>
        </div>
      </div>
      <div className="add-btn" onClick={()=>!showForm?setShowForm(true):setShowForm(false)}>
        {/* <img src={addBtn} alt="description" /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
        </svg>
      </div>
      </>
  )
  };