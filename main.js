import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

var ANIMATION_DONE = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});
const loader = new GLTFLoader();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

loader.load(
    "monitor.gltf",
    function (gltf) {
        const monitor = gltf.scene.children[0];
        monitor.position.set(-5, 100, 25);
        // monitor.rotation.x = 0.2;
        scene.add(monitor);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const spaceTexture = new THREE.TextureLoader().load("space.jpg");
// scene.background = spaceTexture;

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
    });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(400));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(1500).fill().forEach(addStar);

var T = 0;
var mode = "tilt";
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    console.log({
        t: t,
        T: T,
        mode: mode,
        "camera.rotation.x": camera.rotation.x,
        "camera.position.y": camera.position.y,
    });
    if (t < T) {
        if (mode == "tilt") {
            camera.rotation.x += 0.02;
            if (camera.rotation.x > 1.1) {
                console.log("changed mode");
                mode = "move";
            }
        } else if (mode == "move") {
            camera.position.y += 1;
            if (camera.position.y > 95) {
                mode = "done";
            }
        } else if (mode == "done") {
            ANIMATION_DONE = true;
        }
    } else {
        if (mode == "tilt") {
            if (camera.rotation.x > 0) {
                camera.rotation.x -= 0.02;
            }
        } else if (mode == "move") {
            camera.position.y -= 1;
            if (camera.position.y <= 1) {
                console.log("changed mode");
                mode = "tilt";
            }
        }
    }
    T = t;
}

document.body.onscroll = moveCamera;

