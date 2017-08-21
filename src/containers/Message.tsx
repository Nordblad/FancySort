import * as React from 'react';
import { findDOMNode } from 'react-dom'
import * as classNames from 'classnames'
import { connect } from 'react-redux'

export namespace Message {
    export interface Props extends MessageModel {
        onDelete: (id: number) => void
    }

    export interface State {
        isEntering: boolean,
        isLeaving: boolean
        // show: boolean
    }
}

export default class Message extends React.Component<Message.Props, Message.State> {
    state = { isEntering: true, isLeaving: false }

    timer = null

    componentDidMount() {
        // console.log('Showing message')
        // let n = findDOMNode(this).clientHeight
        // console.log('HEIGHT:', n)
        setTimeout(() => {
            this.setState({ isEntering: false })
            this.timer = setTimeout(this.removeMessage, 2000)
        }, 1)
    }

    componentWillUnmount() {
        // console.log('MESSAGE UNMOUNT!')
        clearTimeout(this.timer)
    }

    removeMessage = () => {
        // console.log('Hiding message')
        this.setState({ isLeaving: true })
        this.timer = setTimeout(() => {
            this.props.onDelete(this.props.id)
        }, 150)
    }

    getIcon = (type: MessageType) => {
        switch (type) {
            case 'success':
                return <i className="fa fa-check-circle" aria-hidden="true"></i>

            default:
                return null
        }
    }

    render() {
        const { id, type, text } = this.props
        const { isEntering, isLeaving } = this.state
        // console.log('RENDERING ITEM WRAPPER' + id, item)
        const classes = classNames({
            'reg-message': true,
            'is-entering': isEntering,
            'is-leaving': isLeaving,
            'is-success': type === 'success'
        })

        return (
            <div className={classes}>
                <div className="reg-message__icon">{this.getIcon(type)}</div>
                <div className="reg-message__text">
                    {text}
                </div>
            </div>)
    }
}