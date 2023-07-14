import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { RoleQuery, RolePageResult, RoleForm } from './types';

/**
 * 获取角色分页数据
 *
 * @param queryParams
 */
export function getRolePage(
  queryParams?: RoleQuery
): AxiosPromise<RolePageResult> {
  return request({
    url: '/api/authAdmin/roles/roleOperate',
    method: 'get',
    params: queryParams
  });
}

/**
 * 获取角色下拉数据
 *
 * @param queryParams
 */
export function listRoleOptions(
  queryParams?: RoleQuery
): AxiosPromise<OptionType[]> {
  return request({
    url: '/api/authAdmin/roles/roleOptions',
    method: 'get',
    params: queryParams
  });
}

/**
 * 获取角色的菜单ID集合
 *
 * @param queryParams
 */
export function getRoleMenuIds(roleId: number): AxiosPromise<number[]> {
  return request({
    url: '/api/authAdmin/roles/roleSonMenu',
    method: 'post',
    data: {"roleId":roleId}
  });
}

/**
 * 分配菜单权限给角色
 *
 * @param queryParams
 */
export function updateRoleMenus(
  roleId: number,
  data: number[]
): AxiosPromise<any> {
  return request({
    url: '/api/authAdmin/roles/roleSonMenu',
    method: 'put',
    data: {"roleId":roleId,"menuIds":data}
  });
}
/**
 * 添加角色
 *
 * @param data
 */
export function addRole(data: RoleForm) {
  return request({
    url: '/api/authAdmin/roles/roleOperate',
    method: 'post',
    data: data
  });
}

/**
 * 更新角色
 *
 * @param id
 * @param data
 */
export function updateRole(data: RoleForm) {
  return request({
    url: '/api/authAdmin/roles/roleOperate',
    method: 'put',
    data: data
  });
}

/**
 * 批量删除角色，多个以英文逗号(,)分割
 *
 * @param ids
 */
export function deleteRoles(ids: string) {
  return request({
    url: '/api/authAdmin/roles/roleOperate',
    method: 'delete',
    data: {id:ids}
  });
}
