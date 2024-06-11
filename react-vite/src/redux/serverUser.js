import { getUsersForServerId, getCurrentUser } from "../utils/api"

export const LOAD_USERS = 'messages/LOAD_USERS'
export const LOAD_CURRENT_USER = 'users/LOAD_CURRENT_USER'

// ================= ACTION CREATORS ================= 
export const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

export const loadCurrentUser = (user) => ({
    type: LOAD_CURRENT_USER,
    user
})

// ================= THUNKS ================= 
export const fetchServerUsersThunk = (id) => async (dispatch) => {
    const res = await getUsersForServerId(id);
    dispatch(loadUsers(res));
}

export const fetchCurrentUser = () => async (dispatch) => {
    const res = await getCurrentUser();
    dispatch(loadCurrentUser(res))
}


// ================= REDUCER ================= 
const serverUserReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            const usersState = {};
            action.users.forEach((user) => {
                usersState[user.id] = user;
            })
            return usersState;
        }

        default:
            return state;
    }
}

export const currentUserReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CURRENT_USER: {
            return { ...state, [action.user.id]: action.user}
        }

        default:
            return state;
    }
}

export default serverUserReducer;