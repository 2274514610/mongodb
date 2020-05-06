import React, {Component} from 'react'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
                这是一个通用的后台管理系统,基于 react + react-router + react-redux + antd 开发
            </div>
        )
    }
}