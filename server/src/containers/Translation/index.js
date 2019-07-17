import React, { Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { Helmet } from "react-helmet";
import {getTranslationList} from './store/actions'
import {Redirect} from 'react-router-dom'
import styles from './styles.css'
import widthStyle from '../../withStyle'

class Translation extends Component {
    getList() {
        const {list} = this.props
        return list && list.map(item => <div className={styles.item} key={item.id}>{item.title}</div>)
    }
    componentDidMount() {
        if (!this.props.list.length) {
            this.props.getTranslationList()
        }
    }
    render(){
        return this.props.login ? (
            <Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content="这是翻译页面，学习react服务端渲染原理" />
                    <title>翻译页</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <div className={styles.container}>
                    {this.getList()}
                </div>
            </Fragment>
        ) : <Redirect to='/' />       
    }
}

const mapStateToProps = state => ({
    list: state.translation.translationList,
    login: state.header.login
})
const mapDispatchToProps = dispatch => ({
    getTranslationList() {
        dispatch(getTranslationList())
    }
})

const ExportTranslation = connect(mapStateToProps, mapDispatchToProps)(widthStyle(Translation, styles))
ExportTranslation.loadData = (store) => {
    return store.dispatch(getTranslationList())
}
export default ExportTranslation
