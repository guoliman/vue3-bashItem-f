// 系统设置
interface DefaultSettings {
  /**
   * 系统title
   */
  title: string;

  /**
   * 是否显示设置
   */
  showSettings: boolean;
  /**
   * 是否显示多标签导航
   */
  tagsView: boolean;
  /**
   *是否固定头部
   */
  fixedHeader: boolean;
  /**
   * 是否显示侧边栏Logo
   */
  sidebarLogo: boolean;
  /**
   * 导航栏布局
   */
  layout: string;
  /**
   * 主题模式
   */
  theme: string;

  /**
   * 布局大小
   */
  size: string;

  /**
   * 语言
   */
  language: string;
}

const defaultSettings: DefaultSettings = {
  title: "vue3-bashItem-f",
  showSettings: true,
  tagsView: true,     // 标签导航
  fixedHeader: false, // 固定 Header
  sidebarLogo: true,  // 侧边栏 Logo
  layout: "left",
  /**
   *  主题模式
   *
   * dark:暗黑模式
   * light: 明亮模式
   */
  theme: "dark",
  size: "default", // default |large |small
  language: "zh-cn", // zh-cn| en
};

export default defaultSettings;
