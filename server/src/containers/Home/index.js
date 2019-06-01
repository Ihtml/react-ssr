import React, {Component} from 'react'
import Header from '../../components/Header'
import {connect} from 'react-redux'
import {getHomeList} from './store/actions'

class Home extends Component {
    render(){
        return (
            <div>
                <Header />
                <div>this is new Home component, my name is {this.props.name}</div>
                <button onClick={()=>{alert('clicked!')}}>
                    click
                </button>
            </div>
        )
    }

    componentWillMount(){
        this.props.getHomeList()
    }
}

const mapStateToProps = state => ({
    name: state.home.name
})

const mapDispatchToProps = dispatch => ({
    getHomeList(){
        dispatch(getHomeList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
