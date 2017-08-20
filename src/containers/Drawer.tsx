import * as React from 'react'

export namespace Drawer {
    export interface Props {
        width: number
    }

    export interface State {
        isOpen: boolean
    }
}

export default class Drawer extends React.Component<Drawer.Props, Drawer.State> {
    state = {
        isOpen: true
    }

    timer = null

    handleToggleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { width, children } = this.props
        const { isOpen } = this.state
        return (
            <div
                className="drawer"
                style={{
                    width: isOpen ? width : 0,
                    position: 'relative'
                }}>
                <div style={
                    {
                        position: 'fixed', top: 0,
                        right: 0, bottom: 0, width: width,
                        transform: 'translateX(' + (isOpen ? 0 : width) + 'px)',
                        transition: 'transform 220ms cubic-bezier(0.250, 0.460, 0.450, 0.940)'
                    }
                }>
                    {children}
                    <button
                        className="reg-drawer__toggle"
                        onClick={this.handleToggleClick}>
                        {isOpen ? '>>' : '<<'}
                    </button>
                </div>
            </div>
        )
    }
}