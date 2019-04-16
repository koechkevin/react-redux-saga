import React, { Component } from 'react';

class NewStudent extends Component {
  initialState = {
    name: '',
    guardian: '',
    level: '',
    stream:'',
    contact: '',
    errors: []
  };
  state = this.initialState;
  componentWillReceiveProps = (nextProps, nextContext) => {
    this.setState({ errors: nextProps.errors });
  };

  checkErrors = (name) => {
    const {errors} = this.state;
    const contains = errors.filter((e) => e.name === name);
    return !!contains.length;
  };
  err = (name) => {
    const {errors} = this.state;
    const contains = errors.filter((e) => e.name === name);
    return contains.length?contains[0].message:'';
  };
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
    const incomplete = !!(!name||!guardian||!level||!stream||!contact);
    return(
      <div className="new-student">
        <form onSubmit={this.onSubmit}>
          <div className="form">
            <div className="row">
              <div className="column">
                <span errors={this.err('name')} name="name">
                  <input
                    className={this.checkErrors('name')?'input-error':''}
                    value={name} type="text" name="name" placeholder="name" onChange={this.onChange} />
                </span>
                <span errors={this.err('guardian')} name="guardian">
                  <input
                    className={this.checkErrors('guardian')?'input-error':''}
                    value={guardian} type="text" name="guardian" onChange={this.onChange} placeholder="guardian" />
                </span>
                <span errors={this.err('level')} name="level">
                  <input
                    className={this.checkErrors('level')?'input-error':''}
                    value={level} type="number" name="level" onChange={this.onChange} placeholder="level" />
                </span>
              </div>
              <div className="column">
                <span errors={this.err('stream')} name="stream">
                  <input
                    className={this.checkErrors('stream')?'input-error':''}
                    value={stream} type="text" onChange={this.onChange} name="stream" placeholder="stream" />
                </span>
                <span errors={this.err('contact')} name="contact">
                  <input
                    className={this.checkErrors('contact')?'input-error':''}
                    value={contact} type="number" onChange={this.onChange} name="contact" placeholder="contact" />
                </span>
              </div>
            </div>
            <input className={incomplete?'inactive right':'right'} type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default NewStudent;
