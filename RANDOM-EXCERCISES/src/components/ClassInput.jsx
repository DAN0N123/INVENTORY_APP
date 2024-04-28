/* eslint-disable react/prop-types */
import { Component } from "react";
import '../styles/classinput.css'
import Count from './Count'


class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.inputVal.length > 0 && !this.state.todos.includes(this.state.inputVal)){
        this.setState((state) => ({
            todos: state.todos.concat(state.inputVal),
            inputVal: "",
          }));
    }
    
  }
  handleEdit(e) {
    e.preventDefault()
    const inputElement= e.target.querySelector('input')
    const id = inputElement.id.split('_')[0]
    const value = inputElement.value;
    console.log(value)
    const index = this.state.todos.indexOf(id)
    if(inputElement.value.length != 0){
        const newTodos = [...this.state.todos]
        newTodos[index] = value

        const submitButton = document.getElementById(id + '_submit')
        const inputElement = document.getElementById(id + '_input')
        const displayElement = document.getElementById(id + '_display')
        const editButton = document.getElementById(id + '_edit')
        inputElement.classList.add('hide')
        displayElement.classList.remove('hide')
        submitButton.classList.add('hide')
        editButton.classList.remove('hide')
        this.setState( () => ({
            todos: newTodos
        }))
    }
  }
  editTask(e) {
    e.currentTarget.classList.add('hide')
    const submitButton = document.getElementById(e.currentTarget.id.split('_')[0] + '_submit')
    const inputElement = document.getElementById(e.currentTarget.id.split('_')[0] + '_input')
    const displayElement = document.getElementById(e.currentTarget.id.split('_')[0] + '_display')
    inputElement.classList.remove('hide')
    displayElement.classList.add('hide')
    submitButton.classList.remove('hide')
  }

  deleteTask(e) {
    const index = this.state.todos.indexOf(e.currentTarget.id)
    const newTodos = [...this.state.todos]
    newTodos.splice(index, 1)
    this.setState( () => ({
        todos: newTodos
    }))
    }
  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <div>
          {this.state.todos.map((todo) => (
            <div key={todo + 'div'} className="todo">
                <form onSubmit={this.handleEdit}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                    </svg> 
                    <input defaultValue={todo} className="hide" id={todo + '_input'} type="text"></input>
                    <div id={todo + '_display'}> {todo} </div>
                    <button type="submit" className="hide" id={todo + '_submit'}> Submit </button>
                </form>
                <button id={todo + '_edit'} onClick={this.editTask} className="edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                    </svg>
                </button>
                <button id={todo + '_delete'} onClick={this.deleteTask} className="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
          ))}
        </div>
        <Count tasks={this.state.todos}/>
      </section>
    );
  }
}

export default ClassInput;
