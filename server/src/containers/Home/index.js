import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getHomeList} from './store/actions'
import styles from './style.css'

class Home extends Component {
    componentWillMount(){
        if (styles._getCss) {
            this.props.staticContext.css = styles._getCss()
        }
    }
    getList() {
        const { list } = this.props;
            // return <div key={item.docid}><a href={item.link} >{item.title}</a></div>
        return list && list.map(item => <div key={item.id}>{item.title}</div>)
    }
    render(){
        return (
            <div className={styles.testbg}>
                <div>this is new Home component, my name is {this.props.name}</div>
                <button onClick={()=>{alert('clicked!')}}>
                    click
                </button>
                {this.getList()}
            </div>
        )
    }

    componentDidMount(){
        // 只有列表里没有数据的时候，才会发请求，性能优化
        if (!this.props.list.length) {
            this.props.getHomeList()
        }
    }
}

Home.loadData = (store) => {
    // 负责在服务端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(getHomeList())
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
