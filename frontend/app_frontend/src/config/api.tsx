
//export const API_BASE_URL = 'http://localhost:8000/api';
export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const authRef = API_BASE_URL+'/auth';

export const UserRef = () => API_BASE_URL+'/users';
export const singleUserRef = (uid: any) => API_BASE_URL+"users/" + uid;