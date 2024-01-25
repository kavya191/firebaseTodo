import React, { useEffect, useState } from "react";
import "../Todo/Todopage.css";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { RiChatDeleteFill } from "react-icons/ri";
import ListGroup from "react-bootstrap/ListGroup";
import { FiEdit } from "react-icons/fi";
import {
  getDocs,
  addDoc,
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

function Todopage() {
  const [inputTitle, setInputTitle] = useState("");
  const [description, setDescription] = useState("");
  //state to store firebase data
  const [todos, setTodos] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [todoId, setTodoId] = useState(null);
  //to identify collection reference
  const todoCollection = collection(db, "todos");
  //read data from firebase
  const getTododata = async () => {
    const data = await getDocs(todoCollection);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTodos(filteredData);
    setFilterData(filterData);
    // console.log(filteredData);
  };
  useEffect(() => {
    getTododata();
  }, [todos]);
  //add tododata to firebase
  const handleAdd = async () => {
    try {
      await addDoc(todoCollection, {
        title: inputTitle,
        desc: description,
      });

      setInputTitle("");
      setDescription("");
      console.log("New todo added to Firebase");

      alert("new todo added");
      console.log("Updated todos:", todos);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  //delete data from firebase
  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const updateTodo = async (id) => {
    const todoDoc = doc(db, "todos", todoId);
    await updateDoc(todoDoc, {
      title: inputTitle,
      desc: description,
    });
    setInputTitle("");
    setDescription("");
  };

  //edit
  const editTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    const editData = await getDoc(todoDoc);
    console.log(editData.id);
    console.log(editData.data());
    // console.log(editData.desc);
    setInputTitle(editData.data().title);
    setDescription(editData.data().desc);
    setTodoId(editData.id);
  };
  return (
    <div className="todo_main">
      <div className="row">
        <div className="column">
          <div>
            <h2 className="todo_head">TODO</h2>
          </div>
          <div>
            <p className="todo_para">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
              vitae dignissimos repellat provident quidem aut rin mollitia
              molestiae ea animi vel asperiores eum,inventore autem, illum
              distinctio aspernatur a expedita!
            </p>
          </div>
          <div className="todo_form">
            <form action="">
              <div className="todo_title">
                <input
                  type="text"
                  placeholder="Title"
                  value={inputTitle}
                  name="inputTitle"
                  onChange={(e) => setInputTitle(e.target.value)}
                />
              </div>
              <div className="todo_desc">
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="todo_btn">
                <Button type="button" onClick={handleAdd}>
                  Add
                </Button>
              </div>
              <div className="todo_btn mt-2">
                <Button type="button" onClick={updateTodo}>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="column1">
          <div>
            <div className="todolist">
              <h2>TODO LIST</h2>
            </div>
            <div className="todo_sf"></div>
            {todos.map((todo) => (
              <div className="todos" key={todo.id}>
                <div>
                  <h5>
                    {todo.title}
                    <Dropdown className="todo_filter">
                      <Dropdown.Toggle variant="white" id="dropdown-basic">
                        <PiDotsThreeVerticalBold />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => editTodo(todo.id)}>
                          <FiEdit />
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteTodo(todo.id)}>
                          {" "}
                          <RiChatDeleteFill />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </h5>
                  <p>{todo.desc}</p>
                  <hr />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todopage;
