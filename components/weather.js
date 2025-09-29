AFRAME.registerComponent("weather", {
    schema: {
        type: { type: "string", default: "sunny" }, // sunny, rainy, cloudy, windy, storm
        intensity: { type: "number", default: 1 },
        windSpeed: { type: "number", default: 1 }
    },
    init: function () {
        const el = this.el;
        const d = this.data;
        
        this.rainDrops = [];
        this.clouds = [];
        this.windDirection = 1;
        this.manualControl = false;
        this.weatherInterval = null;
        
        this.createWeatherSystem();
        this.startWeatherAnimation();
    },
    
    createWeatherSystem: function() {
        const el = this.el;
        const d = this.data;
        
        // Create rain system
        if (d.type === "rainy") {
            this.createRain();
        }
        
        // Create clouds
        if (d.type === "cloudy" || d.type === "rainy") {
            this.createClouds();
        }
        
        // Create wind effects
        if (d.type === "windy") {
            this.createWindEffects();
        }
        
        // Create storm effects
        if (d.type === "storm") {
            this.createStormEffects();
        }
        
        // Create sunshine effects
        if (d.type === "sunny") {
            this.createSunshineEffects();
        }
        
        // Update sky color based on weather
        this.updateSkyColor();
    },
    
    createRain: function() {
        const el = this.el;
        const d = this.data;
        
        // Create rain container
        const rainContainer = document.createElement("a-entity");
        rainContainer.setAttribute("id", "rain-container");
        el.appendChild(rainContainer);
        
        // Create multiple rain drops with different sizes and speeds
        for (let i = 0; i < 500; i++) {
            const rainDrop = document.createElement("a-cylinder");
            const size = 0.001 + Math.random() * 0.003;
            const height = 0.2 + Math.random() * 0.4;
            const speed = 1500 + Math.random() * 2000;
            const startX = (Math.random() - 0.5) * 60;
            const startZ = (Math.random() - 0.5) * 60;
            const endX = startX + (Math.random() - 0.5) * 10;
            const endZ = startZ + (Math.random() - 0.5) * 10;
            
            rainDrop.setAttribute("radius", size);
            rainDrop.setAttribute("height", height);
            rainDrop.setAttribute("color", "#87CEEB");
            rainDrop.setAttribute("opacity", 0.4 + Math.random() * 0.4);
            rainDrop.setAttribute("position", {
                x: startX,
                y: Math.random() * 25 + 15,
                z: startZ
            });
            rainDrop.setAttribute("rotation", "0 0 15");
            
            // Add falling animation with wind effect
            rainDrop.setAttribute("animation", {
                property: "position",
                to: `${endX} -8 ${endZ}`,
                dur: speed,
                loop: true,
                easing: "linear"
            });
            
            rainContainer.appendChild(rainDrop);
            this.rainDrops.push(rainDrop);
        }
        
        // Create rain splash effects on ground
        this.createRainSplashes();
        
        // Create rain puddles
        this.createRainPuddles();
        
        // Add rain sound
        el.setAttribute("sound", {
            src: "url(assets/rain-sound.mp3)",
            autoplay: true,
            loop: true,
            volume: 0.4
        });
        
        // Add rain impact on animals
        this.addRainImpactOnAnimals();
    },
    
    createRainSplashes: function() {
        const el = this.el;
        const splashContainer = document.createElement("a-entity");
        splashContainer.setAttribute("id", "rain-splash-container");
        el.appendChild(splashContainer);
        
        // Create splash effects
        for (let i = 0; i < 100; i++) {
            const splash = document.createElement("a-sphere");
            splash.setAttribute("radius", 0.05 + Math.random() * 0.1);
            splash.setAttribute("color", "#87CEEB");
            splash.setAttribute("opacity", 0.3);
            splash.setAttribute("position", {
                x: (Math.random() - 0.5) * 40,
                y: 0.05,
                z: (Math.random() - 0.5) * 40
            });
            
            // Add splash animation
            splash.setAttribute("animation", {
                property: "scale",
                to: "0 0 0",
                dur: 500 + Math.random() * 500,
                loop: true,
                easing: "easeOutQuad"
            });
            
            splashContainer.appendChild(splash);
        }
    },
    
    createRainPuddles: function() {
        const el = this.el;
        const puddleContainer = document.createElement("a-entity");
        puddleContainer.setAttribute("id", "rain-puddle-container");
        el.appendChild(puddleContainer);
        
        // Create puddles on ground
        for (let i = 0; i < 20; i++) {
            const puddle = document.createElement("a-circle");
            puddle.setAttribute("radius", 0.5 + Math.random() * 1.5);
            puddle.setAttribute("color", "#4682B4");
            puddle.setAttribute("opacity", 0.3);
            puddle.setAttribute("position", {
                x: (Math.random() - 0.5) * 30,
                y: 0.01,
                z: (Math.random() - 0.5) * 30
            });
            puddle.setAttribute("rotation", "-90 0 0");
            
            // Add ripple animation
            puddle.setAttribute("animation", {
                property: "scale",
                to: "1.2 1.2 1.2",
                dir: "alternate",
                dur: 2000 + Math.random() * 1000,
                loop: true,
                easing: "easeInOutSine"
            });
            
            puddleContainer.appendChild(puddle);
        }
    },
    
    addRainImpactOnAnimals: function() {
        const el = this.el;
        
        // Add rain impact on cow
        const cow = el.querySelector('#cow');
        if (cow) {
            cow.setAttribute("animation__rain", {
                property: "position",
                to: "0 0.05 0",
                dir: "alternate",
                dur: 1000,
                loop: true,
                easing: "easeInOutSine"
            });
        }
        
        // Add rain impact on chicken
        const chicken = el.querySelector('#chicken');
        if (chicken) {
            chicken.setAttribute("animation__rain", {
                property: "position",
                to: "0 0.02 0",
                dir: "alternate",
                dur: 800,
                loop: true,
                easing: "easeInOutSine"
            });
        }
        
        // Add rain impact on rice
        const riceElements = el.querySelectorAll('[rice]');
        riceElements.forEach(rice => {
            rice.setAttribute("animation__rain", {
                property: "rotation",
                to: "0 0 5",
                dir: "alternate",
                dur: 1200,
                loop: true,
                easing: "easeInOutSine"
            });
        });
    },
    
    createSunshineEffects: function() {
        const el = this.el;
        const d = this.data;
        
        // Create sun in sky
        this.createSun();
        
        // Create dynamic shadows
        this.createDynamicShadows();
        
        // Create sunshine particles
        this.createSunshineParticles();
        
        // Add sunshine sound effects
        this.addSunshineSounds();
        
        // Add sunshine animations to animals
        this.addSunshineAnimations();
    },
    
    createSun: function() {
        const el = this.el;
        const sunContainer = document.createElement("a-entity");
        sunContainer.setAttribute("id", "sun-container");
        el.appendChild(sunContainer);
        
        // Main sun - bright afternoon sun
        const sun = document.createElement("a-sphere");
        sun.setAttribute("radius", 2.5);
        sun.setAttribute("color", "#FF8C00"); // Orange sun like afternoon
        sun.setAttribute("position", "0 12 20");
        sun.setAttribute("emissive", "#FF8C00");
        sunContainer.appendChild(sun);
        
        // Sun glow effect - warm afternoon glow
        const sunGlow = document.createElement("a-sphere");
        sunGlow.setAttribute("radius", 4);
        sunGlow.setAttribute("color", "#FFA500");
        sunGlow.setAttribute("opacity", 0.4);
        sunGlow.setAttribute("position", "0 12 20");
        sunGlow.setAttribute("animation", {
            property: "scale",
            to: "1.3 1.3 1.3",
            dir: "alternate",
            dur: 4000,
            loop: true,
            easing: "easeInOutSine"
        });
        sunContainer.appendChild(sunGlow);
        
        // Outer glow - warm atmosphere
        const outerGlow = document.createElement("a-sphere");
        outerGlow.setAttribute("radius", 6);
        outerGlow.setAttribute("color", "#FFD700");
        outerGlow.setAttribute("opacity", 0.2);
        outerGlow.setAttribute("position", "0 12 20");
        outerGlow.setAttribute("animation", {
            property: "scale",
            to: "1.1 1.1 1.1",
            dir: "alternate",
            dur: 6000,
            loop: true,
            easing: "easeInOutSine"
        });
        sunContainer.appendChild(outerGlow);
        
        // Sun rays - warm afternoon rays
        for (let i = 0; i < 12; i++) {
            const ray = document.createElement("a-box");
            ray.setAttribute("width", 0.15);
            ray.setAttribute("height", 4);
            ray.setAttribute("depth", 0.15);
            ray.setAttribute("color", "#FF8C00");
            ray.setAttribute("opacity", 0.5);
            ray.setAttribute("position", {
                x: Math.cos(i * Math.PI / 6) * 3.5,
                y: 12,
                z: 20 + Math.sin(i * Math.PI / 6) * 3.5
            });
            ray.setAttribute("rotation", {
                x: 0,
                y: i * 30,
                z: 0
            });
            ray.setAttribute("animation", {
                property: "opacity",
                to: "0.2",
                dir: "alternate",
                dur: 3000 + i * 200,
                loop: true,
                easing: "easeInOutSine"
            });
            sunContainer.appendChild(ray);
        }
    },
    
    createDynamicShadows: function() {
        const el = this.el;
        const shadowContainer = document.createElement("a-entity");
        shadowContainer.setAttribute("id", "sunshine-shadow-container");
        el.appendChild(shadowContainer);
        
        // Create shadows for objects
        const objects = el.querySelectorAll('#cow, #chicken, [barn], [mill]');
        objects.forEach((obj, index) => {
            const shadow = document.createElement("a-circle");
            shadow.setAttribute("radius", 1 + Math.random() * 2);
            shadow.setAttribute("color", "#000000");
            shadow.setAttribute("opacity", 0.2 + Math.random() * 0.3);
            shadow.setAttribute("position", {
                x: obj.getAttribute("position").x + (Math.random() - 0.5) * 2,
                y: 0.01,
                z: obj.getAttribute("position").z + (Math.random() - 0.5) * 2
            });
            shadow.setAttribute("rotation", "-90 0 0");
            
            // Add shadow animation
            shadow.setAttribute("animation", {
                property: "opacity",
                to: "0.1",
                dir: "alternate",
                dur: 3000 + Math.random() * 2000,
                loop: true,
                easing: "easeInOutSine"
            });
            
            shadowContainer.appendChild(shadow);
        });
    },
    
    
    createSunshineParticles: function() {
        const el = this.el;
        const particleContainer = document.createElement("a-entity");
        particleContainer.setAttribute("id", "sunshine-particle-container");
        el.appendChild(particleContainer);
        
        // Create floating sunshine particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("a-sphere");
            particle.setAttribute("radius", 0.02 + Math.random() * 0.03);
            particle.setAttribute("color", "#FFD700");
            particle.setAttribute("opacity", 0.4 + Math.random() * 0.4);
            particle.setAttribute("position", {
                x: (Math.random() - 0.5) * 60,
                y: 1 + Math.random() * 8,
                z: (Math.random() - 0.5) * 60
            });
            
            // Add particle animation
            particle.setAttribute("animation", {
                property: "position",
                to: `${(Math.random() - 0.5) * 60} ${1 + Math.random() * 8} ${(Math.random() - 0.5) * 60}`,
                dur: 5000 + Math.random() * 5000,
                loop: true,
                easing: "easeInOutSine"
            });
            
            particleContainer.appendChild(particle);
        }
    },
    
    createSunlightRays: function() {
        const el = this.el;
        const raysContainer = document.createElement("a-entity");
        raysContainer.setAttribute("id", "sunlight-rays-container");
        el.appendChild(raysContainer);
        
        // Create multiple light rays
        for (let i = 0; i < 15; i++) {
            const ray = document.createElement("a-cylinder");
            ray.setAttribute("radius", 0.05 + Math.random() * 0.1);
            ray.setAttribute("height", 8 + Math.random() * 4);
            ray.setAttribute("color", "#FFD700");
            ray.setAttribute("opacity", 0.2 + Math.random() * 0.3);
            ray.setAttribute("position", {
                x: (Math.random() - 0.5) * 30,
                y: 4 + Math.random() * 2,
                z: (Math.random() - 0.5) * 30
            });
            ray.setAttribute("rotation", {
                x: 15 + Math.random() * 10,
                y: Math.random() * 360,
                z: 0
            });
            
            // Add floating animation
            ray.setAttribute("animation", {
                property: "opacity",
                to: "0.1",
                dir: "alternate",
                dur: 3000 + Math.random() * 2000,
                loop: true,
                easing: "easeInOutSine"
            });
            
            raysContainer.appendChild(ray);
        }
    },
    
    createHeatShimmer: function() {
        const el = this.el;
        const shimmerContainer = document.createElement("a-entity");
        shimmerContainer.setAttribute("id", "heat-shimmer-container");
        el.appendChild(shimmerContainer);
        
        // Create heat shimmer effects
        for (let i = 0; i < 20; i++) {
            const shimmer = document.createElement("a-sphere");
            shimmer.setAttribute("radius", 0.1 + Math.random() * 0.2);
            shimmer.setAttribute("color", "#FFD700");
            shimmer.setAttribute("opacity", 0.1 + Math.random() * 0.2);
            shimmer.setAttribute("position", {
                x: (Math.random() - 0.5) * 40,
                y: 0.5 + Math.random() * 2,
                z: (Math.random() - 0.5) * 40
            });
            
            // Add shimmer animation
            shimmer.setAttribute("animation", {
                property: "position",
                to: `${(Math.random() - 0.5) * 40} ${0.5 + Math.random() * 2} ${(Math.random() - 0.5) * 40}`,
                dur: 4000 + Math.random() * 3000,
                loop: true,
                easing: "easeInOutSine"
            });
            
            shimmerContainer.appendChild(shimmer);
        }
    },
    
    addSunshineSounds: function() {
        const el = this.el;
        
        // Add ambient sunshine sound (birds, wind, etc.)
        el.setAttribute("sound", {
            src: "url(assets/sunshine-ambient.mp3)",
            autoplay: true,
            loop: true,
            volume: 0.3
        });
    },
    
    addSunshineAnimations: function() {
        const el = this.el;
        
        // Add sunshine animations to cow
        const cow = el.querySelector('#cow');
        if (cow) {
            cow.setAttribute("animation__sunshine", {
                property: "rotation",
                to: "0 3 0",
                dir: "alternate",
                dur: 6000,
                loop: true,
                easing: "easeInOutSine"
            });
        }
        
        // Add sunshine animations to chicken
        const chicken = el.querySelector('#chicken');
        if (chicken) {
            chicken.setAttribute("animation__sunshine", {
                property: "position",
                to: "0 0.05 0",
                dir: "alternate",
                dur: 4000,
                loop: true,
                easing: "easeInOutSine"
            });
        }
        
        // Add sunshine animations to rice
        const riceElements = el.querySelectorAll('[rice]');
        riceElements.forEach(rice => {
            rice.setAttribute("animation__sunshine", {
                property: "rotation",
                to: "0 0 2",
                dir: "alternate",
                dur: 7000,
                loop: true,
                easing: "easeInOutSine"
            });
        });
    },
    
    createClouds: function() {
        const el = this.el;
        const d = this.data;
        
        // Create cloud container
        const cloudContainer = document.createElement("a-entity");
        cloudContainer.setAttribute("id", "cloud-container");
        el.appendChild(cloudContainer);
        
        // Create multiple clouds
        for (let i = 0; i < 8; i++) {
            const cloud = document.createElement("a-entity");
            cloud.setAttribute("id", `cloud-${i}`);
            
            // Main cloud body
            const cloudBody = document.createElement("a-sphere");
            cloudBody.setAttribute("radius", 2 + Math.random() * 2);
            cloudBody.setAttribute("color", "#FFFFFF");
            cloudBody.setAttribute("opacity", 0.8);
            cloudBody.setAttribute("position", "0 0 0");
            cloud.appendChild(cloudBody);
            
            // Cloud parts for more realistic shape
            for (let j = 0; j < 3; j++) {
                const cloudPart = document.createElement("a-sphere");
                cloudPart.setAttribute("radius", 1 + Math.random() * 1.5);
                cloudPart.setAttribute("color", "#FFFFFF");
                cloudPart.setAttribute("opacity", 0.7);
                cloudPart.setAttribute("position", {
                    x: (Math.random() - 0.5) * 3,
                    y: (Math.random() - 0.5) * 1,
                    z: (Math.random() - 0.5) * 3
                });
                cloud.appendChild(cloudPart);
            }
            
            // Position cloud
            cloud.setAttribute("position", {
                x: (Math.random() - 0.5) * 60,
                y: 8 + Math.random() * 4,
                z: (Math.random() - 0.5) * 60
            });
            
            // Add floating animation
            cloud.setAttribute("animation", {
                property: "position",
                to: `${(Math.random() - 0.5) * 60} ${8 + Math.random() * 4} ${(Math.random() - 0.5) * 60}`,
                dur: 30000 + Math.random() * 20000,
                loop: true,
                easing: "easeInOutQuad"
            });
            
            cloudContainer.appendChild(cloud);
            this.clouds.push(cloud);
        }
    },
    
    createWindEffects: function() {
        const el = this.el;
        const d = this.data;
        
        // Create wind direction and speed
        this.windDirection = Math.random() * 360; // Random wind direction
        this.windSpeed = 5 + Math.random() * 15; // Wind speed 5-20 km/h
        this.temperature = 20 + Math.random() * 15; // Temperature 20-35°C
        
        // Create clouds that move with wind
        this.createWindyClouds();
        
        // Create light wind particles
        this.createLightWindParticles();
        
        // Add gentle wind effects to objects
        this.addLightWindEffects();
        
        // Add wind sound
        this.addWindSounds();
        
        // Add gentle wind animations
        this.addLightWindAnimations();
        
        // Add wind info display
        this.addWindInfoDisplay();
    },
    
    createStormEffects: function() {
        const el = this.el;
        const d = this.data;
        
        // Create dark storm clouds
        this.createStormClouds();
        
        // Create lightning effects
        this.createLightning();
        
        // Create strong wind particles
        this.createWindParticles();
        
        // Add storm wind effects to objects
        this.addStormWindEffects();
        
        // Add storm sound effects
        this.addStormSounds();
        
        // Add storm animations
        this.addStormAnimations();
    },
    
    createStormClouds: function() {
        const el = this.el;
        const stormCloudContainer = document.createElement("a-entity");
        stormCloudContainer.setAttribute("id", "storm-cloud-container");
        el.appendChild(stormCloudContainer);
        
        // Create multiple dark storm clouds
        for (let i = 0; i < 12; i++) {
            const cloud = document.createElement("a-entity");
            cloud.setAttribute("id", `storm-cloud-${i}`);
            
            // Main cloud body - dark and ominous
            const cloudBody = document.createElement("a-sphere");
            cloudBody.setAttribute("radius", 3 + Math.random() * 3);
            cloudBody.setAttribute("color", "#2F2F2F");
            cloudBody.setAttribute("opacity", 0.8);
            cloudBody.setAttribute("position", "0 0 0");
            cloud.appendChild(cloudBody);
            
            // Cloud parts for more realistic storm shape
            for (let j = 0; j < 5; j++) {
                const cloudPart = document.createElement("a-sphere");
                cloudPart.setAttribute("radius", 1.5 + Math.random() * 2);
                cloudPart.setAttribute("color", "#1C1C1C");
                cloudPart.setAttribute("opacity", 0.7);
                cloudPart.setAttribute("position", {
                    x: (Math.random() - 0.5) * 4,
                    y: (Math.random() - 0.5) * 2,
                    z: (Math.random() - 0.5) * 4
                });
                cloud.appendChild(cloudPart);
            }
            
            // Position cloud
            cloud.setAttribute("position", {
                x: (Math.random() - 0.5) * 80,
                y: 6 + Math.random() * 3,
                z: (Math.random() - 0.5) * 80
            });
            
            // Add storm cloud animation - fast moving
            cloud.setAttribute("animation", {
                property: "position",
                to: `${(Math.random() - 0.5) * 80} ${6 + Math.random() * 3} ${(Math.random() - 0.5) * 80}`,
                dur: 15000 + Math.random() * 10000,
                loop: true,
                easing: "easeInOutQuad"
            });
            
            stormCloudContainer.appendChild(cloud);
        }
    },
    
    createLightning: function() {
        const el = this.el;
        const lightningContainer = document.createElement("a-entity");
        lightningContainer.setAttribute("id", "lightning-container");
        el.appendChild(lightningContainer);
        
        // Create lightning bolts
        for (let i = 0; i < 6; i++) {
            const lightning = document.createElement("a-cylinder");
            lightning.setAttribute("radius", 0.1);
            lightning.setAttribute("height", 15 + Math.random() * 10);
            lightning.setAttribute("color", "#FFFFFF");
            lightning.setAttribute("opacity", 0.8);
            lightning.setAttribute("position", {
                x: (Math.random() - 0.5) * 60,
                y: 8 + Math.random() * 5,
                z: (Math.random() - 0.5) * 60
            });
            lightning.setAttribute("rotation", {
                x: 15 + Math.random() * 20,
                y: Math.random() * 360,
                z: 0
            });
            
            // Add lightning flash animation
            lightning.setAttribute("animation", {
                property: "opacity",
                to: "0",
                dur: 100 + Math.random() * 200,
                loop: true,
                easing: "easeInOutQuad"
            });
            
            lightningContainer.appendChild(lightning);
        }
    },
    
    createWindyClouds: function() {
        const el = this.el;
        const windyCloudContainer = document.createElement("a-entity");
        windyCloudContainer.setAttribute("id", "windy-cloud-container");
        el.appendChild(windyCloudContainer);
        
        // Create clouds that move with wind direction
        for (let i = 0; i < 6; i++) {
            const cloud = document.createElement("a-entity");
            cloud.setAttribute("id", `windy-cloud-${i}`);
            
            // Main cloud body
            const cloudBody = document.createElement("a-sphere");
            cloudBody.setAttribute("radius", 1.5 + Math.random() * 2);
            cloudBody.setAttribute("color", "#FFFFFF");
            cloudBody.setAttribute("opacity", 0.7);
            cloudBody.setAttribute("position", "0 0 0");
            cloud.appendChild(cloudBody);
            
            // Cloud parts for more realistic shape
            for (let j = 0; j < 3; j++) {
                const cloudPart = document.createElement("a-sphere");
                cloudPart.setAttribute("radius", 0.8 + Math.random() * 1.2);
                cloudPart.setAttribute("color", "#FFFFFF");
                cloudPart.setAttribute("opacity", 0.6);
                cloudPart.setAttribute("position", {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 1,
                    z: (Math.random() - 0.5) * 2
                });
                cloud.appendChild(cloudPart);
            }
            
            // Position cloud
            const startX = (Math.random() - 0.5) * 100;
            const startZ = (Math.random() - 0.5) * 100;
            cloud.setAttribute("position", {
                x: startX,
                y: 8 + Math.random() * 4,
                z: startZ
            });
            
            // Calculate wind movement direction
            const windRad = (this.windDirection * Math.PI) / 180;
            const windSpeedFactor = this.windSpeed / 20; // Normalize to 0-1
            const moveDistance = 50 + windSpeedFactor * 30; // Distance based on wind speed
            const endX = startX + Math.cos(windRad) * moveDistance;
            const endZ = startZ + Math.sin(windRad) * moveDistance;
            const moveSpeed = 20000 - (windSpeedFactor * 10000); // Speed based on wind speed
            
            // Add wind-driven cloud animation
            cloud.setAttribute("animation", {
                property: "position",
                to: `${endX} ${8 + Math.random() * 4} ${endZ}`,
                dur: moveSpeed,
                loop: true,
                easing: "linear"
            });
            
            windyCloudContainer.appendChild(cloud);
        }
    },
    
    createLightWindParticles: function() {
        const el = this.el;
        const windContainer = document.createElement("a-entity");
        windContainer.setAttribute("id", "light-wind-particle-container");
        el.appendChild(windContainer);
        
        // Create light wind particles that follow wind direction
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("a-sphere");
            particle.setAttribute("radius", 0.005 + Math.random() * 0.01);
            particle.setAttribute("color", "#D3D3D3");
            particle.setAttribute("opacity", 0.2 + Math.random() * 0.3);
            
            const startX = (Math.random() - 0.5) * 40;
            const startZ = (Math.random() - 0.5) * 40;
            particle.setAttribute("position", {
                x: startX,
                y: 1 + Math.random() * 5,
                z: startZ
            });
            
            // Calculate wind movement direction
            const windRad = (this.windDirection * Math.PI) / 180;
            const windSpeedFactor = this.windSpeed / 20;
            const moveDistance = 20 + windSpeedFactor * 20;
            const endX = startX + Math.cos(windRad) * moveDistance;
            const endZ = startZ + Math.sin(windRad) * moveDistance;
            const moveSpeed = 4000 + (windSpeedFactor * 2000);
            
            // Add wind-driven particle animation
            particle.setAttribute("animation", {
                property: "position",
                to: `${endX} ${1 + Math.random() * 5} ${endZ}`,
                dur: moveSpeed,
                loop: true,
                easing: "easeInOutSine"
            });
            
            windContainer.appendChild(particle);
        }
    },
    
    createWindParticles: function() {
        const el = this.el;
        const windContainer = document.createElement("a-entity");
        windContainer.setAttribute("id", "wind-particle-container");
        el.appendChild(windContainer);
        
        // Create wind particles
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement("a-sphere");
            particle.setAttribute("radius", 0.01 + Math.random() * 0.02);
            particle.setAttribute("color", "#8B8B8B");
            particle.setAttribute("opacity", 0.3 + Math.random() * 0.4);
            particle.setAttribute("position", {
                x: (Math.random() - 0.5) * 80,
                y: 1 + Math.random() * 8,
                z: (Math.random() - 0.5) * 80
            });
            
            // Add wind particle animation
            particle.setAttribute("animation", {
                property: "position",
                to: `${(Math.random() - 0.5) * 80} ${1 + Math.random() * 8} ${(Math.random() - 0.5) * 80}`,
                dur: 2000 + Math.random() * 3000,
                loop: true,
                easing: "easeInOutSine"
            });
            
            windContainer.appendChild(particle);
        }
    },
    
    addLightWindEffects: function() {
        const el = this.el;
        const d = this.data;
        
        // Add gentle wind to existing elements based on wind direction
        const windElements = el.querySelectorAll('[cow], [chicken], [rice]');
        const windRad = (this.windDirection * Math.PI) / 180;
        const windStrength = this.windSpeed / 20; // Normalize to 0-1
        
        windElements.forEach(element => {
            // Calculate rotation based on wind direction
            const rotationZ = Math.sin(windRad) * 3 * windStrength;
            const rotationX = Math.cos(windRad) * 1 * windStrength;
            
            element.setAttribute("animation__wind", {
                property: "rotation",
                to: `${rotationX} 0 ${rotationZ}`,
                dir: "alternate",
                dur: 3000 / (windStrength + 0.1),
                loop: true,
                easing: "easeInOutSine"
            });
        });
    },
    
    addWindInfoDisplay: function() {
        const el = this.el;
        
        // Create wind info display in UI overlay
        const windInfoDiv = document.createElement("div");
        windInfoDiv.setAttribute("id", "wind-info-display");
        windInfoDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            min-width: 200px;
        `;
        
        windInfoDiv.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #00FF00;">Wind Information</h3>
            <div style="margin-bottom: 5px;">🌪️ Wind Speed: <span id="wind-speed">${this.windSpeed.toFixed(1)} km/h</span></div>
            <div style="margin-bottom: 5px;">🌡️ Temperature: <span id="wind-temp">${this.temperature.toFixed(1)}°C</span></div>
            <div style="margin-bottom: 5px;">🧭 Direction: <span id="wind-direction">${this.windDirection.toFixed(0)}°</span></div>
            <div style="margin-top: 10px; text-align: center;">
                <div style="display: inline-block; transform: rotate(${this.windDirection}deg); font-size: 20px;">➡️</div>
            </div>
        `;
        
        document.body.appendChild(windInfoDiv);
        
        // Also create 3D wind info in scene
        const windInfoContainer = document.createElement("a-entity");
        windInfoContainer.setAttribute("id", "wind-info-container");
        windInfoContainer.setAttribute("position", "0 2 -8");
        el.appendChild(windInfoContainer);
        
        // Wind speed display
        const windSpeedText = document.createElement("a-text");
        windSpeedText.setAttribute("value", `Wind: ${this.windSpeed.toFixed(1)} km/h`);
        windSpeedText.setAttribute("position", "0 1 0");
        windSpeedText.setAttribute("color", "#00FF00");
        windSpeedText.setAttribute("align", "center");
        windSpeedText.setAttribute("width", "6");
        windSpeedText.setAttribute("height", "1");
        windInfoContainer.appendChild(windSpeedText);
        
        // Temperature display
        const tempText = document.createElement("a-text");
        tempText.setAttribute("value", `Temp: ${this.temperature.toFixed(1)}°C`);
        tempText.setAttribute("position", "0 0.5 0");
        tempText.setAttribute("color", "#FF6600");
        tempText.setAttribute("align", "center");
        tempText.setAttribute("width", "6");
        tempText.setAttribute("height", "1");
        windInfoContainer.appendChild(tempText);
        
        // Wind direction display
        const directionText = document.createElement("a-text");
        directionText.setAttribute("value", `Dir: ${this.windDirection.toFixed(0)}°`);
        directionText.setAttribute("position", "0 0 0");
        directionText.setAttribute("color", "#0066FF");
        directionText.setAttribute("align", "center");
        directionText.setAttribute("width", "6");
        directionText.setAttribute("height", "1");
        windInfoContainer.appendChild(directionText);
        
        // Wind direction arrow
        const windArrow = document.createElement("a-cone");
        windArrow.setAttribute("radius-bottom", 0.3);
        windArrow.setAttribute("radius-top", 0.1);
        windArrow.setAttribute("height", 0.8);
        windArrow.setAttribute("color", "#FF0000");
        windArrow.setAttribute("position", "0 -0.5 0");
        windArrow.setAttribute("rotation", `0 ${this.windDirection} 0`);
        windInfoContainer.appendChild(windArrow);
    },
    
    addStormWindEffects: function() {
        const el = this.el;
        const d = this.data;
        
        // Add strong wind to existing elements
        const windElements = el.querySelectorAll('[cow], [chicken], [rice], [barn], [mill]');
        
        windElements.forEach(element => {
            element.setAttribute("animation__storm", {
                property: "rotation",
                to: `0 0 ${15 * d.windSpeed}`,
                dir: "alternate",
                dur: 1000 / d.windSpeed,
                loop: true,
                easing: "easeInOutSine"
            });
        });
    },
    
    addWindSounds: function() {
        const el = this.el;
        
        // Add gentle wind sound
        el.setAttribute("sound", {
            src: "url(assets/wind-sound.mp3)",
            autoplay: true,
            loop: true,
            volume: 0.2
        });
    },
    
    addStormSounds: function() {
        const el = this.el;
        
        // Add storm sound
        el.setAttribute("sound", {
            src: "url(assets/storm-sound.mp3)",
            autoplay: true,
            loop: true,
            volume: 0.6
        });
    },
    
    addLightWindAnimations: function() {
        const el = this.el;
        
        // Add gentle wind animations to cow
        const cow = el.querySelector('#cow');
        if (cow) {
            cow.setAttribute("animation__wind", {
                property: "position",
                to: "0 0.02 0",
                dir: "alternate",
                dur: 2000,
                loop: true,
                easing: "easeInOutSine"
            });
        }
        
        // Add gentle wind animations to chicken
        const chicken = el.querySelector('#chicken');
        if (chicken) {
            chicken.setAttribute("animation__wind", {
                property: "position",
                to: "0 0.01 0",
                dir: "alternate",
                dur: 1500,
                loop: true,
                easing: "easeInOutSine"
            });
        }
        
        // Add gentle wind animations to rice
        const riceElements = el.querySelectorAll('[rice]');
        riceElements.forEach(rice => {
            rice.setAttribute("animation__wind", {
                property: "rotation",
                to: "0 0 2",
                dir: "alternate",
                dur: 3000,
                loop: true,
                easing: "easeInOutSine"
            });
        });
    },
    
    addStormAnimations: function() {
        const el = this.el;
        
        // Add storm animations to cow
        const cow = el.querySelector('#cow');
        if (cow) {
            cow.setAttribute("animation__storm", {
                property: "position",
                to: "0 0.1 0",
                dir: "alternate",
                dur: 500,
                loop: true,
                easing: "easeInOutSine"
            });
        }
        
        // Add storm animations to chicken
        const chicken = el.querySelector('#chicken');
        if (chicken) {
            chicken.setAttribute("animation__storm", {
                property: "position",
                to: "0 0.05 0",
                dir: "alternate",
                dur: 400,
                loop: true,
                easing: "easeInOutSine"
            });
        }
        
        // Add storm animations to rice
        const riceElements = el.querySelectorAll('[rice]');
        riceElements.forEach(rice => {
            rice.setAttribute("animation__storm", {
                property: "rotation",
                to: "0 0 10",
                dir: "alternate",
                dur: 600,
                loop: true,
                easing: "easeInOutSine"
            });
        });
    },
    
    updateSkyColor: function() {
        const el = this.el;
        const d = this.data;
        
        const sky = el.querySelector("a-sky");
        if (sky) {
            switch(d.type) {
                case "sunny":
                    sky.setAttribute("color", "#FFB347"); // Warm orange sky like afternoon
                    break;
                case "cloudy":
                    sky.setAttribute("color", "#B0C4DE");
                    break;
                case "rainy":
                    sky.setAttribute("color", "#708090");
                    break;
                case "windy":
                    sky.setAttribute("color", "#B0C4DE"); // Light gray sky for gentle wind
                    break;
                case "storm":
                    sky.setAttribute("color", "#2F2F2F"); // Dark storm sky
                    break;
            }
        }
    },
    
    startWeatherAnimation: function() {
        const el = this.el;
        const d = this.data;
        
        // Only start auto weather if not manually controlled
        if (!this.manualControl) {
            this.weatherInterval = setInterval(() => {
                this.changeWeather();
            }, 30000);
        }
    },
    
    changeWeather: function() {
        const weatherTypes = ["sunny", "cloudy", "rainy", "windy"];
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        
        // Remove existing weather effects
        this.clearWeatherEffects();
        
        // Update weather type
        this.el.setAttribute("weather", "type", randomWeather);
        
        // Create new weather effects
        this.createWeatherSystem();
        
        console.log(`Weather changed to: ${randomWeather}`);
    },
    
    clearWeatherEffects: function() {
        // Remove rain
        const rainContainer = this.el.querySelector("#rain-container");
        if (rainContainer) {
            rainContainer.remove();
        }
        
        // Remove rain splashes
        const splashContainer = this.el.querySelector("#rain-splash-container");
        if (splashContainer) {
            splashContainer.remove();
        }
        
        // Remove rain puddles
        const puddleContainer = this.el.querySelector("#rain-puddle-container");
        if (puddleContainer) {
            puddleContainer.remove();
        }
        
        // Remove clouds
        const cloudContainer = this.el.querySelector("#cloud-container");
        if (cloudContainer) {
            cloudContainer.remove();
        }
        
        // Remove sun
        const sunContainer = this.el.querySelector("#sun-container");
        if (sunContainer) {
            sunContainer.remove();
        }
        
        // Remove sunshine shadows
        const shadowContainer = this.el.querySelector("#sunshine-shadow-container");
        if (shadowContainer) {
            shadowContainer.remove();
        }
        
        // Remove sunshine particles
        const particleContainer = this.el.querySelector("#sunshine-particle-container");
        if (particleContainer) {
            particleContainer.remove();
        }
        
        // Remove wind animations
        const windElements = this.el.querySelectorAll('[animation__wind]');
        windElements.forEach(element => {
            element.removeAttribute("animation__wind");
        });
        
        // Remove storm clouds
        const stormCloudContainer = this.el.querySelector("#storm-cloud-container");
        if (stormCloudContainer) {
            stormCloudContainer.remove();
        }
        
        // Remove lightning
        const lightningContainer = this.el.querySelector("#lightning-container");
        if (lightningContainer) {
            lightningContainer.remove();
        }
        
        // Remove windy clouds
        const windyCloudContainer = this.el.querySelector("#windy-cloud-container");
        if (windyCloudContainer) {
            windyCloudContainer.remove();
        }
        
        // Remove wind info display
        const windInfoContainer = this.el.querySelector("#wind-info-container");
        if (windInfoContainer) {
            windInfoContainer.remove();
        }
        
        // Remove wind info UI overlay
        const windInfoDisplay = document.getElementById("wind-info-display");
        if (windInfoDisplay) {
            windInfoDisplay.remove();
        }
        
        // Remove light wind particles
        const lightWindContainer = this.el.querySelector("#light-wind-particle-container");
        if (lightWindContainer) {
            lightWindContainer.remove();
        }
        
        // Remove wind particles
        const windContainer = this.el.querySelector("#wind-particle-container");
        if (windContainer) {
            windContainer.remove();
        }
        
        // Remove storm animations
        const stormElements = this.el.querySelectorAll('[animation__storm]');
        stormElements.forEach(element => {
            element.removeAttribute("animation__storm");
        });
        
        // Remove rain impact animations
        const rainImpactElements = this.el.querySelectorAll('[animation__rain]');
        rainImpactElements.forEach(element => {
            element.removeAttribute("animation__rain");
        });
        
        // Remove sunshine animations
        const sunshineElements = this.el.querySelectorAll('[animation__sunshine]');
        sunshineElements.forEach(element => {
            element.removeAttribute("animation__sunshine");
        });
        
        // Remove sounds
        this.el.removeAttribute("sound");
        
        // Clear intervals
        if (this.weatherInterval) {
            clearInterval(this.weatherInterval);
            this.weatherInterval = null;
        }
    }
});
