export default obj => Object.keys(obj).filter(k => !!obj[k]).map(key => `${key}=${obj[key]}`).join('&');
