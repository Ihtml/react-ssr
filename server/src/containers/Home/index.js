import React, {Component} from 'react'
import Header from '../../components/Header'
import {connect} from 'react-redux'
import {getHomeList} from './store/actions'

class Home extends Component {
    getList() {
        const {list} = this.props
        return list.map((item) => {
            return <div key={item.docid}><a href={item.link} >{item.title}</a></div>
        })
    }
    render(){
        return (
            <div>
                <Header />
                <div>this is new Home component, my name is {this.props.name}</div>
                <button onClick={()=>{alert('clicked!')}}>
                    click
                </button>
                {this.getList()}
            </div>
        )
    }

    componentWillMount(){
        this.props.getHomeList()
    }
}

Home.loadData = () => {
    // 负责在服务端渲染之前，把这个路由需要的数据提前加载好
    
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
