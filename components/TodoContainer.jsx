import React from "react";
import PropTypes from 'prop-types';
import TodoList from "./TodoList.jsx";
import TodoSearch from "./TodoSearch.jsx";
  
export default class TodoContainer extends React.Component {
  constructor(props){
    super(props);
    this.todoStore = props.stores.todoStore;
    this.search = this.search.bind(this);
    this.reload = this.reload.bind(this);

    this.query = null;
    this.state = {
      todos: []
    };
  }
  
  componentDidMount(){
    this.todoStore.onChange(this.reload);
    this.todoStore.fetch();
  }
  
  reload(){
    const todos = this.todoStore.getBy(this.query);
    this.setState({ todos });
  }
  
  search(query){
    this.query = query;
    this.reload();
  }
  
  render() {
    return <div>
        <TodoSearch onSearch={this.search} />
        <TodoList todos={this.state.todos} />
      </div>;
  }
}

TodoContainer.propTypes = {
  stores: PropTypes.object
};