import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MenuDel,MenuQuery, MenuVO, MenuForm } from './types';

/**
 * 获取路由列表
 */
export function listRoutes() {
  return request({
    url: '/api/authAdmin/menus/routes',
    method: 'get'
  });
}

/**
 * 获取全部菜单
 *
 * @param queryParams
 */
export function listMenus(queryParams: MenuQuery): AxiosPromise<MenuVO[]> {
  return request({
    url: '/api/authAdmin/menus/menuOperate',
    method: 'get',
    params: queryParams
  });
}

/**
 * 获取目录和菜单select
 */
export function dirMenuS(): AxiosPromise<OptionType[]> {
  return request({
    url: '/api/authAdmin/menus/dirMenuS',
    method: 'get'
  });
}

/**
 * 角色分配权限时获取下拉菜单
 */
export function listMenuOptions(): AxiosPromise<OptionType[]> {
  return request({
    url: '/api/authAdmin/menus/menuSelect',
    method: 'get'
  });
}

/**
 * 添加菜单
 *
 * @param data
 */
export function addMenu(data: MenuForm) {
  return request({
    url: '/api/authAdmin/menus/menuOperate',
    method: 'post',
    data: data
  });
}

/**
 * 修改菜单
 *
 * @param id
 * @param data
 */
export function updateMenu(data: MenuForm) {
  return request({
    url: '/api/authAdmin/menus/menuOperate',
    method: 'put',
    data: data
  });
}

/**
 * 删除菜单
 *
 * @param id 菜单ID
 */
export function deleteMenu(id: MenuDel) {
  return request({
    url: '/api/authAdmin/menus/menuOperate',
    method: 'delete',
    data: id,
  });
}
