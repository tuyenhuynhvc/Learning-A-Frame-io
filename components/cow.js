AFRAME.registerComponent("cow", {
    schema: {
        size: { type: "number", default: 1 },
        color: { type: "color", default: "#FFFFFF" },
        spotColor: { type: "color", default: "#000000" }
    },
    init: function () {
        const el = this.el;
        const d = this.data;
        const s = d.size;

        // Body
        const body = document.createElement("a-sphere");
        body.setAttribute("radius", s * 0.6);
        body.setAttribute("scale", "1.5 1 1");
        body.setAttribute("color", d.color);
        body.setAttribute("position", "0 0.9 0");
        el.appendChild(body);

        // Head
        const head = document.createElement("a-sphere");
        head.setAttribute("radius", s * 0.3);
        head.setAttribute("color", d.color);
        head.setAttribute("position", `${s * 0.9} 0.9 0`);
        el.appendChild(head);

        // Legs
        const legOffsets = [
            [-0.4, 0, -0.3],
            [0.4, 0, -0.3],
            [-0.4, 0, 0.3],
            [0.4, 0, 0.3]
        ];
        legOffsets.forEach(([x, y, z]) => {
            const leg = document.createElement("a-cylinder");
            leg.setAttribute("radius", s * 0.1);
            leg.setAttribute("height", s * 0.9);
            leg.setAttribute("color", d.color);
            leg.setAttribute("position", `${x * s} ${s * 0.45} ${z * s}`);
            leg.setAttribute("animation", {
                property: "rotation",
                to: "0 0 30",
                dir: "alternate",
                dur: 500,
                loop: true
            });
            el.appendChild(leg);
        });

        // Horns
        const hornOffsets = [[0.2, 0.15], [0.2, -0.15]];
        hornOffsets.forEach(([x, z]) => {
            const horn = document.createElement("a-cone");
            horn.setAttribute("radius-bottom", s * 0.08);
            horn.setAttribute("radius-top", 0.01);
            horn.setAttribute("height", s * 0.25);
            horn.setAttribute("color", "#EEE8AA");
            horn.setAttribute("position", `${s * 1.2} 1.2 ${z}`);
            horn.setAttribute("rotation", "0 0 -90");
            el.appendChild(horn);
        });

        // Ears
        const earOffsets = [[0.8, 0.25], [0.8, -0.25]];
        earOffsets.forEach(([x, z]) => {
            const ear = document.createElement("a-sphere");
            ear.setAttribute("radius", s * 0.15);
            ear.setAttribute("color", d.color);
            ear.setAttribute("position", `${x} 1 ${z}`);
            el.appendChild(ear);
        });

        // Tail
        const tail = document.createElement("a-cylinder");
        tail.setAttribute("radius", s * 0.05);
        tail.setAttribute("height", s * 0.7);
        tail.setAttribute("color", d.color);
        tail.setAttribute("position", `${-s * 0.9} 1.1 0`);
        tail.setAttribute("rotation", "0 0 20");
        el.appendChild(tail);

        const tailTip = document.createElement("a-sphere");
        tailTip.setAttribute("radius", s * 0.1);
        tailTip.setAttribute("color", d.spotColor);
        tailTip.setAttribute("position", `${-s * 0.9} 0.75 0.15`);
        el.appendChild(tailTip);

        // Spots
        const spots = [
            [0.2, 1.1, 0.4],
            [-0.3, 0.9, -0.4],
            [0.4, 1, -0.1]
        ];
        spots.forEach(([x, y, z]) => {
            const spot = document.createElement("a-circle");
            spot.setAttribute("radius", s * 0.2);
            spot.setAttribute("color", d.spotColor);
            spot.setAttribute("position", `${x} ${y} ${z}`);
            spot.setAttribute("rotation", "90 0 0");
            el.appendChild(spot);
        });

        // Sound (replace with working cluck URL)
        el.setAttribute(
            "sound",
            "src: url(cows-on-pasture_animal-sound-149489.mp3); autoplay: true; loop: true; volume: 2;"
        );
    }
});