export function haptic(pattern: number | number[] = 10) {
  if (typeof window === "undefined") return
  if (!("vibrate" in navigator)) return
  try {
    navigator.vibrate(pattern)
  } catch {
    // fail silently
  }
}

