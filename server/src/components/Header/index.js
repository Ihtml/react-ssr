import React, {Fragment, Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {actions} from './store/'

class Header extends Component {
    render() {
        const {login, handleLogin, handleLogout} = this.props
        console.log("login:", login)
        return (
            <div>
                <Link to='/'>HOME</Link>
                <br />
                {
                    login ?  <Fragment>
                    <Link to='/login'>translate</Link>&nbsp;&nbsp;<div onClick={handleLogout}>Logout</div>
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
    },
    handleLogout() {
        console.log("退出登录")
        dispatch(actions.logout())
    }
})

export default connect(mapState, mapDispatch)(Header)