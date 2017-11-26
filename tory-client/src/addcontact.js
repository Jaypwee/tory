import React, {Component} from 'react';
import { Button, Modal } from 'react-bootstrap';

class AddContactModal extends Component{
    constructor(){
        super();
        this.state = {
            showModal: false,
            message: '',
            name: '',
            number: ''
        }
        this.open=this.open.bind(this);
        this.close=this.close.bind(this);
    }

    close(){
        this.setState({showModal: false});
    }
    open(){
        this.setState({showModal: true});
    }
    sendPost(){
        var data = {
            "name": this.state.name,
            "number": this.state.number
        }   
        const sdata = JSON.stringify(data);
        this.props.applyChange(sdata);
    }
    render(){
        return(
            <div>
                <Button className='standard'
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                연락처 추가
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>연락처 추가</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h4> 연락처를 추가합시다. 현재 추가된 연락처도 옆에 보이게 해야함</h4>
                    연락처 이름:
                    <input type='text' value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})}/>
                    연락처 전화번호:
                    <input type='text' value={this.state.number} onChange={(e)=>this.setState({number: e.target.value})}/>
                    <input type='button' value='추가하기' onClick={()=>this.sendPost()}/>
                    {this.state.message}
                    </Modal.Body>
                </Modal>  
            </div>
        )
    }
}

export default AddContactModal;