import React, { useRef, useEffect } from "react";
import Zdog from "zdog";
import { TimelineMax, Power1, Power2 } from "gsap/all";

export default function BurgerBoxer(props) {
    const svgRef = useRef();
    const animate = () => {
        const svg = svgRef.current;

        const COLORS = {
            arm: "#181818",
            bun: "#FAAB3E",
            cheese: "#FFDA01",
            eye: "#181818",
            glove: props.gloveColor,
            patty: "#892C0E",
            seed: "#FAD6A2",
            tomato: "#E81802",
        };

        const DIAMETER = 200;
        const LENGTH = 24;
        const STROKE = LENGTH / 2;
        const HALFSTROKE = STROKE / 2;
        const TAU = Zdog.TAU;
        const ZOOM = 3;

        let sceneWidth = DIAMETER;
        let sceneHeight = DIAMETER;
        let viewWidth = sceneWidth * ZOOM;
        let viewHeight = sceneHeight * ZOOM;
        let svgWidth = svg.getAttribute("width");
        let svgHeight = svg.getAttribute("height");

        svg.setAttribute(
            "viewBox",
            `${-viewWidth / 2}  ${-viewHeight / 2} ` + `${viewWidth} ${viewHeight}`
        );

        let animObj = {
            browRotateZ: -0.1,
            browTranslateY: STROKE,
            burgerRotateX: 0,
            burgerRotateZ: 0,
            burgerTranslateX: 0,
            burgerTranslateZ: 0,
            leftArmRotateX: 3.75,
            leftArmTranslateY: 0,
            leftForeArmRotateX: 1.5,
            rightArmRotateX: -3,
            rightArmTranslateY: 0,
            rightForeArmRotateX: 1.5,
        };

        let scene = new Zdog.Anchor({
            rotate: {
                x: 1.5,
                z: -0.5,
            },
        });

        // ----- burger ----- //

        let burger = new Zdog.Anchor({
            addTo: scene,
        });

        let patty = new Zdog.Cylinder({
            addTo: burger,
            color: COLORS.patty,
            diameter: DIAMETER + HALFSTROKE,
            fill: true,
            length: LENGTH,
            stroke: STROKE,
        });

        let cheese = new Zdog.Rect({
            addTo: patty,
            color: COLORS.cheese,
            fill: true,
            height: DIAMETER - STROKE,
            stroke: STROKE,
            width: DIAMETER - STROKE,
            rotate: { z: TAU / 3 },
            translate: { z: LENGTH },
        });

        let tomato = new Zdog.Cylinder({
            addTo: cheese,
            color: COLORS.tomato,
            diameter: DIAMETER - HALFSTROKE,
            fill: true,
            length: LENGTH / 2,
            stroke: false,
            translate: { z: STROKE },
        });

        let bun = new Zdog.Hemisphere({
            addTo: burger,
            color: COLORS.bun,
            diameter: DIAMETER,
            stroke: STROKE,
            translate: { z: STROKE * 4 },
        });

        let bottom = new Zdog.Cylinder({
            addTo: burger,
            color: COLORS.bun,
            diameter: bun.diameter,
            length: LENGTH,
            stroke: bun.stroke,
            translate: { z: -LENGTH + -STROKE },
        });

        // ----- bun seeds ----- //

        let seedAnchor = new Zdog.Anchor({
            addTo: bun,
        });

        let seed = new Zdog.Shape({
            addTo: seedAnchor,
            color: COLORS.seed,
            stroke: 8,
            path: [{ x: -HALFSTROKE }, { x: HALFSTROKE }],
            translate: { z: (bun.diameter + bun.stroke) / 2 + 1 },
        });

        seedAnchor.copyGraph({
            rotate: { x: 0.6, y: 0.35, z: 1 },
        });
        seedAnchor.copyGraph({
            rotate: { x: -0.6, y: 0.35, z: -1 },
        });
        seedAnchor.copyGraph({
            rotate: { x: 0.6, y: -0.35, z: -1 },
        });
        seedAnchor.copyGraph({
            rotate: { x: -0.6, y: -0.35, z: 1 },
        });
        seedAnchor.copyGraph({
            rotate: { y: -0.75 },
        });
        seedAnchor.copyGraph({
            rotate: { y: 0.75 },
        });

        // ----- face ----- //

        let faceAnchor = new Zdog.Anchor({
            addTo: bun,
            rotate: { x: TAU / 4 },
            translate: {
                y: bun.diameter / 2,
                z: bun.diameter / 6,
            },
        });

        let eye = new Zdog.Ellipse({
            addTo: faceAnchor,
            closed: true,
            color: COLORS.eye,
            diameter: STROKE,
            fill: true,
            stroke: HALFSTROKE,
            rotate: { z: TAU / -4 },
            translate: { x: STROKE * -3 },
        });

        eye.copy({
            translate: { x: STROKE * 3 },
        });

        let brow = new Zdog.Shape({
            addTo: faceAnchor,
            color: COLORS.patty,
            stroke: STROKE,
            path: [{ x: -STROKE }, { x: STROKE }],
            rotate: { z: -animObj.browRotateZ },
            translate: {
                x: STROKE * -3,
                y: animObj.browTranslateY,
            },
        });

        brow.copy({
            rotate: { z: animObj.browRotateZ * -1 },
            translate: {
                x: STROKE * 3,
                y: animObj.browTranslateY,
            },
        });

        // ----- arms ----- //

        let leftArm = new Zdog.Anchor({
            addTo: burger,
            rotate: {
                x: animObj.leftArmRotateX,
                y: 0.6,
            },
            translate: { x: DIAMETER / -2 - STROKE - HALFSTROKE },
        });

        let arm = new Zdog.Shape({
            addTo: leftArm,
            color: COLORS.arm,
            stroke: STROKE * 2,
            path: [{ z: 0 }, { z: DIAMETER / 4 }],
        });

        let foreArm = new Zdog.Shape({
            addTo: arm,
            color: COLORS.arm,
            stroke: STROKE * 2,
            path: [{ z: 0 }, { z: DIAMETER / 4 }],
            rotate: {
                x: animObj.leftForeArmRotateX,
                y: -0.6,
                z: 0.2,
            },
            translate: { z: DIAMETER / 4 + 1 },
        });

        let glove = new Zdog.Shape({
            addTo: foreArm,
            color: COLORS.glove,
            fill: true,
            stroke: DIAMETER / 3,
            rotate: { z: 0 },
            translate: { z: DIAMETER / 4 + STROKE * 2 },
        });

        let rightArm = leftArm.copyGraph({
            rotate: {
                x: animObj.rightArmRotateX,
                y: -0.4,
                z: -1,
            },
            translate: { x: DIAMETER / 2 + STROKE + HALFSTROKE },
        });

        // ----- movements ----- //

        let tl = new TimelineMax({ repeat: -1, onUpdate: animate });

        let defaultStance = {
            burgerTranslateZ: 10,
            burgerRotateX: -0.15,
            leftArmRotateX: 4,
            rightArmRotateX: -2.5,
            ease: Power1.easeInOut,
            repeat: 3,
            yoyo: true,
        };

        if (props.opposite) {
            tl.to(animObj, 0.5, defaultStance)
        }
        tl.to(animObj, 0.5, defaultStance)
            .to(animObj, 0.15, {
                burgerRotateX: 0.25,
                burgerRotateZ: -1,
                leftArmRotateX: 5,
                leftArmTranslateY: 20,
                rightArmRotateX: -4,
                leftForeArmRotateX: 0,
                ease: Power2.easeInOut,
                repeat: 1,
                yoyo: true,
            })
            .to(animObj, 0.5, defaultStance)
            .to(animObj, 0.15, {
                burgerRotateX: -0.5,
                burgerRotateZ: -1,
                leftArmRotateX: 5,
                leftArmTranslateY: 20,
                rightArmRotateX: -4,
                leftForeArmRotateX: 0,
                ease: Power2.easeInOut,
                repeat: 3,
                yoyo: true,
            })
            .to(animObj, 0.15, {
                burgerRotateX: 0.25,
                burgerRotateZ: 1,
                leftArmRotateX: 4,
                leftArmTranslateY: 0,
                rightArmRotateX: -2,
                rightForeArmRotateX: 0,
                ease: Power2.easeInOut,
                repeat: 1,
                yoyo: true,
            })
            .to(animObj, 0.5, defaultStance)
            .to(animObj, 0.15, {
                burgerRotateX: -0.25,
                burgerRotateZ: -1,
                leftArmRotateX: 5,
                leftArmTranslateY: 20,
                rightArmRotateX: -4,
                leftForeArmRotateX: 0,
                ease: Power1.easeInOut,
                repeat: 1,
                yoyo: true,
            })
            .to(animObj, 0.15, {
                burgerRotateX: 0.5,
                burgerRotateZ: 1,
                leftArmRotateX: 4,
                leftArmTranslateY: 0,
                leftForeArmRotateX: 0,
                rightArmRotateX: 0,
                rightArmTranslateY: 40,
                ease: Power1.easeOut,
                repeat: 1,
                repeatDelay: 1,
                yoyo: true,
            })
            .to(animObj, 0.5, defaultStance)
            .to(animObj, 0.2, {
                browRotateZ: -0.2,
                browTranslateY: 20,
                burgerTranslateZ: -5,
                burgerRotateX: -0.05,
                leftArmRotateX: 4,
                rightArmRotateX: -2.5,
                ease: Power1.easeInOut,
                repeat: 1,
                repeatDelay: 0.75,
                yoyo: true,
            });

        function applyAnimationValues() {
            brow.translate.y = animObj.browTranslateY;
            brow.rotate.z = animObj.browRotateZ;
            burger.translate.x = animObj.burgerTranslateX;
            burger.translate.z = animObj.burgerTranslateZ;
            burger.rotate.x = animObj.burgerRotateX;
            burger.rotate.z = animObj.burgerRotateZ;
            leftArm.rotate.x = animObj.leftArmRotateX;
            leftArm.translate.y = animObj.leftArmTranslateY;
            leftArm.children[0].children[0].rotate.x = animObj.leftForeArmRotateX;
            rightArm.rotate.x = animObj.rightArmRotateX;
            rightArm.translate.y = animObj.rightArmTranslateY;
            rightArm.children[0].children[0].rotate.x = animObj.rightForeArmRotateX;
        }

        // ----- animate ----- //

        function animate() {
            applyAnimationValues();
            scene.updateGraph();
            render();
        }

        function render() {
            empty(svg);
            scene.renderGraphSvg(svg);
        }

        animate();

        function empty(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }

        // ----- drag ----- //

        // click drag to rotate
        let dragStartRX, dragStartRY;
        let minSize = Math.min(svgWidth, svgHeight);

        // add drag-rotatation with Dragger
        new Zdog.Dragger({
            startElement: svg,
            onDragStart: function () {
                // isSpinning = false;
                dragStartRX = scene.rotate.x;
                dragStartRY = scene.rotate.y;
            },
            onDragMove: function (pointer, moveX, moveY) {
                scene.rotate.x = dragStartRX - (moveY / minSize) * TAU;
                scene.rotate.y = dragStartRY - (moveX / minSize) * TAU;
            },
        });
    };
    useEffect(() => {
        if (svgRef.current) {
            animate();
        }
    }, [svgRef]);
    
return <svg ref={svgRef} id="burger" width="150" height="150" style={{margin: "-30px -30px -50px -30px", cursor: "move", transform: props.opposite? "rotateY(180deg)" : "rotateY(0deg)"}}></svg>;
};