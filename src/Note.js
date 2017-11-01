import React from 'react';
import './App.css';

class Note extends React.Component{
            constructor(props){
                super(props);
                this.state={
                    editing:false,
                    priority: 1
                }
               this.edit = this.edit.bind(this);
               this.save = this.save.bind(this); 
               this.remove = this.remove.bind(this);  
            }
            componentWillMount() {
                this.style = {
                    right: this.randomBetween(0, window.innerWidth - 150, 'px'),
                    top: this.randomBetween(0, window.innerHeight -150, 'px')
                }
            }
            componentDidUpdate() {
                if (this.state.editing) {
                    this.refs.newText.focus()
                    this.refs.newText.select()
                }
            }
            shouldComponentUpdate(nextProps, nextState) {
                return this.props.children !== nextProps.children || this.state !== nextState
            }
            randomBetween(x, y, s) {
                return (x + Math.ceil(Math.random() * (y-x))) + s;
            }
            edit() {
                this.setState({editing: true})
            }
            save() {
                this.props.onChange(this.refs.newText.value, this.props.id)
                this.setState({editing: false})
            }
            remove() {
                this.props.onRemove(this.props.id)
            }
            renderForm() {
                return (
                    <div className='note'
                         style={this.style}>
                      <textarea ref="newText"
                                defaultValue={this.props.children}>
                      </textarea>
                      <button onClick={this.save}>SAVE</button>
                    </div>
                )
            }
            renderDisplay() {
                return ( 
                    <div className='note'
                         style={this.style}>
                        <p>{this.props.children}</p>
                        <span>
                          <button onClick={this.edit}>EDIT</button>
                          <button onClick={this.remove}>X</button>
                        </span>
                    </div>
                    )
            }
            render() {
              return ( <div>
                       {(this.state.editing) ? this.renderForm() : this.renderDisplay()}
                       </div>
                       
                )

            }
        }

export default Note
