// Fence component
AFRAME.registerComponent("fence", {
    schema: {
        length: { type: "number", default: 10 },
        count: { type: "int", default: 10 },
        color: { type: "color", default: "#A0522D" }
    },
    init: function () {
        const el = this.el;
        const d = this.data;
        const spacing = d.length / (d.count - 1);

        for (let i = 0; i < d.count; i++) {
        const post = document.createElement("a-box");
        post.setAttribute("width", 0.1);
        post.setAttribute("depth", 0.1);
        post.setAttribute("height", 1);
        post.setAttribute("color", d.color);
        post.setAttribute("position", `${-d.length / 2 + i * spacing} 0.5 0`);
        el.appendChild(post);
        }
    }
});