function animate() {
    if (ANIMATION_DONE) {
        console.log("animation done");
        document.getElementById("bg").remove();
        document.getElementById("space").remove();
        document.body.innerHTML += `
        <div id="content">
            <h1>Things I Want With my $1300</h1>
            <h2>Monitor 1</h2>
            <a
                class="vendor"
                href="https://www.bestbuy.com/site/samsung-27-odyssey-fhd-ips-240hz-g-sync-gaming-monitor-black-black/6507926.p?skuId=6507926&ref=212&loc=1&gclid=CjwKCAjw29ymBhAKEiwAHJbJ8l2DcyYGtnivFUIDhNDaLZgKFXviSFY0SNKKhQStPdfVeX_YqHd5txoC9MwQAvD_BwE&gclsrc=aw.ds"
                target="_blank"
                ><span>Vendor Link</span></a
            >
            <a
                class="product"
                href="https://www.samsung.com/ca/monitors/gaming/odyssey-g4-g40b-27-inch-ls27bg402enxgo/"
                target="_blank"
                ><span>Product Link</span></a
            >
            <p>|</p>
            <p>
                I want this monitor because of it's high refresh rate and low
                response time. I also like the curved screen and the fact that
                it is 27 inches, so it offers plenty of space for everything.
                This monitor also has a full HD resolution of 1920 x 1080 pixels
                that delivers sharp and crisp images. You can see every detail
                and enjoy vivid colors and contrast. The monitor also has an IPS
                panel that provides clear colors and a wide viewing angle. You
                can see consistent and accurate colors from any position,
                without any color shift or loss of quality. The monitor is even
                compatible with Nvidia G-Sync and supports FreeSync Premium,
                which are technologies that synchronize the refresh rate of the
                monitor with the frame rate of the graphics card. This reduces
                screen tearing, stuttering, and input lag, and enhances the
                gaming performance.
            </p>
            <h2>Monitor 2</h2>
            <a
                class="vendor"
                href="https://www.bestbuy.com/site/acer-nitro-27-ips-led-fhd-freesync-gaming-monitor-hdmi-2-0-display-port/6425563.p?skuId=6425563"
                target="_blank"
                ><span>Vendor Link</span></a
            >
            <a
                class="product"
                href="https://www.acer.com/us-en/monitors/gaming/nitro-xv2"
                target="_blank"
                ><span>Product Link</span></a
            >
            <p>|</p>
            <p>
                I want this monitor because it has a stunning IPS display that
                delivers vibrant and accurate colors. I also appreciate the FHD
                resolution and the FreeSync technology that eliminate screen
                tearing and stuttering. The monitor has a 75Hz refresh rate and
                a 1ms VRB response time that ensure smooth and responsive
                gaming. The monitor also has a sleek design and an ergonomic
                stand that allows me to adjust the height, tilt, and swivel for
                optimal comfort.
            </p>

            <h2>Keyboard</h2>
            <a
                class="vendor"
                href="https://www.amazon.com/SteelSeries-Apex-Mechanical-Gaming-Keyboard/dp/B0B16HXVVQ/ref=sr_1_2?crid=370VRM9O2WZDR&keywords=steelseries+apex+pro+mini&qid=1691895393&sprefix=steelseries+apex+pro+mini%2Caps%2C161&sr=8-2"
                target="_blank"
                ><span>Vendor Link</span></a
            >
            <a
                class="product"
                href="https://steelseries.com/gaming-keyboards/apex-pro-mini"
                target="_blank"
                ><span>Product Link</span></a
            >
            <p>|</p>
            <p>
                I want this keyboard because it has an innovative OmniPoint
                switch that allows me to adjust the actuation point from 0.4mm
                to 3.6mm. I also love the OLED smart display that shows me game
                info, system settings, and more. The keyboard has a durable
                aluminum frame and a magnetic wrist rest that provide stability
                and comfort. The keyboard also has a dedicated multimedia
                control and a USB passthrough port that offer convenience and
                functionality.
            </p>

            <h2>Monitor Mount</h2>
            <a
                class="vendor"
                href="https://www.amazon.com/MOUNTPRO-Triple-Monitor-Desk-Mount/dp/B07YWKQ873"
                target="_blank"
                ><span>Vendor Link</span></a
            >
            <a
                class="product"
                href="https://www.mount-it.net/products/mount-it-triple-monitor-mount-with-usb-port-height-adjustable-3-monitor-stand-for-computer-screens-up-to-32-inches-vesa-75x75-and-100x100-black-mi-2753/"
                target="_blank"
                ><span>Product Link</span></a
            >
            <p>|</p>
            <p>
                I want this monitor mount because it can hold up to three
                monitors up to 32 inches each. I also like the gas spring arms
                that allow me to adjust the height, tilt, swivel, and rotation
                of each monitor with ease. The monitor mount has a built-in USB
                port and audio ports that let me connect my devices
                conveniently. The monitor mount also has a sturdy clamp base and
                a cable management system that keep my desk neat and secure.
            </p>
            <h2>RAM Upgrade</h2>
            <a
                class="vendor"
                href="https://www.bestbuy.com/site/corsair-vengeance-pro-32gb-2pk-x-16gb-3600mhz-ddr4-c18-dimm-desktop-memory-with-rgb-lighting-black/6449223.p?skuId=6449223"
                target="_blank"
                ><span>Vendor Link</span></a
            >
            <a
                class="product"
                href="https://www.corsair.com/us/en/Categories/Products/Memory/VENGEANCE-PRO-RGB-Black/p/CMW32GX4M2D3600C18"
                target="_blank"
                ><span>Product Link</span></a
            >
            <p>|</p>
            <p>
                I want this RAM upgrade because it has a high performance and
                dynamic RGB lighting. This RAM kit has a 32GB capacity (2 x
                16GB) and a 3600MHz speed that can boost the performance of my
                PC for gaming and multitasking. It also has a low latency of
                18-22-22-42 (CL18) that ensures fast and responsive operation.
                The RAM modules have an anodized aluminum heatspreader that
                improves thermal conductivity and a custom performance PCB that
                provides the highest signal quality. The RAM kit also has a
                dynamic multi-zone RGB lighting that lights up my PC with
                mesmerizing effects and colors. I can control the lighting with
                the CORSAIR iCUE software, which also allows me to synchronize
                the lighting with other CORSAIR RGB products, such as coolers,
                keyboards, and fans. I can customize dozens of preset lighting
                profiles, experiment with a huge variety of user adjustable
                colors, and adjust LED brightness to perfectly match my system.
                The RAM kit also has a XMP 2.0 support, which means I can easily
                overclock it with a single BIOS setting. The RAM kit also has a
                limited lifetime warranty, which gives me peace of mind and
                years of worry-free performance.
            </p>
        </div>
        `;
        window.scrollTo(0, 0);
    } else {
        requestAnimationFrame(animate);
    }

    renderer.render(scene, camera);
}

animate();
