<template>
    <div ref="container"
         class="relative w-full overflow-hidden rounded-3xl border bg-stone-100"
         style="height: 420px;">
        <!-- Premium -->
        <div class="absolute inset-0">
            <slot name="premium" />
        </div>

        <!-- Standard -->
        <div class="absolute inset-0 bg-white"
             :style="{ clipPath: `inset(0 ${100 - slider}% 0 0)` }">
            <slot name="standard" />
        </div>

        <!-- Divider -->
        <div class="absolute inset-y-0 z-10"
             :style="{ left: slider + '%' }">
            <div class="relative h-full">
                <div class="absolute inset-y-0 left-1/2 w-px bg-white"></div>

                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <button @mousedown="startDrag"
                            @touchstart.prevent="startTouch"
                            class="h-12 w-12 rounded-full bg-white shadow-lg">
                        ↔
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'

    const slider = ref(50)
    const dragging = ref(false)
    const container = ref<HTMLElement | null>(null)

    function update(clientX: number) {
    if (!container.value) return
    const rect = container.value.getBoundingClientRect()
    const percent = ((clientX - rect.left) / rect.width) * 100
    slider.value = Math.max(0, Math.min(100, percent))
    }

    function startDrag() {
    dragging.value = true
    }

    function stopDrag() {
    dragging.value = false
    }

    function onMouseMove(e: MouseEvent) {
    if (!dragging.value) return
    update(e.clientX)
    }

    function startTouch(e: TouchEvent) {
    dragging.value = true
    update(e.touches[0].clientX)
    }

    function onTouchMove(e: TouchEvent) {
    if (!dragging.value) return
    update(e.touches[0].clientX)
    }

    onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', stopDrag)
    })

    onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', stopDrag)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', stopDrag)
    })
</script>