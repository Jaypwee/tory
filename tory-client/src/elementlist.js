import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from 'lodash';
import './index.css'

class FetchElementWindow extends Component{
    render(){
        var data = []   
        var count = 0
        this.props.items.forEach((items)=>{
            data.push(<ListGroupItem onClick={()=>this.props.existing(items)}>
                재고이름: {items.name}  /  
                묶음수량: {items.size}  /  
                연락처정보: {items.contactname}
            </ListGroupItem>)
        })
        return(
            <div >
                <ListGroup>
                    {data}
                </ListGroup>
            </div>
        )
    }
}

export default FetchElementWindow;