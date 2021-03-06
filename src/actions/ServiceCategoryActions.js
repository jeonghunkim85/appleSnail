/** 서비스 카테고리 관리 actions */

import { HttpHelper, Logger } from 'helpers';
import { createAction } from 'redux-actions';
import uuid from 'uuid';
import {addMessage} from './ToastActions';

const serviceUrl = '/api/serviceCategory'


export const SERVICE_CATEGORY = {
  LIST         : "SERVICE_CATEGORY.LIST_REQUEST",
  LIST_SUCCESS : "SERVICE_CATEGORY.LIST_SUCCESS",
  LIST_FAILURE : "SERVICE_CATEGORY.LIST_FAILURE",

  ADD          : "SERVICE_CATEGORY.ADD",
  EDIT         : "SERVICE_CATEGORY.EDIT",
  CANCEL       : "SERVICE_CATEGORY.CANCEL",

  POST         : "SERVICE_CATEGORY.POST_REQUEST",
  POST_SUCCESS : "SERVICE_CATEGORY.POST_SUCCESS",
  POST_FAILURE : "SERVICE_CATEGORY.POST_FAILURE",

  PUT          : "SERVICE_CATEGORY.PUT_REQUEST",
  PUT_SUCCESS  : "SERVICE_CATEGORY.PUT_SUCCESS",
  PUT_FAILURE  : "SERVICE_CATEGORY.PUT_FAILURE",

  DEL          : "SERVICE_CATEGORY.DEL_REQUEST",
  DEL_SUCCESS  : "SERVICE_CATEGORY.DEL_SUCCESS",
  DEL_FAILURE  : "SERVICE_CATEGORY.DEL_FAILURE"
}

//request list
export const reqList = () => (dispatch) => {
  dispatch(createAction(SERVICE_CATEGORY.LIST)());
  return HttpHelper.get(serviceUrl)
    .then(response => {
      if(response.data){
        const data = response.data.map(item => {
          return {
            ...item,
            uuid: uuid()
          }
        })
        dispatch(createAction(SERVICE_CATEGORY.LIST_SUCCESS)(data));
      }
    })
    .catch(err => {
      dispatch(createAction(SERVICE_CATEGORY.LIST_FAILURE)());
      Logger.error('error:', err);
    })
}

//add new ServiceCategory
export const add = () => {
  return {
    type: SERVICE_CATEGORY.ADD,
    payload: {
      uuid: uuid(),
      isEditting: true,
      serviceCategoryNo: null,
      serviceCategoryName: '',
      categoryDescription: '',
    }
  }
}
export const edit = createAction(SERVICE_CATEGORY.EDIT);
export const cancel = createAction(SERVICE_CATEGORY.CANCEL);

export const reqPost = (serviceCategory) => dispatch => {
  dispatch(createAction(SERVICE_CATEGORY.POST)(serviceCategory));
  return HttpHelper.post(serviceUrl, serviceCategory)
    .then(response => {
      const data = response.data;
      data.uuid = serviceCategory.uuid;
      dispatch(createAction(SERVICE_CATEGORY.POST_SUCCESS)(data));
      dispatch(addMessage('등록 성공'));
    })
    .catch(err => {
      dispatch(createAction(SERVICE_CATEGORY.POST_FAILURE)());
      Logger.error('error:', err);
    })
}

//put request
export const reqPut = (serviceCategory) => dispatch => {
  dispatch(createAction(SERVICE_CATEGORY.PUT)(serviceCategory));
  return HttpHelper.put(`${serviceUrl}/${serviceCategory.serviceCategoryNo}`, serviceCategory)
    .then(response => {
      Logger.debug('reqPut', response.data);
      if(response.data.success){
        dispatch(createAction(SERVICE_CATEGORY.PUT_SUCCESS)(serviceCategory));
        dispatch(addMessage('수정 성공'));
      }else{
        dispatch(createAction(SERVICE_CATEGORY.PUT_FAILURE)());
      }
    })
    .catch(err => {
      dispatch(createAction(SERVICE_CATEGORY.PUT_FAILURE)());
      Logger.error('error:', err);
    })
}

export const reqDel = (serviceCategory) => dispatch => {
  dispatch(createAction(SERVICE_CATEGORY.DEL)(serviceCategory));
  return HttpHelper.delete(`${serviceUrl}/${serviceCategory.serviceCategoryNo}`)
    .then(response => {
      if(response.data.success){
        dispatch(createAction(SERVICE_CATEGORY.DEL_SUCCESS)(serviceCategory.uuid));
        dispatch(addMessage('삭제 성공'));
      }else{
        dispatch(createAction(SERVICE_CATEGORY.DEL_FAILURE)());
      }
    })
    .catch(err => {
      dispatch(createAction(SERVICE_CATEGORY.DEL_FAILURE)());
      console.log(err);
      // Logger.error('error:', err);
    })
}