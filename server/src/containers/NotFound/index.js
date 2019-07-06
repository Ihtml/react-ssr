import React, {Component} from 'react'

class NotFound extends Component {
    componentWillMount(){
        const {staticContext} = this.props
        // 只有服务端渲染的时候才设置
        staticContext && (staticContext.NOT_FOUND = true)
    }
    render() {
        return (
            <div>
                404 Not Found
            </div>
        )
    }
}

export default NotFound