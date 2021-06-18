export const LoginStart = (userCredentials) => ({
  type: "Login_Start",
});

export const LoginSuccess = (user) => ({
  type: "Login_Success",
  payload: user,
});

export const LoginFailure = () => ({
  type: "Login_Failure",
});

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_Start",
  });
  
  export const UpdateSuccess = (user) => ({
    type: "UPDATE_Success",
    payload: user,
  });
  
  export const UpdateFailure = () => ({
    type: "UPDATE_Failure",
  });

export const Logout = () => ({
  type: "Logout",
});
