import * as storageSerive from '../../services/storage';

const user = storageSerive.loadUser() ? storageSerive.loadUser() : {}

const handleUser = (state = user, action) => {
  let updatedState;
  switch (action.type) {
    case "LOGIN":
      updatedState = action.payload;
      storageSerive.storeUser(updatedState);
      storageSerive.storeAccessToken(updatedState.accessToken);
      storageSerive.storeRefreshToken(updatedState.refreshToken);
      return updatedState;
      break;

    case "SIGNOUT":
      updatedState = action.payload;
      storageSerive.clearUserData();
      return updatedState;
      break;

    case "REGISTER":
      updatedState = action.payload;
      storageSerive.storeUser(updatedState);
      return updatedState;
      break;
    
    case "UPDATE_DETAIL":
      updatedState = {...state, firstName: action.payload.firstName, lastName: action.payload.lastName};
      storageSerive.storeUser(updatedState);
      return updatedState;
      break;
    default:
      return state;
      break;
  }
};

export default handleUser;
