import React, {Component} from 'react';
import { Button, Modal, ListGroup, ListGroupItem     } from 'react-bootstrap';
import FetchElementWindow from './elementlist.js';
import Datepicker from 'react-datepicker';
import moment from 'moment';
import AddIGModal from './addIG.js';
import 'react-datepicker/dist/react-datepicker.css';

class AddItemModal extends Component{
    constructor(props){
        super(props);
        this.initialState = {
            showModal: false,
            message: '',   
            name: '',
            itemgroup: '',
            size: '',
            entries: [],
            expiries: [],
            entrydate: moment(),
            expirydate: moment().add(30, 'd')
        };
        this.state = this.initialState
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.setContact = this.setContact.bind(this);
        this.setGroup = this.setGroup.bind(this);
        this.changeEntry = this.changeEntry.bind(this);
        this.changeExp = this.changeExp.bind(this);
    }

    close() {
        this.setState(this.initialState);
    }
    open() {
        this.setState({ showModal: true });
    }
    setContact(e){
        if(e.target.value !== "none"){
            var data = JSON.parse(e.target.value)
        }
        this.setState({contactname: data.name, contactnumber: data.number});
    }
    setGroup(e){
            this.setState({itemgroup: e.target.value});
    }
    sendPost() {
        if(!isNaN(parseInt(this.state.size)) && (function(x) { return (x | 0) === x; })(parseFloat(this.state.size))){ //Checking if size is a number
            var newentries = this.props.items.entrylist
            var newexpiries = this.props.items.expirylist
            var logdate = new Date(this.state.entrydate)
            logdate = logdate.toLocaleDateString()
            let i=0;
            for (i; i<this.state.size; i++){
                newentries = newentries.concat(this.state.entrydate.toISOString())
                newexpiries = newexpiries.concat(this.state.expirydate.toISOString())
            }
            var size = 0
            if (parseInt(this.props.items.size) !== undefined && isNaN(parseInt(this.props.items.size)) === false){
                size = parseInt(this.props.items.size)
            }
            var data = {
                "_id": this.props.items._id,
                "name": this.props.items.name,
                "size": size + parseInt(this.state.size),
                "itemgroup": this.props.items.itemgroup,
                "contactname": this.props.items.contactname,
                "contactnumber": this.props.items.contactnumber,
                "entrylist": newentries,
                "expirationlist": newexpiries
            };

            var logdata = {
                "name": this.props.items.name,
                "contact": this.props.items.contactname,
                "deposits": logdate + "에 "+this.state.size+"개 입고"
            }
            let sdata = JSON.stringify(data)
            let ldata = JSON.stringify(logdata)
            this.props.actions.addItem(sdata)
            this.props.actions.addDeposit(ldata)
            this.props.actions.reset()
            this.setState({name: "", size: ""})
        }
        else if(this.state.name === '' //If one of a slot is empty
        || this.state.size === '' 
        || this.props.items.contactname === '' 
        || this.props.items.itemgroup === ''){
            alert('모든 항목을 입력해주시오')
        }
        else{ //If size section does not contain a number
            alert('수량에 숫자만 입력해주시오')
        }   
    }
    changeEntry(date){
        this.setState({entrydate: date}) 
    }   
    changeExp(date){
        this.setState({expirydate: date})
    }
    changeName(e){
        this.setState({
            name: e.target.value
        })
        this.props.actions.changeName(e)
    }
    changeSize(e){
        this.setState({size: e.target.value})
    }
    existing(item){
        this.props.actions.changeToExisting(item)
        this.setState({
            name: item.name,
        })
    }
    render(){ //Create a window that shows all items, if clicked changes all the input states to the fetched value.
        if(this.props.items.added){
            this.props.actions.fetchItems()
        }
        return( 
            <div>
                <Button className='standard'
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >   
                재고입력
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>재고입력</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <FetchElementWindow

                                items={this.props.items.filter}
                                existing={this.existing.bind(this)}    
                            />
                        <h4> TestTest </h4>
                        <div>
                        재고 이름:
                        <input name='name' value={this.state.name} type='text' onChange={this.changeName.bind(this)}/>
                        입고 수량:
                        <input name='size' value={this.state.size} type='text' onChange={this.changeSize.bind(this)}/>
                        <br/>연락처 추가:
                        <SelectContact value={this.props.items.contactname} contactnames={this.props.contactnames} setcontact={this.props.actions.changeContact}/>
                        그룹:
                        <SelectItemgroup value={this.props.items.itemgroup} itemgroup={this.props.itemgroup.IGList} setitemgroup={this.props.actions.changeIG}/>
                        <AddIGModal 
                            itemgroup={this.props.itemgroup}
                            actions={this.props.actions}
                        />   
                        <br/>입고날짜:
                        <Datepicker 
                            selected={this.state.entrydate}
                            onChange={this.changeEntry}
                            showYearDropdown
                            monthsShown={2}/>
                        유통기한:
                        <Datepicker 
                            selected={this.state.expirydate}
                            onChange={this.changeExp}
                            showYearDropdown
                            monthsShown={2}/>
                        <input name='submit' type='button' value='추가하기' onClick={()=>this.sendPost()}/>
                        {this.state.message}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

class SelectItemgroup extends Component{
    render(){
        var grouplist = [];
        console.log("does this render?", this.props.itemgroup)
        this.props.itemgroup.forEach(function(itemgroup){
            grouplist.push(<option value={itemgroup.name}>{itemgroup.name}</option>)
        });
        return(
            <select value={this.props.value} name="itemgroup" onChange={this.props.setitemgroup}>
                <option value="none">그룹 선택</option>
                {grouplist}
            </select>
        )
    }
}

class SelectContact extends Component{
    render(){
        var contactlist =[];
        var selectedvalue = 'none'
        var value = this.props.value
        this.props.contactnames.forEach(function(contactnames){
            if(value === contactnames.name){
                selectedvalue = JSON.stringify(contactnames)
            }
            contactlist.push(<option value={JSON.stringify(contactnames)}>{contactnames.name}</option>)
        })
        return(
            <select value={selectedvalue} name="contactname" onChange={this.props.setcontact}>
                <option value="none">연락처 선택</option>
                {contactlist}
            </select>
        )
    }
}

export default AddItemModal;