/**
 * 公共路由数组
 * 这些路由不需要认证即可访问
 * @type {string[]}
 */

export const publicRoutes: string[] = [];

/**
 * 受保护的路由数组
 * 这些路由需要认证才能访问
 * @type {string[]}
 */

export const protectedRoutes: string[] = ["/"];

/**
 * 公共认证相关路由数组
 * 以此前缀（/api/auth）开头的路由不需要认证
 * @type {string[]}
 */

export const authRoutes: string[] = [
  "/auth/sign-in", // 添加了前导斜杠
];

/**
 * 公共认证相关路由前缀
 * 以此（/api/auth）前缀开头的路由不需要认证
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/"; // 登录后重定向到首页
