import { getUsersForServerId } from "../utils/api"

export const LOAD_USERS = 'messages/LOAD_USERS'

// ================= ACTION CREATORS ================= 
export const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

// ================= THUNKS ================= 
export const fetchServerUsersThunk = (id) => async (dispatch) => {
    const res = await getUsersForServerId(id);
    dispatch(loadUsers(res));
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

export default serverUserReducer;