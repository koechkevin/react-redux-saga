import React, { Component } from 'react';

class NewStudent extends Component {
  initialState = {
    name: '',
    guardian: '',
    level: '',
    stream:'',
    contact: ''
  };
  state = this.initialState;
  onSubmit = (e) => {
    e.preventDefault();
    const { createStudent } = this.props;
    createStudent(this.state, () => {
      this.setState({
        ...this.initialState
      });
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render(){
    const { name, guardian, level, stream, contact, } = this.state;
    return(
      <div className="new-student">
        <form onSubmit={this.onSubmit}>
          <div className="form">
            <div className="row">
              <div className="column">
                <span name="name"><input value={name} type="text" name="name" placeholder="name" onChange={this.onChange} /></span>
                <span name="guardian"><input value={guardian} type="text" name="guardian" onChange={this.onChange} placeholder="guardian" /></span>
                <span name="level"><input value={level} type="number" name="level" onChange={this.onChange} placeholder="level" /></span>
              </div>
              <div className="column">
                <span name="stream"><input value={stream} type="text" onChange={this.onChange} name="stream" placeholder="stream" /></span>
                <span name="contact"><input value={contact} type="number" onChange={this.onChange} name="contact" placeholder="contact" /></span>
              </div>
            </div>
            <input type="submit" className="right" />
          </div>
        </form>
      </div>
    );
  }
}

export default NewStudent;
