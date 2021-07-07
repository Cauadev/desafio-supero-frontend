import '../assets/css/Home.css';
import React from "react";
import axios from 'axios';
import Task from '../components/Task';
import Create from '../components/Modal-Create';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const BASE_URL = "https://desafio-supero-backend.herokuapp.com"


class App extends React.Component{

  //DATA

  state = {
    title: 'TaskList',
    tasks: [],
    task: {
      title: '',
      content: '',
      description: '',
      id: 0,
      date: null
    }
  }


  //METHODS

  getTasks = () => {
    this.setState({tasks: []})
    axios.get(BASE_URL+"/tasks").then(res =>{
      this.setState({tasks: res.data})
    });
  }

  selectTask(task){
    this.setState({task})
  }

  updateTask = () => {

    if(this.state.task.title.length === 0){
        MySwal.fire({
            title: <p>Warning!</p>,
            text: "Title cannot be null",
            icon: "warning"
          })
          return;
    }

    axios.put(BASE_URL+"/tasks",{...this.state.task}).then(() =>{
        MySwal.fire({
            title: <p>Success!</p>,
            text: "Task updated",
            icon: "success"
          })
          this.getTasks()
      });

      document.getElementById("close").click()
}


  componentDidMount(){
    this.getTasks()
  }




  //RENDER

  render() {
    return(
  <div>
        <div className="p-3 d-flex justify-content-center align-items-center">
          <i className="bi bi-list-task fs-1 logo"></i>
        <span className="fw-bold ps-2 fs-4 logo-text">{this.state.title}</span>
        </div>

    <div className="container mt-5">

        <div className="mb-2">
          <span className="fw-bold fs-5">Your tasks</span>
        </div>

        <Create
        getTasks={this.getTasks.bind(this)}/>

        {/* MODEL - EDIT */}

        <div className="modal fade" id="updatingModal" aria-labelledby="updatingModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-body">

              <div className="date-container mb-4">
                <i className="bi bi-clock"></i> {this.state.task.date}
              </div>

                <div className="mb-4">
                <label className="mb-2 text-muted fs-3 fw-bold">Title</label>
                    <input type="text" className="input-custom" placeholder="Title" value={this.state.task.title} onChange={(e) => {
                          var task = {...this.state.task}
                          task.title = e.target.value;
                          this.setState({task})
                        }
                      }/>
                </div>

                <div className="mb-4">
                    <label className="mb-2 text-muted fs-3 fw-bold">Description</label>
                    <textarea className="input-custom" placeholder="Description" rows="4" value={this.state.task.description} onChange={(e) => {
                          var task = {...this.state.task}
                          task.description = e.target.value;
                          this.setState({task})
                        }
                      }></textarea>
                </div>

                <div className="mb-4">
                <label className="mb-2 text-muted fs-3 fw-bold">Content</label>
                    <textarea className="input-custom" placeholder="Content" rows="10" value={this.state.task.content} onChange={(e) => {
                          var task = {...this.state.task}
                          task.content = e.target.value;
                          this.setState({task})
                        }
                      }></textarea>
                </div>
                </div>


                <div className="modal-footer d-flex justify-content-center mt-5">
                    <button className="update-button" onClick={this.updateTask}>Update</button>
                    <button type="button" hidden={true} data-bs-dismiss="modal" id="close"></button>
                </div>

                </div>
            </div>
         </div>

          {/* MODEL - EDIT */}


        <div className="create-task d-flex align-items-center mb-4" data-bs-toggle="modal" data-bs-target="#createModal">
            <i className="bi bi-plus-lg plus ms-4 me-3"></i>
            <span className="text-light fs-2 fw-bold">New Task</span>
        </div>
        {
          this.state.tasks
          .map((task,i) => {
             return(
              <Task
              taskColor={task.color}
              description={task.description}
              title={task.title}
              id={task.id}
              getTasks={this.getTasks.bind(this)}
              selectTask={this.selectTask.bind(this)}
              date={task.date}
              content={task.content}
              stage={task.stage}
              key={i}/>
             )
            })
          }

    </div>



  </div>
    );
  }
}

export default App;
