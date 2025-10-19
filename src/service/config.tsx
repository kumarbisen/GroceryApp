import { Platform } from "react-native";

export const BASE_URL = Platform.OS==='android'? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api'
export const SOCKET_URL = Platform.OS==='android'? 'http://10.0.2.2:3000' : 'http://localhost:3000'
export const BRANCH_ID = '688e6a5ddc2a8fd6c5fd5c08'

// YOUR NETWORK IP OR HOSTED URL

// export const BASE_URL = 'http://192.168.23.177:3000/api';
// export const SOCKET_URL = 'http://192.168.23.177:3000';



export const GOOGLE_MAP_API = "AIzaSyCfWPSt06oVbj8mvSTJWppBwWsX6orVayc"
