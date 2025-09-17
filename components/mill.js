// Mill component
AFRAME.registerComponent("mill", {
    schema: {
        height: { type: "number", default: 3 },
        color: { type: "color", default: "#8B4513" },
        roofColor: { type: "color", default: "#A52A2A" },
        bladeColor: { type: "color", default: "#FFFFFF" }
    },
    init: function () {
        const el = this.el;
        const d = this.data;

        // Tower
        const tower = document.createElement("a-cylinder");
        tower.setAttribute("radius", 0.6);
        tower.setAttribute("height", d.height + 2.5);
        tower.setAttribute("color", d.color);
        tower.setAttribute("position", `0 ${d.height / 2} 0`);
        el.appendChild(tower);

        // Roof
        const roof = document.createElement("a-cone");
        roof.setAttribute("radius-bottom", 0.8);
        roof.setAttribute("radius-top", 0.01);
        roof.setAttribute("height", 1);
        roof.setAttribute("color", d.roofColor);
        roof.setAttribute("position", `0 ${d.height + 1.5} 0`);
        el.appendChild(roof);

        // Blades holder
        const blades = document.createElement("a-entity");
        blades.setAttribute("position", `0 ${d.height} 0.6`);
        blades.setAttribute("rotation", "0 0 0");

        // Add 4 blades
        for (let i = 0; i < 4; i++) {
            const blade = document.createElement("a-box");
            blade.setAttribute("width", 0.1);
            blade.setAttribute("height", 2);
            blade.setAttribute("depth", 0.1);
            blade.setAttribute("color", d.bladeColor);
            blade.setAttribute("rotation", `0 0 ${i * 90}`);
            blades.appendChild(blade);
        }

        // Animate rotation
        blades.setAttribute("animation", {
            property: "rotation",
            to: "0 0 360",
            loop: true,
            dur: 4000,
            easing: "linear"
        });

        el.appendChild(blades);
    }
});