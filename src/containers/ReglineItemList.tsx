import * as React from 'react';
// import * as TodoActions from '../../actions/todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ReglineItem from './ReglineItem'

// This should be a stupid component right?

export namespace ReglineItemList {
    export interface Props {
        pageNo?: number,
        parentId?: number,
        childItemIds?: number[]
    }

    export interface State {
        /* empty */
    }
}

const Spacer = (props) => (<div></div>)

@connect(mapStateToProps, mapDispatchToProps)
export default class ReglineItemList extends React.Component<ReglineItemList.Props, ReglineItemList.State> {

    renderReglineItem = (id, index) => {
        const { pageNo, parentId } = this.props
        return (
            {}
        )
    }

    render() {
        const { childItemIds, pageNo, parentId } = this.props;
        // Redan här måste itemType fås fram för wrapper-inställningar
        return (
            <div className="ReglineItemList">
                <Spacer />
                {childItemIds.map((id, index) => (
                    [<ReglineItem
                        key={id}
                        id={id}
                        index={index}
                        pageNo={pageNo}
                        parentId={parentId} />,
                        <Spacer />]))}
            </div>
        );
    }
}

function mapStateToProps(state: RootState, ownProps: ReglineItemList.Props): Partial<ReglineItemList.Props> {
    return {
        childItemIds: ownProps.parentId != null ? state.reglineItems[ownProps.parentId].childIds : state.pages[ownProps.pageNo].children // OR parentId?
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators(TodoActions as any, dispatch)
    };
}
