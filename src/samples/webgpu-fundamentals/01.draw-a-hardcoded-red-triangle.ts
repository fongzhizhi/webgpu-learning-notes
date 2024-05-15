import hardcodedRedTriangleShaderCode from './wgsl/hardcoded-red-triangle.wgsl?raw'

/**
 * 硬编码绘制红色三角形
 */
export async function drawAHardCodedRedTriangle() {
    // [webgpu env init]
    const webgpu = navigator.gpu;
    if(!webgpu) {
        throw new Error('WebGPU not supported.');
    }
    const adapter = await webgpu.requestAdapter();
    if(!adapter) {
        throw new Error('Could not request WebGPU adapter in this browser.');
    }
    const device = await adapter.requestDevice();
    const canvasSelector = '#my-canvas';
    const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
    if(!canvas) {
        throw new Error('Canvas was not found: ' + canvasSelector);
    }
    const context = canvas.getContext('webgpu');
    const preferedCanvasFormat = webgpu.getPreferredCanvasFormat();
    context.configure({
        device,
        format: preferedCanvasFormat,
    });

    // [create shader module] for render pipleline
    const shaderModuel = device.createShaderModule({
        label: 'hardcoded red triangle shaders',
        code: hardcodedRedTriangleShaderCode,
    });
    // [reander pipeline]
    const pipeline = device.createRenderPipeline({
        label: 'hardcoded red triangle pipeline',
        layout: 'auto',
        vertex: {
            entryPoint: 'vs',
            module: shaderModuel,
        },
        fragment: {
            entryPoint: 'fs',
            module: shaderModuel,
            targets: [{
                format: preferedCanvasFormat,
            }]
        }
    });

    // [render pass descripter] for render pass
    const reanderPassDescripter: GPURenderPassDescriptor = {
        label: 'basic canvas renderPass',
        colorAttachments: [{
            view: null, // to be filled out when render
            clearValue: [0.3, 0.3, 0.3, 1],
            loadOp: 'clear',
            storeOp: 'store',
        }]
    };

    // [render view]
    const textureView = context.getCurrentTexture().createView();
    reanderPassDescripter.colorAttachments[0].view = textureView;
    
    // [render pass] for render buffer
    const encoder = device.createCommandEncoder({
        label: 'command encoder',
    });
    const renderPass = encoder.beginRenderPass(reanderPassDescripter);
    renderPass.setPipeline(pipeline);
    renderPass.draw(3);
    renderPass.end();

    // [draw command submit]
    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);
}