import React, { useState, useEffect } from 'react';
import './Todo.css';

function TodoList() {


  const [isCompleted, setIsComp] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");
  

  const handleAddTodo = () => {
       if (!newTitle || !newDescription) return; // Prevent empty todos
      let newTodoItem = { title: newTitle, description: newDescription , completed: false };
      let updatedTodoArr = [...allTodos, newTodoItem];
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
      setNewTitle(''); // Reset inputs
      setNewDescription('');
    };
  
    // Delete a todo
    const handleDeleteTodo = (index) => {
      let reducedTodo = [...allTodos];
      reducedTodo.splice(index, 1);
      setTodos(reducedTodo);
      localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    };
  

    
  
    // Delete a completed task
    const handleDeleteCompletedTodo = (index) => {
      let reducedTodo = [...completedTodos];
      reducedTodo.splice(index, 1);
      setCompletedTodos(reducedTodo);
      localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    };
  
   
    const handleEdit = (index, item) => {
      setCurrentEdit(index);
      setCurrentEditedItem(item);
    };
  
    // Update edited task details
    const handleUpdateTitle = (value) => {
      setCurrentEditedItem((prev) => ({ ...prev, title: value }));
    };
  
    const handleUpdateDescription = (value) => {
      setCurrentEditedItem((prev) => ({ ...prev, description: value }));
    };
  
    const handleUpdateToDo = () => {
      let updatedTodos = [...allTodos];
      updatedTodos[currentEdit] = currentEditedItem;
      setTodos(updatedTodos);
      setCurrentEdit("");
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    };

 
    
    const handleCheckboxChange = (index) => {
      const updatedTodos = [...allTodos];
      const item = updatedTodos[index];
      if (!item.completed) {
        // Mark as completed and move to the "Done" list
        item.completed = true;
        const now = new Date();
        item.completedOn = `${now.toLocaleDateString()}`;
        setCompletedTodos([...completedTodos, item]);
        // updatedTodos.splice(index, 1); // Remove from current list
      } else {
        // If needed: Move back to the main list (uncheck logic, optional)
        item.completed = false;
        item.completedOn = null;
      }
    
      setTodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
      localStorage.setItem('completedTodos', JSON.stringify([...completedTodos]));
    };
    
  
    
    useEffect(() => {
      let savedTodo = JSON.parse(localStorage.getItem('todolist'));
      let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
      if (savedTodo) setTodos(savedTodo);
      if (savedCompletedTodo) setCompletedTodos(savedCompletedTodo);
    }, []);
  
    const incompleteTodos = allTodos.filter((todo) => !todo.completed);



  return (
    <>
    <div className="App">
    <img src="image/logo.png" alt="" width='20%' className='logo' />
    <div className='flower' >
    <img src="image/img.png" alt="" width='50%' />
    </div>
    <div>
    <img src="image/img1.png" alt="" width='23%' className='flower1' />
    <img src="image/img2.png" alt="" width='23%' className='flower2' />
    </div>
      <h1 className='h1'>FocusList</h1>
      <div className='todo-wrapper'>
      <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
             <label htmlFor="">Date</label>
            <input
              type="date"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button type="button" className="primaryBtn"  onClick={handleAddTodo} >
              Add
            </button>
      </div>
      <div className="btn-area">
          <button
             className={`secondryBtn ${!isCompleted && !showIncomplete && 'active'}`}
             onClick={() => {
               setIsComp(false);
               setShowIncomplete(false);
             }}
          >
            ToDo
          </button>
          <button
            className={`secondryBtn ${isCompleted && 'active'}`}
            onClick={() => {
              setIsComp(true);
              setShowIncomplete(false);
            }}
          >
            Done
          </button>
          <button
           className={`secondryBtn ${showIncomplete && 'active'}`}
           onClick={() => {
             setIsComp(false);
             setShowIncomplete(true);
           }}
          >
            InComplete
          </button>
        </div>
        
        
        </div>

        <div className="todo-list">
          {!isCompleted &&  !showIncomplete &&
            allTodos.map((item, index) =>
              currentEdit === index ? (
                <div className="edit__wrapper" key={index}>
                  <input
                    placeholder="Updated Title"
                    onChange={(e) => handleUpdateTitle(e.target.value)}
                    value={currentEditedItem.title}
                  />
                  <input type="date" name="" id="" onChange={(e) => handleUpdateDescription(e.target.value)}
                    value={currentEditedItem.description} />
                  <button type="button" onClick={handleUpdateToDo} className="primaryBtn">
                    Update
                  </button>
                </div>
              ) : (
                <div className={`todo-list-item ${item.completed ? 'completed' : ''} ` } key={index}>
                  <div>
                  <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheckboxChange(index)}
                  />
                    <span className='title'>{item.title}</span>
                    <p className='dateList'>{item.description}</p>
                  </div>
                  <div className="buttons">
                    {/* <button disabled={item.completed}  className="task-button" >
                      <i className="fa fa-check-circle"></i>
                    </button> */}
                    <button
                    disabled={item.completed} 
                      className="task-button"
                      onClick={() => handleEdit(index, item)}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button  className="task-button" onClick={() => handleDeleteTodo(index)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              )
            )}
          {showIncomplete &&
            incompleteTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(index)}
                    
                  />
                  <span className="title">{item.title}</span>
                  <p className="dateList">{item.description}</p>
                </div>
                <div className="buttons">
                  <button className="task-button" onClick={() => handleEdit(index, item)}>
                    <i className="fa fa-edit"></i>
                  </button>
                  <button className="task-button" onClick={() => handleDeleteTodo(index)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
            {isCompleted &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Completed on: {item.completedOn}</p>
                </div>
                <div className="buttons">
                  <button
                    className="task-button"
                    onClick={() => handleDeleteCompletedTodo(index)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ))} 
       

      </div>
      
      
   
      {/* <h1>My Todos</h1>
      <div className="todo-wrapper">
        
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn" onClick={handleAddTodo}>
              Add
            </button>
          </div>
        </div>

       
        <div className="btn-area">
          <button
            className={`secondryBtn ${!isCompleted && 'active'}`}
            onClick={() => setIsComp(false)}
          >
            ToDo
          </button>
          <button
            className={`secondryBtn ${isCompleted && 'active'}`}
            onClick={() => setIsComp(true)}
          >
            Completed
          </button>
        </div>

        
        <div className="todo-list">
          {!isCompleted &&
            allTodos.map((item, index) =>
              currentEdit === index ? (
                <div className="edit__wrapper" key={index}>
                  <input
                    placeholder="Updated Title"
                    onChange={(e) => handleUpdateTitle(e.target.value)}
                    value={currentEditedItem.title}
                  />
                  <textarea
                    placeholder="Updated Description"
                    rows={4}
                    onChange={(e) => handleUpdateDescription(e.target.value)}
                    value={currentEditedItem.description}
                  />
                  <button type="button" onClick={handleUpdateToDo} className="primaryBtn">
                    Update
                  </button>
                </div>
              ) : (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="buttons">
                    <button className="task-button" onClick={() => handleComplete(index)}>
                      <i className="fa fa-check-circle"></i>
                    </button>
                    <button
                      className="task-button"
                      onClick={() => handleEdit(index, item)}
                    >
                      <i className="fa fa-edit"></i>
                    </button>
                    <button className="task-button" onClick={() => handleDeleteTodo(index)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              )
            )}

       
          {isCompleted &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Completed on: {item.completedOn}</p>
                </div>
                <div className="buttons">
                  <button
                    className="task-button"
                    onClick={() => handleDeleteCompletedTodo(index)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div> */}
    </div>
    </>
  );
}

export default TodoList;
