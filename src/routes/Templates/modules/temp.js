/**
 *
 * draw_lottery AddCommodity.js build on Windows
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-01-09 14:27:26
 * @version
 * @link <a>https://userwu.github.io/</a>
 *
 */
const LOAD_DATA = 'LOAD_DATA';
const LOAD_TYPES = 'LOAD_TYPES';

const loadData = (data) =>({
  type:LOAD_DATA,
  data:data,
})

const loadTypes = (data) => ({
  type:LOAD_TYPES,
  data:data,
})

