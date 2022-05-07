import { computed, onMounted, onUnmounted, ref, Ref } from "vue"
type Point = {
  x: number;
  y: number;
}
interface Options {
  beforeStart: (event: TouchEvent) => void;
  afterStart: (event: TouchEvent) => void;
  beforeMove: (event: TouchEvent) => void;
  afterMove: (event: TouchEvent) => void;
  beforeEnd: (event: TouchEvent) => void;
  afterEnd: (event: TouchEvent) => void;
}
export const useSwipe = (element: Ref<HTMLElement | undefined>, options?: Partial<Options>) => {
  const start = ref<Point>()
  const end = ref<Point>()
  const swiping = ref(false)
  const distance = computed(() => {
    if (!start.value || !end.value) { return null }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    }
  })
  const direction = computed(() => {
    if (!distance.value) { return '' }
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })
  const onStart = (event: TouchEvent) => {
    options?.beforeStart?.(event)
    swiping.value = true
    end.value = start.value = { x: event.touches[0].screenX, y: event.touches[0].screenY }
    options?.afterStart?.(event)
  }
  const onMove = (event: TouchEvent) => {
    options?.beforeMove?.(event)
    if (!start.value) { return }
    end.value = { x: event.touches[0].screenX, y: event.touches[0].screenY, }
    options?.afterMove?.(event);
  }
  const onEnd = (event: TouchEvent) => {
    options?.beforeEnd?.(event)
    swiping.value = false
    options?.afterEnd?.(event)
  }
  onMounted(() => {
    if (element.value) {
      element.value.addEventListener('touchstart', onStart)
      element.value.addEventListener('touchmove', onMove)
      element.value.addEventListener('touchend', onEnd)
    }
  })
  onUnmounted(() => {
    if (element.value) {
      element.value.removeEventListener('touchstart', onStart)
      element.value.removeEventListener('touchmove', onMove)
      element.value.removeEventListener('touchend', onEnd)
    }
  })
  return {
    swiping,
    direction,
    distance
  }
}