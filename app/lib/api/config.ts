/**
 * 后台 API 地址。
 */
export const autoAnimationUrl: string = (() => {
  return ensureEnvValue(import.meta.env.AUTO_ANIMATION_SERVER_API_BASE_URL)
})()

/**
 * 保证环境变量值有效。
 * @param value 环境变量值。
 */
function ensureEnvValue(value?: string) {
  if (value) {
    return value
  }
  throw new Error("无法读取到全局变量！")
}
