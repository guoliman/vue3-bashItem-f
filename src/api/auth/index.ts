import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CaptchaResult, LoginData, LoginResult } from './types';

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: '/api/authAdmin/users/login',
    method: 'post',
    data: data
  });
}

/**
 * 注销API
 */
export function logoutApi(name:string) {
  return request({
    url: '/api/authAdmin/users/logout',
    method: 'delete',
    data: {username:name}
  });
}



/**
 * 获取验证码
 */
export function getCaptchaApi(): AxiosPromise<CaptchaResult> {
  return request({
    url: '/api/authAdmin/users/captcha',
    method: 'get'
  });
}
