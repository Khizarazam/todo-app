import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTodos([...todos, { title, desc }]);
    setDesc("");
    setTitle("");
  };

  const deleteHandler = (index) => {
    let copyTodos = [...todos];
    copyTodos.splice(index, 1);
    setTodos(copyTodos);
  };

  const completeHandler = (index) => {
    let copyTodos = [...todos];
    copyTodos.splice(index, 1);
    setTodos(copyTodos);
  };

  let renderTask = <h2>No task Available!</h2>;

  if (todos.length > 0) {
    renderTask = todos.map((task, index) => {
      return (
        <>
          <li key={index} className="flex justify-between">
            <div className="p-2 w-full">
              <h5 className="text-2xl font-bold">{task.title}</h5>
              <h3 className="text-sm mt-6">{task.desc}</h3>
            </div>
            <div>
              <button
                onClick={() => deleteHandler(index)}
                className="bg-red-500 text-center mt-2 w-[100px] px-5 py-2 h-[40px] font-bold rounded outline-none hover:bg-red-300"
              >
                Delete
              </button>
              <button
                onClick={() => completeHandler(index)}
                className="bg-green-500 text-center w-[100px] mt-2 px-5 py-2 h-[40px] font-bold rounded outline-none hover:bg-green-300"
              >
                Complete
              </button>
            </div>
          </li>
          <hr className="bg-white mt-3" />
        </>
      );
    });
  }

  return (
    <>
      <div className="bg-purple-600 h-screen">
        <h1 className="text-5xl text-center text-white pt-5">Todo App</h1>
        <div
          className="bg-purple-900 overflow-y-auto w-[70%]  p-12  
           absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <form onSubmit={submitHandler}>
            <div className="w-full md:flex justify-around items-center">
              <input
                type="text"
                value={title}
                placeholder="Enter Your Task"
                onChange={(e) => setTitle(e.target.value)}
                className="lg:w-[380px] w-[55vw] h-[35px]  pl-2 outline-none border-[3px] mr-2 border-purple-300 rounded"
              />
              <input
                type="text"
                value={desc}
                placeholder="Enter Your Description"
                onChange={(e) => setDesc(e.target.value)}
                className="lg:w-[380px] w-[55vw] h-[35px] pl-2 border-[3px] outline-none border-purple-300 md:mt-0 mt-5 lg:ml-2 rounded"
              />
              <br />
            </div>
            <div className="w-full">
              <button className="py-3 mb-2 w-[150px] hover:bg-purple-400 rounded px-4 bg-purple-950 mt-5 text-white">
                Add Task
              </button>
            </div>
          </form>
          <div className="w-full p-3 text-white  bg-purple-500 mt-5 rounded">
            {renderTask}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
