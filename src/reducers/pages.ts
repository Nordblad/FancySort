const initialTestData: PageState = [
    { id: 0, children: [1, 5] }
]

const pages = (state: PageState = initialTestData, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
export default pages