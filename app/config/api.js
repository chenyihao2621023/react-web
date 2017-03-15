let baseUri, host;

if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test"){
  host = "http://localhost:4000";
  baseUri = host + "/api/v1/";
}else{
  // baseUri = "http://localhost:4000/api/v1/";
  host = "http://localhost:4000";
  baseUri = host + "/api/v1/";
}

export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'auth',
  users: 'users',
  menu:'chatlist',
  time:'timeContent',
  message: 'message',
  goods:'goodsList',
  news:'news',
  theme:'theme',
  items:'items',
  recording:'recording',
  label:'treeData',
  transfer:'transfer',
  service:'service',
  platform:'platform',
  trajectory:'trajectory'
};
