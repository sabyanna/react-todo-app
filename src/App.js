import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
//import uuid from 'uuid';
import { Provider } from 'react-redux';
import store from './store'
import axios from 'axios';

class App extends Component {
  

  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data}))
  }

  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })});
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
    
  }

  addTodo = (title) => {
    let lastID = this.state.todos[this.state.todos.length-1].id;
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false,
    })
      .then(res => this.setState({todos: 
        [...this.state.todos, res.data] }));
      //.then(res => this.setState({todos: [this.state.todos[this.state.todos.length-1].id = lastID + 1]}));
      //this.state.todos[this.state.todos.length-1].id = lastID + 1
  }

  render() { 
    return (
      <Provider store={store}>
          <Router>
          <div className="App">
            <div className="container">
              <Header/>
              <div className="todoContainer">
                  <Route exact path="/" render={props => (
                    <React.Fragment>
                      <AddTodo addTodo={this.addTodo}/>
                      <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
                    </React.Fragment>
                  )} />
                  <Route path="/about" component={About}/>
              </div>
            </div>
          </div>
        </Router>
      </Provider> 
    );
  } 
}

export default App;
