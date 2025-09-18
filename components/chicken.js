// Chicken component
AFRAME.registerComponent("chicken", {
init: function () {
    const el = this.el;

    // Body
    const body = document.createElement("a-sphere");
    body.setAttribute("radius", "0.3");
    body.setAttribute("color", "yellow");
    body.setAttribute("position", "0 0.3 0");
    el.appendChild(body);

    // Head
    const head = document.createElement("a-sphere");
    head.setAttribute("radius", "0.15");
    head.setAttribute("color", "yellow");
    head.setAttribute("position", "0 0.55 0.15");
    el.appendChild(head);

    // Beak
    const beak = document.createElement("a-cone");
    beak.setAttribute("radius-bottom", "0.05");
    beak.setAttribute("radius-top", "0");
    beak.setAttribute("height", "0.1");
    beak.setAttribute("color", "orange");
    beak.setAttribute("rotation", "90 0 0");
    beak.setAttribute("position", "0 0.55 0.3");
    el.appendChild(beak);

    // Sound (replace with working cluck URL)
    el.setAttribute(
        "sound",
        "src: url(../chicken-soundscape-200111.mp3); autoplay: true; loop: true; volume: 2;"
    );

    // Pecking animation
    el.setAttribute("animation__peck", {
        property: "rotation",
        to: "20 0 0",
        dir: "alternate",
        dur: 500,
        loop: true
    });
}
});
