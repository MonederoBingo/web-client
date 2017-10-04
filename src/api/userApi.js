import {callApiService} from "./apiUtils";

class UserApi {

  static getAllUsers() {
    return callApiService.callApiService('GET', 'user/getAll', null);
  }

  static createUser(user) {
    return callApiService.callApiService('POST', '/user/create', user);
  }

  static updateUser(user) {
    return callApiService.callApiService('PUT', '/user/update', user);
  }

  static deleteUser(user) {
    return callApiService.callApiService('DELETE', '/user/delete', {user_id: user.user_id});
  }
}

export default UserApi;
