import React, { useEffect, useState } from "react";

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  let date = new Date()
  let newDate = date.toDateString()

  const submitHandler = (e) => {
    e.preventDefault()
    setTodos([...todos, { title, desc }])
    setDesc('')
    setTitle('')
  }

  const deleteHandler = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
   
  const notifyCompleted = () => toast("Task Completed ✔")
  const notifyDeleted = () => toast("Task Deleted ❌")
        
  let renderTask = <h2>No Task Available!</h2>

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center h-screen selection:bg-[#000] bg-zinc-900">
       <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <h1 className="text-6xl mb-5 text-white font-bold">Todo App</h1>
        <div className="bg-zinc-800 overflow-y-auto w-[80%] h-[500px]">
          <div className="w-full my-7 flex lg:flex items-center justify-center">
            <form
             onSubmit={submitHandler}
             className="lg:flex items-center">
              <div>
                <h1 className="mb-2 font-bold text-white">Title:</h1>
                <input
                  placeholder="Enter Your Task Here"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-[300px] h-8 rounded mr-5 pl-3 outline-none focus:outline-[#1ac03e]"
                />
              </div>
              <div>
                <h1 className="mb-2 lg:mt-0 mt-3 font-bold text-white">Description:</h1>
                <input
                  placeholder="Enter Your Description Here"
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-[300px] rounded h-8 pl-3 outline-none focus:outline-[#1ac03e]"
                />
              </div>
              <div>
              <button className="bg-[#1ac03e] font-bold hover:bg-[#88f6a0] text-white rounded mt-8 py-[4px] px-4 ml-5">Add Task</button>
              </div>
            </form>
          </div>
          <div className="w-full items-center lg:flex justify-center">
            <div className="w-full p-3 text-white rounded bg-zinc-700">
                { 
                todos.length <= 0 
                ?
                renderTask
                :
                todos.map((todo, index) => {
                  return(
                    <>
                     <div key={index} className="lg:flex overflow-x-auto ml-3 mt-2 justify-between">
                       <div>
                          <h3 className="text-3xl text-[#1ac03e] font-semibold">{todo.title === '' ? <h2 className="text-red-500">Invalid Title</h2> : todo.title}</h3>
                          <h5 className="text-lg font-light">{todo.desc === '' ? <h2 className="text-red-500">Invalid Description</h2> : todo.desc}</h5>
                        </div>
                       <div className=" mb-2 text-end mr-5">
                       <h6 className=" font-extralight text-sm text-end">{ newDate }</h6>
                       <button
                         onClick={() => {
                          deleteHandler(index)
                          notifyDeleted()
                         }}
                         className="bg-red-500 mr-2 font-bold text-center rounded hover:bg-red-400 py-2 px-3">Delete</button>
                       <button
                         onClick={() => {
                          deleteHandler(index)
                          notifyCompleted()
                         }}
                         className="bg-[#1ac03e] font-bold text-center rounded mt-2 hover:bg-[#88f6a0] py-2 px-3">Complete</button>
                       </div>
                     </div>
                     <hr className="bg-white mt-3"/>
                    </>
                  )
                })
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
