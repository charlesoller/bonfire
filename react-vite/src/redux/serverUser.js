import { getUsersForServerId, getCurrentUser, getAllUsers } from "../utils/api"

export const LOAD_ALL_USERS = 'users/LOAD_ALL_USERS'
export const LOAD_USERS = 'users/LOAD_USERS'
export const LOAD_CURRENT_USER = 'users/LOAD_CURRENT_USER'

// ================= ACTION CREATORS ================= 
export const loadAllUsers = (users) => ({
    type: LOAD_ALL_USERS,
    users
})

export const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

export const loadCurrentUser = (user) => ({
    type: LOAD_CURRENT_USER,
    user
})

// ================= THUNKS ================= 

export const fetchAllUsersThunk = () => async (dispatch) => {
    const res = await getAllUsers();
    dispatch(loadAllUsers(res));
}

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
        case LOAD_ALL_USERS: {
            return action.users;
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