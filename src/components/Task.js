import React from 'react'
import '../assets/css/Task.css'
import trash from '../assets/trash.svg'
import axios from 'axios';


const BASE_URL = "https://desafio-supero-backend.herokuapp.com"

class Task extends React.Component{

    state = {
        id: this.props.id
    }


    deleteTask = () => {
            axios.delete(BASE_URL+"/tasks/"+this.state.id).then(() => {
            this.props.getTasks()
        })
      }

      selectTask = () =>{
          const task = {
              id: this.state.id,
              title: this.props.title,
              description: this.props.description,
              content: this.props.content,
              date: this.props.date
          }
          this.props.selectTask(task)
      }

      updateStage(){
          axios.patch(BASE_URL+"/tasks/"+this.state.id)
      }

      maxcharacters = (value) =>{
        var text = ''
        if(value.length > 85){
            for(let i = 0; i < 85; i++){
                text += value.charAt(i)
            }
            text += '...'
        }else{
            text = value
        }
        return text
    }



    render(){
        return(
              <div className="task d-flex align-items-center mb-4" onClick={this.selectTask} style={{backgroundColor: this.props.taskColor}}>
                    <label className="checkcontainer">
                        {this.props.stage === 'COMPLETED' ?
                            (
                                <input type="checkbox" defaultChecked={true}/>
                            )
                            :
                            (
                                <input type="checkbox"/>
                            )
                        }

                        <i className="checkmark" onClick={() => this.updateStage()}><i className="checked"></i></i>
                    </label>
                    <div className="d-flex flex-column info-container" data-bs-toggle="modal" data-bs-target="#updatingModal">
                        <div className="d-flex justify-content-between">
                            <span className="title">{this.props.title}</span>
                        </div>
                        <p className="description">{this.maxcharacters(this.props.description)}</p>
                    </div>
                    <div className="trash-container me-4 ms-5">
                        <img src={trash} alt="delete" className="delete-button" onClick={this.deleteTask}/>
                    </div>
              </div>
        )
    }
}

export default Task;