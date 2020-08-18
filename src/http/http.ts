/***
 * @auth: dmx
 * @time: 2020/6/18
 * @func: 基于axios 二次封装
 ***/
import AxiosInstance, {
  AxiosError, AxiosPromise,
  AxiosRequestConfig, AxiosStatic, Method
} from "axios";
// 定义一个请求的参数类型声明
type requestFn = (url: string, params?: Object, data?: Object | null) => AxiosPromise;

class Http {

  /*
  * 说明一下为什么要用 AxiosInstance 而不用 axios.create()这种方式
  * 可能将来咱么这个项目要扩展，需要请求另一个网站的数据
  * 比如 需要请求 baidu.com，又需要请求tencent.com
  * 那么就有一个问题，axios.create()创建的对象，baseUrl有且只有一个，也就是说只可以指定一个
  * 如果制定了百度的  就不能在指定腾讯的 指定了也不起作用
  * AxiosInstance 他就是为了解决这个问题
  * */

  // 请求对象
  private axios: AxiosStatic = AxiosInstance;


  // 在constructor里面进行初始化设置
  constructor () {
    const { axios } = this;
    // axios.defaults.timeout = 10000;
    // axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.defaults.headers = {
      "Content-Type": 'application/json;charset=UTF-8',
    }

    // 去执行 请求拦截器 和 响应拦截器
    this.useInterceptResponse();
    this.useInterceptRequest();
  }

  // 响应拦截器
  useInterceptResponse () {
    this.axios.interceptors.response.use(
      (res) => {
        // 处理逻辑
        if( res.data.code !== 200 ) {
          return Promise.reject(res.data);
        }
        // 如果还有别的逻辑 就在这里加就行了
        return Promise.resolve(res.data);
      },
      (error: AxiosError) => {


        // if( error.response ) {
        //   // http的状态码 非200的时候
        //   if( error.response.status >= 500 ) message.error('服务器错误');
        // } else if( error.request ) {
        //   // ...
        // } else {
        //   // 其他错误
        //   message.error(error.message);
        // }

        return Promise.reject(error);
      }

    );
  }

  // 请求拦截器
  useInterceptRequest () {

    this.axios.interceptors.request.use(

      async (config: AxiosRequestConfig) => {
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    )

  }







  // 封装一个底层的公用方法
  /*
  * type: 请求的方式
  * url: 请求的地址
  * options: 请求的参数
  * */
  private fetchData (type:Method, url: string, options?: Object, isComplex?: boolean) {
    return this.axios({
      method:type,
      url,
      ...options,
    })
  }


  /*
  * get请求封装
  * url --- 请求地址
  * params --- 请求的参数
  * */
  public get: requestFn = (url, params) => {
    // get 可以不传参数
    if( !params ) return this.fetchData('get', url);
    // 因为get请求，很有可能会被缓存，所以我们需要给它加一个随机参数，
    // 实现： 因为params 是已经存在的， 我们只需要给它扩展一个随机数的变量即可
    const newParams = Object.assign(params, {
      [`dmx${new Date().getTime()}`]: 1,
    });

    return this.fetchData('get', url, {params: newParams});
  }


  /*
  * 因为post put patch delete 逻辑处理其实都一样，所以直接可以把底层函数封装出来们直接调用
  * */
  private commonRequest (
    type: Method,
    url: string,
    params?: Object,
    data?: Object | null,
  ):AxiosPromise  {
    // 合并一下参数
    let options: Object = {
      params,
      data,
    }

    if( params && data === undefined ) {
      options = {
        data: params,
      }
    }
    if( data === null ) {
      options = {
        params,
      }
    }

    return this.fetchData(type, url, options, true );
  }


  // 抽离公共逻辑，可能会存在一些问题，咱们再实际运用这个请求的时候，在处理。（不一定有问题，只是可能）

  /*
  * post请求
  * url --- 地址
  * params --- 请求的url上加参数 比如?action=123
  * data --- 请求体 body 内的数据
  * {a, b}
  * */
  public post: requestFn = (url, params, data) => {
    return this.commonRequest('post', url, params, data);
  }

  /*
  * put 请求
  * params --- 请求的url上加参数 比如?action=123
  * data --- 请求体 body 内的数据
  * */
  public put: requestFn = (url, params, data) => {
    return this.commonRequest('put', url, params, data);
  }

  // patch
  public patch: requestFn = (url, params, data) => {
    return this.commonRequest('patch', url, params, data);
  }

  // delete
  public delete: requestFn = (url, params, data) => {
    return this.commonRequest('delete', url, params, data);
  }
}

export default new Http();
