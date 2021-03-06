import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { Helmet } from "react-helmet";
import {getHomeList} from './store/actions'
import styles from './style.css'
import withStyle from '../../withStyle'

class Home extends Component {
    componentWillMount(){
        if (styles._getCss) {
            this.props.staticContext.css.push(styles._getCss())
        }
    }
    getList() {
        const { list } = this.props;
            // return <div key={item.docid}><a href={item.link} >{item.title}</a></div>
        return list && list.map(item => <div className={styles.item} key={item.id}>{item.title}</div>)
    }
    render(){
        return (
            <Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content="这是react-ssr框架，学习react服务端渲染原理" />
                    <title>这是一个react-ssr脚手架</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <div className={styles.container}>
                    <div>this is new Home component, my name is {this.props.name}</div>
                    <button onClick={() => { alert('clicked!') }}>
                        click
                </button>
                    {this.getList()}
                </div>
            </Fragment>
        )
    }

    componentDidMount(){
        // 只有列表里没有数据的时候，才会发请求，性能优化
        if (!this.props.list.length) {
            this.props.getHomeList()
        }
    }
}

const mapStateToProps = state => ({
    list: state.home.newsList,
    name: state.home.name
})

const mapDispatchToProps = dispatch => ({
    getHomeList(){
        dispatch(getHomeList())
    }
})
const ExportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles))
// 负责在服务端渲染之前，把这个路由需要的数据提前加载好
ExportHome.loadData = (store) => {
    return store.dispatch(getHomeList())
}
export default ExportHome
