import React from "react";
import "../assets/css/Modal-Create.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';

const MySwal = withReactContent(Swal)

const BASE_URL = "https://desafio-supero-backend.herokuapp.com"

class Modal_Create extends React.Component {

    state = {
        color: "#7FCCD5",
        title: '',
        description: '',
        content: ''
    }
    createTask = () => {

        if(this.state.title.length === 0){
            MySwal.fire({
                title: <p>Warning!</p>,
                text: "Title cannot be null",
                icon: "warning"
              })
              return;
        }

        axios.post(BASE_URL+"/tasks",{...this.state}).then(() =>{
            MySwal.fire({
                title: <p>Success!</p>,
                text: "Created a new task",
                icon: "success"
              })
              this.props.getTasks()
          });

          this.setState({
            color: "#7FCCD5",
            title: '',
            description: '',
            content: ''
        })

          document.getElementById("close").click()

    }

    render() {
        return (
            <div className="modal fade" id="createModal" aria-labelledby="createModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-body">
                <div className="colorset mb-4">
                    <label className="form-label">Task color</label>
                    <input type="color" className="form-control form-control-color" value={this.state.color} onChange={(e) => this.setState({color: e.target.value})}/>
                </div>

                <div className="mb-4">
                    <input type="text" className="input-custom" placeholder="Title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
                </div>

                <div className="mb-4">
                    <textarea className="input-custom" placeholder="Description" rows="4" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}></textarea>
                </div>

                <div className="mb-4">
                    <textarea className="input-custom" placeholder="Content" rows="10" value={this.state.content} onChange={(e) => this.setState({content: e.target.value})}></textarea>
                </div>


                </div>
                <div className="modal-footer d-flex justify-content-center mt-5">
                    <button className="create-button" onClick={this.createTask}>Create</button>
                    <button type="button" hidden={true} data-bs-dismiss="modal" id="close"></button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Modal_Create;