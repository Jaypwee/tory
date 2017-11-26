import React, {Component} from 'react';

class Settings extends Component{
    constructor(props){
        super(props);
        this.state={
            message: "",
            count: props.settings[0].count,
            contact: props.settings[0].contact,
            contactnumber: props.settings[0].contactnumber,
            recent: props.settings[0].recent,
            lastused: props.settings[0].lastused,
            expiration: props.settings[0].expiration
        }
        this.turnCount = this.turnCount.bind(this)
        this.turnContact = this.turnContact.bind(this)
        this.turnCNumber = this.turnCNumber.bind(this)
        this.turnRecent = this.turnRecent.bind(this)
        this.turnLastused = this.turnLastused.bind(this)
        this.turnExpiration = this.turnExpiration.bind(this)
    }
    sendOverview(){ //overview settings
        var data = {
            "name": "overview",
            "count": this.state.count,
            "contact": this.state.contact,
            "contactnumber": this.state.contactnumber,
            "recent": this.state.recent,
            "lastused": this.state.lastused,
            "expiration": this.state.expiration
        };
        const sdata = JSON.stringify(data);
        this.props.applychange(sdata)
    }
    turnCount(){
        this.setState({count: !this.state.count})
    }
    turnContact(){
        this.setState({contact: !this.state.contact})
    }
    turnCNumber(){
        this.setState({contactnumber: !this.state.contactnumber})
    }
    turnRecent(){
        this.setState({recent: !this.state.recent})
    }
    turnLastused(){
        this.setState({lastused: !this.state.lastused})
    }
    turnExpiration(){
        this.setState({expiration: !this.state.expiration})
    }
    render(){   
        return(
            <div>
                개수 표시:      
                <FlipSwitch id='fs1' checked={this.state.count} change={this.turnCount}/><br/>
                연락처 이름 표시:      
                <FlipSwitch id='fs2' checked={this.state.contact} change={this.turnContact}/><br/>
                연락처 번호 표시:      
                <FlipSwitch id='fs3' checked={this.state.contactnumber} change={this.turnCNumber}/><br/>
                최근 입고 날짜 표시:        
                <FlipSwitch id='fs4' checked={this.state.recent} change={this.turnRecent}/><br/>
                마지막 사용 날짜 표시:
                <FlipSwitch id='fs5' checked={this.state.lastused} change={this.turnLastused}/><br/>
                유통기한 표시:
                <FlipSwitch id='fs6' checked={this.state.expiration} change={this.Expiration}/><br/>
                <input name='submit' type='button' value='설정 변경하기' onClick={()=>this.sendOverview()}/>
                {this.state.message}
            </div>
        )
    }
}

class FlipSwitch extends Component{
    render(){

        return(
            <div className="flipswitch">
            <input type="checkbox" name="flipswitch" className="flipswitch-cb" id={this.props.id} defaultChecked={this.props.checked} onChange={this.props.change}/>
                <label className="flipswitch-label" htmlFor={this.props.id}>
                    <div className="flipswitch-inner"></div>
                    <div className="flipswitch-switch"></div>
                </label>
            </div>
        )
    }
}

export default Settings;