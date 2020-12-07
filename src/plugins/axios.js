import axios from "axios";
import { Message } from "element-ui";

const baseURL = process.env.NODE_ENV === "production" ? "/api/" : "/api/";

const globalConfig = {
  baseURL,
  timeout: 10 * 1000
};

const globalAxios = axios.create(globalConfig);

// 统一处理不正常响应, 业务逻辑中只需要考虑接口正常调用的情况
globalAxios.interceptors.response.use(
  res => {
    if (res.data.success) {
      return res;
    } else {
      // 放行无会员权益的错误提示
      if (res.data.message === '用户卡不存在')
        return res;
      Message.error(res.data.message);
      return Promise.reject(res.data.message);
    }
  },
  err => {
    Message.error("网络错误");
    return Promise.reject(err);
  }
);

export default globalAxios;
