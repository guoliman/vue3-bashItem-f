import { RouteRecordRaw, useRouter } from "vue-router";
import { defineStore } from "pinia";
import { constantRoutes } from "@/router";
import { store } from "@/store";
import { listRoutes } from "@/api/menu";

const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

/**
 * Use meta.role to determine if the current user has permission
 *
 * @param roles 用户角色集合
 * @param route 路由
 * @returns
 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    // 角色【超级管理员】拥有所有权限，忽略校验
    if (roles.includes("ROOT")) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role);
      }
    });
  }
  return false;
};

/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的异步(动态)路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的异步(动态)路由
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const tmpRoute = { ...route }; // ES6扩展运算符复制新对象
    if (!route.name) {
      tmpRoute.name = route.path;
    }
    // 判断用户(角色)是否有该路由的访问权限
    if (hasPermission(roles, tmpRoute)) {
      // console.log("tmpRoute====",tmpRoute)
      if (tmpRoute.component?.toString() == "Layout") {  // 这是目录
        tmpRoute.component = Layout;
      } else {                                          // 这是菜单 和 外链
        const component = modules[`../../views/${tmpRoute.component}.vue`];
        if (component) {
          // console.log("component=存在==",tmpRoute["component"],"\n当前层级信息: ",tmpRoute["meta"],"\n路由路径: ",tmpRoute["path"] )
          tmpRoute.component = component;
        } else {
          // console.log("======路由不存在=======", "\ncomponent: ", tmpRoute["component"], "\n当前层级信息: ", tmpRoute["meta"], "\n路由路径: ", tmpRoute["path"])
          tmpRoute.component = modules[`../../views/error-page/404.vue`];
        }
      }

      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles);
      }

      asyncRoutes.push(tmpRoute);
    }
  });

  return asyncRoutes;
};

// setup
export const usePermissionStore = defineStore("permission", () => {
  // state
  const routes = ref<RouteRecordRaw[]>([]);

  // actions
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes);  // 静态路由里新增路由
  }
  /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      // 接口获取所有路由
      listRoutes()
        .then(({ data: asyncRoutes }) => {
          // 根据角色获取有访问权限的路由   // 遍历路由 判断是否存在 不存在转404页面
          const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
          setRoutes(accessedRoutes);  // 设置路由
          resolve(accessedRoutes);    // 返回正确数据
        })
        .catch((error) => {
          reject(error);  // 返回错误信息
        });
    });
  }

  /**
   * 混合模式左侧菜单
   */
  const mixLeftMenu = ref<RouteRecordRaw[]>([]);
  function getMixLeftMenu(activeTop: string) {
    routes.value.forEach((item) => {
      if (item.path === activeTop) {
        mixLeftMenu.value = item.children || [];
      }
    });
  }
  return { routes, setRoutes, generateRoutes, getMixLeftMenu, mixLeftMenu };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
