import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const Header = (props) => {
    return (
        <div>
            <Link to='/'>HOME</Link>
            <br />
            {
                props.login ?  <Fragment>
                <Link to='/login'>translate</Link>&nbsp;&nbsp;<Link to='/logout'>Logout</Link>
            </Fragment> : 
            <Link to='/login'>Login</Link>
            }
        </div>
    )
}

const mapState = (state) => ({
    login: state.header.login
})

const mapDispatch = null

export default connect(mapState, mapDispatch)(Header)