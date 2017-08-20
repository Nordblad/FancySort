import { SELECT_ITEM, SET_SELECTED_ITEMS, ADD_MESSAGE, DELETE_MESSAGE } from '../actions/editorUi'

const initialState = {
    selectedReglineItems: [],
    messages: []
}

let nextMessageId = 1

const editorUi = (state: EditorUiState = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_ITEMS: {
            console.log('SELECT ITEMS', action.reglineItemIds)
            return {
                ...state,
                selectedReglineItems: action.reglineItemIds
            }
        }

        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    { id: nextMessageId++, type: action.messageType, text: action.text }
                ]
            }
        }

        case DELETE_MESSAGE: {
            console.log('reducer, delete message', action.messageId)
            return {
                ...state,
                messages: state.messages.filter(m => m.id !== action.messageId)
            }
        }

        default:
            return state
    }
}

export default editorUi