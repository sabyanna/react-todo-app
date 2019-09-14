import React, { Component } from 'react';
import axios from 'axios';

export class AddTodo extends Component {
    state = {
        title: ''
    }

    addTodo = (title) => {
        axios.post('https://jsonplaceholder.typicode.com/todos', {
          title,
          completed: false,
        })
          .then(res => this.setState({todos: 
            [...this.state.todos, res.data] }));
      }

    onSubmit = (e) => {
        e.preventDefault();
        this.addTodo(this.state.title);
        this.setState({title: ''});
    } 

    onChange = (e) => this.setState({ [e.target.name]: e.target.value});

    render() {
        return (
            <form className="addForm" onSubmit={this.onSubmit} style={{ display: 'flex'}}>
                <input 
                    type="text"
                    name="title"
                    style={{flex: '10', paddig: '5px'}}
                    placeholder="Add Todo ..."
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="submit"
                    className="btn"
                    style={{felx: '1'}}
                />
            </form>
        )
    }
}

export default AddTodo
