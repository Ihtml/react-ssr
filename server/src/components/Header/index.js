import React, {Fragment, Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {actions} from './store/'
import styles from './style.css'
import withStyle from '../../withStyle'

class Header extends Component {
    componentWillMount(){
        if (this.props.staticContext) {
            this.props.staticContext.css.push(styles._getCss())
        }
    }
    render() {
        const {login, handleLogin, handleLogout} = this.props
        return (
            <div className={styles.container}>
                <Link to='/' className={styles.item}>HOME</Link>
                {
                    login ?  <Fragment>
                    <Link to='/translation' className={styles.item}>TRANSLATION</Link>&nbsp;&nbsp;<div className={styles.item} onClick={handleLogout}>LOGOUT</div>
                </Fragment> : 
                <div onClick={handleLogin} className={styles.item}>LOGIN</div>
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
        console.log('登录操作')
        dispatch(actions.login())
    },
    handleLogout() {
        console.log("退出登录")
        dispatch(actions.logout())
    }
})

export default connect(mapState, mapDispatch)(withStyle(Header, styles))