// reducers have two arguments: state and action
// state is not application state, but only state the
// reducer is responsible for
export default function(state = null, action) {
    switch(action.type) {
        case 'BOOK_SELECTED':
            return action.payload;
    }

    return state;
}
