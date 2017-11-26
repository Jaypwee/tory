import React, {Component} from 'react';
import { Button, Modal } from 'react-bootstrap';
import Fontawesome from 'react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';

class AddIGModal extends Component{
    constructor(){
        super();
        this.state = {
            showModal: false,
            name: ''
        }
        this.baseState = this.state
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    close(){
        this.setState({showModal: false});
    }
    open(){
        this.setState({showModal: true});
    }
    sendPost(){
        var data = {
            "name": this.state.name
        }   
        var sdata = JSON.stringify(data)
        this.props.actions.addIG(sdata)
        this.setState(this.baseState)
    }
    render(){
        return(
            <div>
                <Fontawesome
                            className= "fa fa-plus-square"
                            aria-hidden="true"
                            onClick={this.open}
                />
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>연락처 추가</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h4> 그룹 추가하기</h4>
                    그룹 이름:
                    <input type='text' value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})}/>
                    <input type='button' value='추가하기' onClick={()=>this.sendPost()}/>
                    </Modal.Body>
                </Modal>  
            </div>
        )
    }
}

export default AddIGModal;