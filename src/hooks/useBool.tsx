import { ref } from "vue"

export const useBool = () => {
  const bool = ref(false)
  return {
    ref: bool,
    toggle: () => bool.value = !bool.value,
    on: () => bool.value = true,
    off: () => bool.value = false
  }
}