const initialTestData: ReglineItemState = {
    1: { id: 1, type: 'field', children: [] },
    2: { id: 2, type: 'field', children: [] },
    3: { id: 3, type: 'field', children: [] }
}

const reglineItems = (state: ReglineItemState = initialTestData, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
export default reglineItems