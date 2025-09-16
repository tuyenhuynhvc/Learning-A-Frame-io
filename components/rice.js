// Rice component
AFRAME.registerComponent("rice", {
    schema: {
        height: { type: "number", default: 1 },
        color: { type: "color", default: "#228B22" }
    },
    init: function () {
        const el = this.el;
        const d = this.data;

        // Stem
        const stem = document.createElement("a-cylinder");
        stem.setAttribute("radius", 0.05);
        stem.setAttribute("height", d.height);
        stem.setAttribute("color", d.color);
        stem.setAttribute("position", `0 ${d.height / 2} 0`);
        el.appendChild(stem);

        // Leaves
        const makeLeaf = (x, y, z, rot) => {
        const leaf = document.createElement("a-cone");
        leaf.setAttribute("radius-bottom", 0.1);
        leaf.setAttribute("radius-top", 0.01);
        leaf.setAttribute("height", 0.5);
        leaf.setAttribute("color", d.color);
        leaf.setAttribute("position", `${x} ${y} ${z}`);
        leaf.setAttribute("rotation", rot);
        el.appendChild(leaf);
        };

        makeLeaf(0.1, d.height * 0.6, 0, "0 0 45");
        makeLeaf(-0.1, d.height * 0.4, 0, "0 0 -45");
    }
});