import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTranslationList} from './store/actions'

class Translation extends Component {
    getList() {
        const {list} = this.props
        return list.map(item => <div key={item.id}>{item.title}</div>)
    }
    componentDidMount() {
        if (!this.props.list.length) {
            this.props.getTranslationList()
        }
    }
    render(){
        return (
            <div>
                Translation
                {this.getList()}
            </div>
        )
    }
}

Translation.loadData = (store) => {
    return store.dispatch(getTranslationList())
}

const mapStateToProps = state => ({
    list: state.translationReducer.translationList
})
const mapDispatchToProps = dispatch = ({
    getTranslationList() {
        dispatch(getTranslationList())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Translation)
