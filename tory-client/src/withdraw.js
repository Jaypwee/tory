import React, {Component} from 'react';
import { Button, Modal } from 'react-bootstrap';
import FetchElementWindow from './elementlist';

class WithdrawModal extends Component{
    constructor(){
        super();
        this.state = {
            showModal: false,
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
    existing(item){
        
    }
    changeName(event){
        this.props.actions.changeName(event.target.value)
        this.setState({name: event.target.value})
    }
    sendPost(){
        var data = {
            name: this.state.name,
        }
    }
    render(){
        return(
            <div>
                <Button className='standard'
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                재고 출고
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>연락처 추가</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h4>재료 출고</h4>
                    재고 이름:
                    <input type='text' value={this.state.name} onChange={(e)=>this.changeName.bind(this)}/>
                    연락처 전화번호:
                    <input type='button' value='추가하기' onClick={()=>this.sendPost()}/>
                    <FetchElementWindow 
                            items={this.props.items.filter}
                            existing={this.existing.bind(this)}    
                    />
                    {this.state.message}
                    </Modal.Body>
                </Modal> 
            </div>
        )
    }

    class CountModal