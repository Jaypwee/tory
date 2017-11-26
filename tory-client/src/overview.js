import React, { Component } from 'react';
import { DropdownButton, Button, MenuItem, Grid, Row, Col, Table, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionGroup from './actions'
import AddItemModal from './additem.js';
import AddContactModal from './addcontact.js';
import Settings from './settings.js';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Fontawesome from 'react-fontawesome'
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'font-awesome/css/font-awesome.min.css';

class Overview extends Component{ //The whole overview section
    constructor(props){
        super(props);
        this.state = {
            settings: false
        };
        this.changeFilter = this.changeFilter.bind(this);
        this.changeToSettings = this.changeToSettings.bind(this);
    }  
    componentWillMount(){ //NEED TO IMPLEMENT PROMISE. AFTER FINISHING FETCH, MAKE LOADING GOAWAY
        this.props.actions.initialize()
    }
    changeToSettings(){
        this.setState({settings: !this.state.settings});
    }s
    changeFilter(eventKey){
        this.props.actions.changeFilter(eventKey-2)
    }

    render(){
        if(!this.props.items.fetched || !this.props.itemgroup.fetched || !this.props.contactlist.fetched || !this.props.settings.fetched || !this.props.logs.fetched){
            return <Loading/>
        }
        var windows = [];
        var context = "총괄현황";
        if(this.state.settings === false){
            windows.push(<TestTable 
                items={this.props.items.items}
                filter={this.props.items.filtershow}
                settings={this.props.settings.settings}
                itemgroup={this.props.itemgroup.IGList}
                logs={this.props.logs.logs}
            />);
            context = "설 정"
        }
        else{
            windows.push(<Settings settings={this.props.settings.settings} applychange={this.props.actions.updateSettings} changeWindow={this.changeToSettings} />)
        }
        return(
            <div>
            <Grid>
                <Row>
                    <Col lg={2}>       
                        <Button className='standard'
                            bsStyle="primary"
                            bsSize="large"
                            onClick={this.changeToSettings}>
                            {context}
                        </Button>          
                        <AddItemModal
                            items={this.props.items}
                            logs={this.props.logs}
                            actions={this.props.actions}
                            contactnames={this.props.contactlist.contactlist}
                            itemgroup={this.props.itemgroup}
                        />
                        <AddContactModal
                            contactlist={this.props.contactlist.contactlist}
                            applyChange={this.props.actions.addCL}
                        />
                        </Col>
                    <Col lg={10}>
                        <Row>
                        <FilterItemgroup 
                            changeFilter={this.changeState}
                            itemgroup={this.props.itemgroup.IGList}
                        />
                        </Row>
                        <Row>
                            {windows} 
                        </Row>
                    </Col>
                </Row>
                </Grid>
            </div>
        );
    }
}

class Loading extends Component{
    render(){
        console.log("loading")
        return(
            <div>
                <Fontawesome 
                    className = "fa fa-spinner fa-pulse fa-3x fa-fw"
                />Loading
            </div>
        )
    }
}

class FindOldest extends Component{
    constructor(){
        super();
        this.state={
            showModal : false,
            expirydate: 0
        }
    }
    open(){
        this.setState({showModal: true})
    }
    close(){
        this.setState({showModal: false})
    }
    render(){
        //do work on server side or client side? Client side is much faster :9 X>X
        var rows = [];
        var today = new Date() //need currentdate for this one
        var expirydate = today + this.state.expirydate;
        this.props.items.expiration.forEach(function(dates){
            if (dates === expirydate){
                rows.push() //THIS WILL BE THE NEW DATA ROW (Need to update the TestData section renamed)
            }
        })
        return(
            <div>
                <Button className='standard'
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                > 유통기한 재고 확인
                </Button>
            </div>
        )
    }

}

class FilterItemgroup extends Component{ //Filtering function
    render(){
        var i = 2;
        var IGlist = []
        this.props.itemgroup.forEach(function(itemgroup){
            IGlist.push(<MenuItem eventKey={i.toString()} onSelect={this.props.changeFilter}>{itemgroup.name}</MenuItem>)
            i++;
        }.bind(this))
        return(
            <DropdownButton className='standard' bsStyle={"default"} title={"Sort"} key={1} id={"dropdownsort"}>
                <MenuItem eventKey='1' onSelect={this.props.changeFilter}>Overview</MenuItem>
                {IGlist}
            </DropdownButton>
        )
    }
}
    
class TestTable extends Component{ //Table that shows the products (Filtering function connected)
    render(){
        //Setting Headers based on Settings
        var hdata = [<th>재고 이름</th>]
        if(this.props.settings[0].count){hdata.push(<th>재고 수량</th>)}
        if(this.props.settings[0].contact){hdata.push(<th>연락처 이름</th>);}
        if(this.props.settings[0].contactnumber){hdata.push(<th>연락처 번호</th>);}
        if(this.props.settings[0].recent){hdata.push(<th>최근 입고   </th>)}
        if(this.props.settings[0].lastused){hdata.push(<th>최근 출고</th>)}
        if(this.props.settings[0].expiration){hdata.push(<th>유효기한</th>)}
        //Now the Data for the table
        var rows = [];
        const IGList = []; //Gather all the itemgroups from node
        this.props.itemgroup.forEach(function(itemgroup){
            IGList.push(itemgroup.name);
        })
        var filter = this.props.filter;
        var settings = this.props.settings;
        var logs = this.props.logs;
        this.props.items.forEach(function(items){
            if (filter === -1){ //When it is set to overview
                rows.push(<TestData logs={logs} items={items} key={items.id} settings={settings}/>);
            }
            else{ //When filtered
                rows.push(<TestHeader itemgroup={IGList[filter]} key={IGList[filter]}/>);
                if(items.itemgroup ===IGList[filter]){
                    rows.push(<TestData logs={logs} items={items} key={items.id} settings={settings}/>);
                }
            }
        });
        return(
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        {hdata}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
}

class TestHeader extends Component{ //Headers when filtered
    render(){
        return <tr><th colSpan="7">{this.props.itemgroup}</th></tr>;
    }
}

class TestData extends Component{ //How the data is currently shown (shows all the data) Need to implement data settings
    constructor(){
        super();
            this.state = {
                moredata: false
            }
    }   
    moredataclose(){
        this.setState({moredata: false})
    }
    render(){
        var datas = []; //Data plural = datathis.props.items.items but please XD
        datas.push(<td>{this.props.items.name} ({this.props.items.size}x)</td>);
        if(this.props.settings[0].count){datas.push(<td>{this.props.items.size}개</td>);}
        if(this.props.settings[0].contact){datas.push(<td>{this.props.items.contactname}</td>);}
        if(this.props.settings[0].contactnumber){datas.push(<td>{this.props.items.contactnumber}</td>);}
        if(this.props.settings[0].recent){
            var date = Date.parse(this.props.items.entrylist[this.props.items.entrylist.length-1])
            var recent = new Date(date)
            datas.push(<td>{recent.toDateString()}</td>)
        }
        if(this.props.settings[0].lastused){
            var date = Date.parse(this.props.items.lastused);
            var lastused = new Date(date)
            datas.push(<td>{lastused.toDateString()}</td>)
        }
        if(this.props.settings[0].expiration){
            var date = Date.parse(this.props.items.expirationlist[0])
            var expiry = new Date(date)
            datas.push(<td>{expiry.toDateString()}</td>)
        }
        return(
            <tr onClick={()=>this.setState({moredata: true})}>
                {datas}
                <MoreData logs={this.props.logs} showModal={this.state.moredata} item={this.props.items} close={this.moredataclose.bind(this)}/>
            </tr>
        );
    }
}

class MoreData extends Component{
    constructor(){
        super()
        this.state={
            showModal: false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({showModal: nextProps.showModal})
    }
    close(){
        this.setState({showModal: false})
        this.props.close()
    }
    onRowSelect(){
        
    }
    onRowDeselect(){
        
    }
    render(){
        var data = [];
        var count = 0;
         var temp = this.props.item.expirationlist[0];
        // var expiries = this.props.item.expirationlist
        var item = this.props.item
        this.props.item.expirationlist.forEach(function(expiration){
            if(temp === expiration){
                count = count + 1;
            }
            else{
                let date = new Date(temp)
                temp = date.toLocaleDateString()
                data.push({
                    'name': item.name,
                    'contact': item.contactname,
                    'expiration': temp,
                    'count': count})
                count = 1;
                temp = expiration;
            }
        })
        let date = new Date(temp)
        temp = date.toLocaleDateString()
        data.push({
            'name': item.name,
            'contact': item.contactname,
            'expiration': temp,
            'count': count}) //To add the end
        const tableProp={
            mode: 'checkbox',
            clickToSelect: true,
            bgColor: 'blue'
        }
        return(
            <Modal bsSize='large' show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>재고 상세정보</Modal.Title>
            </Modal.Header>
            <Modal.Body>    
                <h3> 헤헤 </h3>
                <Grid>
                    <Row>
                        <Col>
                            <BootstrapTable containerStyle={ { width: '60%' }} data={data} selectRow={tableProp} striped hover condensed>
                                <TableHeaderColumn width='150' dataField='expiration' isKey={ true }>유효기간</TableHeaderColumn>
                                <TableHeaderColumn width='150' dataField='name'>재고 이름</TableHeaderColumn>
                                <TableHeaderColumn width='150' dataField='contact'>연락처 이름</TableHeaderColumn>
                                <TableHeaderColumn width='150' dataField='count'>재고 수량</TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            <BootstrapTable containerStyle={ { width: '60%' } } data={selected}
                        </Col>
                    </Row> */}
                    <Row>
                        <Col lg={4}>
                            <DepositLogs item={this.props.item} logs={this.props.logs} />
                        </Col>
                        <Col lg={4}>
                            <WithdrawLogs item={this.props.item} logs={this.props.logs} />
                        </Col>
                    </Row>
                </Grid>
            </Modal.Body>
            </Modal> 
        )
    }
}

class DepositLogs extends Component{
    render(){
        var filtered = [];
        var item = this.props.item;
        this.props.logs.forEach(function(log){
            if(log.name === item.name && log.contact === item.contactname){
                filtered.push(log);
            }
        })
        console.log("LAWL", filtered)
        return(
            <BootstrapTable containerStyle={ { width: '100%' } } data={filtered} condensed>
                <TableHeaderColumn dataField='deposits' isKey={true}>입고 현황</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

class WithdrawLogs extends Component{
    render(){
        var filtered = [];
        var item = this.props.item;
        this.props.logs.forEach(function(log){
            if(log.name === item.name && log.contact === item.contactname && log.deposits === undefined){
                filtered.push(log);
            }
        })
        console.log(filtered)
        return(
            <BootstrapTable containerStyle={ { width: '100%' } } data={filtered} condensed>
                <TableHeaderColumn dataField='withdraws' isKey={true}>출고 현황</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

//REDUX
function mapDispatchToProps(dispatch){
    return { actions: bindActionCreators(actionGroup, dispatch) }
}

export default connect((state)=>{
    return{
        items: state.items,
        contactlist: state.contactlist,
        itemgroup: state.itemgroup,
        settings: state.settings,
        logs: state.logs,
        filtershow: state.items.filtershow
    }
}, mapDispatchToProps)(Overview);
