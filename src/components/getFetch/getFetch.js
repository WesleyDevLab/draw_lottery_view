/**
 * 得到包装过的fetch对象，方便操作
 * draw_lottery getFetch.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-08 18:52:36
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */
import 'whatwg-fetch';
const urlFront = 'http://127.0.0.1:8080/'

const f = (url, func, options) => {
  if (func == null) {
    console.error('操作不能为空！');
    return;
  }
  //响应异常处理
  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
  const data = {};
  const parseJSON = (response) => {
    return response.json();
  }

  const catchError = (error) => {
    console.error('request failed', error)
  }
  let defaultOptions = {
    checkStatus: checkStatus,
    parseJSON: parseJSON,
    catchError: catchError,
    data: data
  }
  let opts = Object.assign({}, defaultOptions, options);
  let headers = new Headers({
    'Content-Type': 'application/json',
    'accept': 'application/json'
  });
  let request = new Request(urlFront + url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(opts.data)
  })

  fetch(request)
    .then(opts.checkStatus)
    .then(opts.parseJSON)
    .then(func).catch(opts.carchError);
}

export default f;
