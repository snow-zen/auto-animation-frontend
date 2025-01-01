export const autoAnimationUrl: string = (() => {
  return ensureEnvValue(import.meta.env.AUTO_ANIMATION_SERVER_API_BASE_URL)
})()

function ensureEnvValue(value?: string) {
  if (value === undefined) {
    throw new Error("无法读取到全局变量！")
  }
  return value
}