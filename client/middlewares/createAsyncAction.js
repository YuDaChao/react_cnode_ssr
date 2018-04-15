/**
 * action中间件
 * @param name action type
 * @param callback 请求接口函数
 * @param meta
 */
function createAsyncAction(name, callback, meta = {}) {
  if (typeof callback !== 'function') {
    throw new Error('[createAsyncAction] callback should be a function')
  }
  return dispatch => {
    dispatch({
      meta,
      type: `${name}_REQUEST`
    });
    try {
      return callback()
        .then(res => {
          const action = {
            meta,
            type: `${name}_SUCCESS`,
            payload: res
          };
          dispatch(action);
          return action
        })
        .catch(err => {
          const action = {
            meta,
            type: `${name}_ERROR`,
            error: true,
            payload: err
          };
          dispatch(action);
          return action
        })
    } catch (err) {
      const action = {
        meta,
        type: `${name}_ERROR`,
        error: true,
        payload: err
      };
      dispatch(action);
      return Promise.resolve(action)
    }
  }
}

export default createAsyncAction
