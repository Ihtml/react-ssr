import React, {Fragment, Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {actions} from './store/actions'

class Header extends Component {
    render() {
        const {login, handleLogin} = this.props
        console.log("login:", login)
        return (
            <div>
                <Link to='/'>HOME</Link>
                <br />
                {
                    login ?  <Fragment>
                    <Link to='/login'>translate</Link>&nbsp;&nbsp;<Link to='/logout'>Logout</Link>
                </Fragment> : 
                <div onClick={handleLogin}>Login</div>
                }
            </div>
        )
    }
}

const mapState = (state) => ({
    login: state.header.login
})

const mapDispatch = (dispatch) => ({
    handleLogin() {
        console.log('没有登录')
        dispatch(actions.login())
    }
})

export default connect(mapState, mapDispatch)(Header)