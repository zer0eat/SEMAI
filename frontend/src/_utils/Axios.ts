import axios from "axios";

const persistRoot = localStorage.getItem('persist:root');
const store =  persistRoot ? JSON.parse(persistRoot) : "";
const token = JSON.parse(store.user)?.token || "";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'accesstoken' : token,
  }
});

export default Axios;

// Axios.interceptors.request.use(
//   (config) => {
//     const token = store.getState().user.token;
//     if (token) {
//       config.headers["accesstoken"] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// store.subscribe(() => {
//   const token = store.getState().user.token;
//   console.log(token);
//   Axios.defaults.headers.common['accesstoken'] = token;
// });

// const Axios = () => {
//   // 인증 토큰을 가져옴
//   const token = useSelector((state:RootState) => state.user.token);
//
//   // Axios 인스턴스를 생성하고, 설정값을 지정함
//   const instance = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
//     headers: {
//       'accesstoken': `${token}`,
//     },
//   });
//
//   return instance;
// };

// async function Axios() {
//
// }

