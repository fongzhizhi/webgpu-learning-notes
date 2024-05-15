@vertex
fn vs(
    @builtin(vertex_index) vertextIndex: u32
) -> @builtin(position) vec4f {
    // triangle vertex points
    let pos = array(
        vec2f(0.0, 0.5),    // top center
        vec2f(-0.5, -0.5),  // bottom left
        vec2f(0.5, -0.5),   // bottom right
    );
    return vec4f(pos[vertextIndex], 0.0, 1.0);
}

@fragment
fn fs() -> @location(0) vec4f {
    // fragment color
    return vec4f(1.0, 0.0, 0.0, 1.0);
}