/**
 * @author liuyanhao
 * @date 2018-03-11
 * @Description:
 */
import {SUCCESS_STATUS,ERROR_STATUS,LOADING_STATUS} from "mixins/statusMixins";
import {message} from "antd";
import {httpAction} from "./common";
import qs from 'querystring'

export const CREATE_APIDOC_ACTION = 'CREATE_APIDOC_ACTION'
export const ADD_APIDOC_ACTION = 'ADD_APIDOC_ACTION'
export const FETCH_APIDOC_ACTION = 'FETCH_APIDOC_ACTION'
export const RESET_APIDOC_STATE_ACTION = 'RESET_APIDOC_STATE_ACTION'
export const DELETE_APIDOC_ACTION = 'DELETE_APIDOC_ACTION'
export const DELETE_APIDOC_BATCH_ACTION = 'DELETE_APIDOC_BATCH_ACTION'

// create apidoc
export const createApiDoc = (params,history) => (dispatch) =>{
  const httpOptions = {
    url: '/apiDocs',
    method: 'post',
    actionType: CREATE_APIDOC_ACTION,
    body: params
  }
  const actionMaps = {
    successAction: () => {
      // message.success('创建成功!')
      // const nextLocation = {
      //   pathname: '/editApiDocument',
      //   state: {
      //     apiDoc:{
      //       key: params.name
      //     }
      //   }
      // }
      //
      // history.push(nextLocation)
    },
    errorAction: () => {
      message.error('创建失败!')
    }
  }
  httpAction(httpOptions,dispatch,actionMaps)
}

// add apis
export const addApis = (params,key) => (dispatch) => {
  const httpOptions = {
    url: `/apiDocs/${key}/apis`,
    method: 'post',
    actionType: ADD_APIDOC_ACTION,
    body: params
  }
  const actionMaps = {
    successAction: () => {
      message.success('添加成功!')
    },
    errorAction: () => {
      message.error('添加失败!')
    }
  }
  httpAction(httpOptions,dispatch,actionMaps)
}

//get api doc list
export const fetchApiDocs = (params,key) => (dispatch) => {
  const httpOptions = {
    url: `/apiDocs/userGroup/${key}`,
    method: 'get',
    actionType: FETCH_APIDOC_ACTION
  }
  httpAction(httpOptions,dispatch)
}

// reset api state
export const resetApiDocState = (params) => (dispatch) => {
  dispatch({
    type:RESET_APIDOC_STATE_ACTION,
    state:LOADING_STATUS,
    data: null
  })
}

//delete api doc
export const deleteApiDoc = (params) => (dispatch) => {
  const httpOptions = {
    url: `/apiDocs/${params.key}`,
    method: 'delete',
    actionType: DELETE_APIDOC_ACTION
  }
  const actionMaps = {
    successAction: () => {
      message.success('删除成功!')
    },
    errorAction: () => {
      message.error('删除失败!')
    }
  }
  httpAction(httpOptions,dispatch,actionMaps)
}

export const deleteApiDocsBatch = (params) => (dispatch) => {
  const httpOptions = {
    url: '/apiDocs',
    method: 'delete',
    query: {
      params
    },
    actionType: DELETE_APIDOC_BATCH_ACTION
  }
  const actionMaps = {
    successAction: () => {
      message.success('删除成功!')
    },
    errorAction: () => {
      message.error('删除失败!')
    }
  }
  httpAction(httpOptions,dispatch,actionMaps)
}
