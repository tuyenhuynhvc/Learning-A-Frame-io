AFRAME.registerComponent("barn", {
    schema: {
        width: { type: "number", default: 4 },
        depth: { type: "number", default: 6 },
        height: { type: "number", default: 3 },
        color: { type: "color", default: "#B22222" },
        roofColor: { type: "color", default: "#8B0000" }
    },
    init: function () {
        const el = this.el;
        const d = this.data;

        // Base
        const base = document.createElement("a-box");
        base.setAttribute("width", d.width);
        base.setAttribute("depth", d.depth);
        base.setAttribute("height", d.height);
        base.setAttribute("color", d.color);
        el.appendChild(base);

        // Roof
        const roof = document.createElement("a-cone");
        roof.setAttribute("radius-bottom", Math.max(d.width, d.depth) / 1.2);
        roof.setAttribute("radius-top", 0.01);
        roof.setAttribute("height", d.height);
        roof.setAttribute("color", d.roofColor);
        roof.setAttribute("position", `0 ${d.height / 2 + d.height / 2} 0`);
        el.appendChild(roof);
    }
});