/**
 * WebGPU环境初始化
 * @returns
 * + WebGPU适配器(adapter)
 * + WebGPU逻辑设备(logic device)
 * + canvas
 */
export async function webGPUInit(options: Partial<{
    /**canvas选择器 */
    canvasSelector: string;
}>) {
    const gpu = navigator.gpu;
    if(!gpu) {
        throw Error("WebGPU not supported.");
    }
}