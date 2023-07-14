import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { DeptDel,DeptForm, DeptQuery, DeptVO } from './types';

/**
 * 部门树形表格
 *
 * @param queryParams
 */
export function listDepts(queryParams?: DeptQuery): AxiosPromise<DeptVO[]> {
  return request({
    url: '/api/authAdmin/dept/deptTree',
    method: 'get',
    params: queryParams
  });
}

/**
 * 部门下拉列表
 */
export function listDeptOptions(): AxiosPromise<[]> {
  return request({
    url: '/api/authAdmin/dept/deptOptions',
    method: 'get'
  });
}

/**
 * 获取部门详情
 *
 * @param id
 */
export function getDeptForm(id: number): AxiosPromise<DeptForm> {
  return request({
    url: '/api/authAdmin/dept/' + id + '/form',
    method: 'get'
  });
}

/**
 * 新增部门
 *
 * @param data
 */
export function addDept(data: DeptForm) {
  return request({
    url: '/api/authAdmin/dept/deptTree',
    method: 'post',
    data: data
  });
}

/**
 *  修改部门
 *
 * @param id
 * @param data
 */
export function updateDept(data: DeptForm) {
  return request({
    url: '/api/authAdmin/dept/deptTree',
    method: 'put',
    data: data
  });
}

/**
 * 删除部门
 *
 * @param ids
 */
export function deleteDept(ids: DeptDel) {
  return request({
    url: '/api/authAdmin/dept/deptTree',
    method: 'delete',
    data: ids
  });
}
