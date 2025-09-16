// Animal component
AFRAME.registerComponent("animal", {
    schema: {
        color: { type: "color", default: "#FFFFFF" },
        size: { type: "number", default: 0.5 }
    },
    init: function () {
        const el = this.el;
        const d = this.data;

        const body = document.createElement("a-sphere");
        body.setAttribute("radius", d.size);
        body.setAttribute("color", d.color);
        body.setAttribute("position", "0 0.5 0");
        el.appendChild(body);

        const legs = [-0.2, 0.2];
        legs.forEach(x => {
        legs.forEach(z => {
            const leg = document.createElement("a-cylinder");
            leg.setAttribute("radius", 0.05);
            leg.setAttribute("height", 0.5);
            leg.setAttribute("color", d.color);
            leg.setAttribute("position", `${x} 0.25 ${z}`);
            el.appendChild(leg);
        });
        });
    }
});