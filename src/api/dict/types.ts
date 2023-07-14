/**
 * 字典类型查询参数
 */
export interface DictTypeQuery extends PageQuery {
  /**
   * 查询条件 名称字段
   */
  name?: string;
   /**
   * 排序 id desc  或 id asc
   */
   order?: string;
}

/**
 * 字典类型分页对象
 */
export interface DictTypePageVO {
  /**
   * 字典类型ID
   */
  id: number;
  /**
   * 类型编码
   */
  code: string;
  /**
   * 类型名称
   */
  name: string;
  /**
   * 状态(1:启用;0:禁用)
   */
  status?: number;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 字典分页项类型声明  2个都是接口  DictTypePageVO[]是PageResult的参数 例{list:[{id:1,name:aa,...},{...}],total:2}
 */
export type DictTypePageResult = PageResult<DictTypePageVO[]>;

/**
 * 字典表单类型声明
 */
export interface DictTypeForm {
  /**
   * 字典类型ID
   */
  id?: number;
  /**
   * 类型名称
   */
  name?: string;
  /**
   * 类型编码
   */
  code?: string;
  /**
   * 类型状态：1:启用;0:禁用
   */
  status: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   *  创建时间
   */
  create_time?: string;
  /**
   *  更新时间
   */
  update_time?: string;
}

/**
 * 字典查询参数
 */
export interface DictQuery extends PageQuery {
  /**
   * 字典项名称
   */
  name?: string;
  /**
   * 字典类型编码
   */
  type_code?: string;
  /**
   * 排序 id desc  或 id asc
   */
  order?: string;
}

/**
 * 字典分页对象
 */
export interface DictPageVO {
  /**
   * 字典ID
   */
  id?: number;
  /**
   * 字典名称
   */
  name?: string;
  /**
   * 状态(1:启用;0:禁用)
   */
  status?: number;
  /**
   * 字典值
   */
  value?: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 字典分页
 */
export type DictPageResult = PageResult<DictPageVO[]>;

/**
 * 字典表单
 */
export interface DictForm {
  /**
   * 字典ID
   */
  id?: number;
  /**
   * 字典名称
   */
  name?: string;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 状态(1:启用;0:禁用)
   */
  status?: number;
  /**
   * 类型编码
   */
  type_code?: string;
  /**
   * 值
   */
  value?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 更新时间
   */
  update_time?: string;
}


/**
 * 字典类型删除字段
 */
export interface DelId {
  /**
   * 字典类型ID  例 1  1,2,3
   */
  id?: string;

}