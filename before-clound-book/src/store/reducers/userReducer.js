let initState = {
    loginState: false,    //默认用户登录状态为false
    userName: '',   //用户登录名
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_LOGIN_STATE':
            return {
                ...state,
                loginState: action.payload.loginState,
                userName:  action.payload.userName
            };
        default:
            return state
    }
};