import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
class Todo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      currentTast: "",
    };
  }
  hadleChange = (e) => {
    this.setState({
      currentTast: e.target.value,
    });
  };
  hadleSubmit = (e) => {
    if (!this.state.currentTast) {
      return;
    }
    this.setState({
      tasks: [...this.state.tasks,{task: this.state.currentTast, id: this.state.tasks.length + 1 }],
      currentTast: "",
    });
  };
  handleDelete = (id) => {
    const newArr = this.state.tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: [...newArr],
    });
  };
  render() {
    return (
      <div className="mt-3">
        <Form.Label className="mb-3">Write your Notes</Form.Label>
        <Form.Control
          type="text"
          value={this.state.currentTast}
          onChange={this.hadleChange}
          placeholder="Your Notes"
        />
        <Button
          className="btn btn-primary mt-3 mb-10"
          onClick={this.hadleSubmit}
        >
          Submit
        </Button>
          <hr/>
        <Container>
        <h2>Your Notes</h2>
        <ol className="mb-3 mt-3">          
          {this.state.tasks.map((task) => (
            <li key={task.id} className="position-relative">
              <p>{task.task}</p>
              <Button className="btn btn-danger position-absolute top-0 end-0 mb-3" onClick={() => this.handleDelete(task.id)}>Delete</Button>
              <hr/>
            </li>
          ))}
        </ol>
        </Container>
      </div>
    );
  }
}
export default Todo;
