import * as React from 'react';
import { connect } from 'react-redux'
import Message from './Message'
import { deleteMessage } from '../actions/editorUi'

export namespace MessageList {
    export interface Props {
        deleteMessage?: typeof deleteMessage,
        messages?: MessageModel[]
    }

    export interface State {
        /* empty */
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MessageList extends React.Component<MessageList.Props, MessageList.State> {
    handleDeleteMessage = (id) => {
        console.log('DELETE MESSAGE ' + id)
        this.props.deleteMessage(id)
    }

    render() {
        const { messages } = this.props;
        // console.log('RENDERING ITEM WRAPPER' + id, item)
        return (
            <div className="reg-messagelist">
                <div className="reg-messagelist__container">
                    {messages.map(m => (
                        <Message key={m.id}  {...m} onDelete={this.handleDeleteMessage} />
                    ))}
                </div>
            </div>)
    }
}

function mapStateToProps(state: RootState) {
    return {
        messages: state.editorUi.messages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteMessage: (id) => dispatch(deleteMessage(id))
    }
}