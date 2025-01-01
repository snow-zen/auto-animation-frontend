import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {useDebounce} from "use-debounce";

/**
 * 合并多个 className。
 * @param inputs className 数组。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 包装 React 状态对象提供去抖动功能。
 * @param reactState React 状态对象。
 * @param delay 延迟时间，单位为毫秒。
 */
export function debounce<S>(reactState: [S, (value: ((old: S) => S) | S) => void], delay: number):
  [S, (value: ((old: S) => S) | S) => void] {
  const [state, setState] = reactState
  const [debounceState] = useDebounce(state, delay)
  return [debounceState, setState]
}