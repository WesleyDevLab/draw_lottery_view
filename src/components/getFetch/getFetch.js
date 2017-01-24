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
import {STATIC_SERVE_PATH} from '../../constants';
const urlFront = STATIC_SERVE_PATH + '/';
import {message} from 'antd';

const f = (url, func, options) => {
  if (func == null || typeof func != 'function') {
    func = (data) => {
      message.success(data)
    }
  }
  //响应异常处理
  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      if (response == null || response == '') {
        message.error("没有获取到任何信息哟");
        return {};
      }
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
    message.error('error');
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
    .then(opts.parseJSON)
    .then(data => {
      if (typeof data.success != 'undefined' && !data.success)
        message.error(data.message);
      else
        func(data);

    }).catch(opts.carchError);
}

export default f;
