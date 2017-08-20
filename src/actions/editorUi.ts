export const SELECT_ITEM = 'SELECT_ITEM'
export const SET_SELECTED_ITEMS = 'SET_SELECTED_ITEMS'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

export function addMessage(messageType: MessageType, text: string) {
    return {
        type: ADD_MESSAGE,
        messageType,
        text
    }
}

export function deleteMessage(messageId: number) {
    return {
        type: DELETE_MESSAGE,
        messageId
    }
}

export function setSelectedItems(reglineItemIds: number[]) {
    return {
        type: SET_SELECTED_ITEMS,
        reglineItemIds
    }
}

const getAllIdsToSelect = (items: ReglineItemModel[], reglineItemId: number) => {
    let ids = [reglineItemId]
    while (true) {
        let parentId = getParentId(items, ids[ids.length-1])
        if (parentId != null) {
            ids.push(parentId)
        } else {
            break;
        }
    }
    return ids
}

function getParentId (items: ReglineItemModel[], id: number) {
    let parent = items.find(i => i.childIds.indexOf(id) > -1)
    return parent ? parent.id : null
}

export const selectItem = (reglineItemId: number) => {
    return (dispatch, getState: () => RootState) => {
        let items = Object.values(getState().reglineItems)
        let ids = getAllIdsToSelect(items, reglineItemId)
        console.log('SelectItem2', reglineItemId, ids)
        dispatch(setSelectedItems(ids))
    }
}