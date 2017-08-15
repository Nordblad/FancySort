import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ItemWrapper from './ItemWrapper'

export namespace ReglineItemList {
    export interface Props {
        pageNo: number,
        items?: number[]
    }

    export interface State {
        /* empty */
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ReglineItemList extends React.Component<ReglineItemList.Props, ReglineItemList.State> {

    render() {
        const { items, pageNo } = this.props;
        return (
            <div className="ReglineItemList">
                This is a list of regline items with pageNo {pageNo}.
                 {items && items.map(i => (<ItemWrapper key={i} id={i} />))}
            </div>
        );
    }
}

function mapStateToProps(state: RootState, ownProps: ReglineItemList.Props): Partial<ReglineItemList.Props> {
    return {
        items: state.pages[ownProps.pageNo].children // OR parentId?
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators(TodoActions as any, dispatch)
    };
}
