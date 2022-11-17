import { Application, Loader, Texture, AnimatedSprite, Sprite } from "pixi.js";
import "./style.css";
///////////////////////////////////////////////////

const gameWidth = 600;
const gameHeight = 350;

///////////////--Creating the App
const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});
///////////////--On load event
window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    resizeCanvas();
    //--convert this to loader
    const background = Sprite.from("assets/background.png");
    background.width = app.renderer.screen.width;
    background.height = app.renderer.screen.height;
    app.stage.addChild(background);
    ///////////////
    const capGuy = getCapGuy();
    // capGuy.anchor.set(0.5, 0.5);
    capGuy.position.set(100, 210);
    capGuy.scale.set(0.5, 0.4);
    app.stage.addChild(capGuy);
    ///////////////////////////
    app.ticker.add(() => {
        capGuy.x += 1;
        if (capGuy.x > app.renderer.screen.width - 10) {
            capGuy.x = 0;
        }
    });
    /////////////////////////////
    app.stage.interactive = true;
};

////////////////--loadGameAssets
async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        // loader.add("rabbit", "./assets/simpleSpriteSheet.json");
        // loader.add("pixie", "./assets/spine-assets/pixie.json");
        ///////////////////
        loader.add("capGuy", "./assets/capGuy/capGuy.json");

        ///////////////////
        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

/////-resizeCanvas
function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}
///////////////////////////////////////////
function getCapGuy(): AnimatedSprite {
    const capGuy = new AnimatedSprite([
        Texture.from("walk_01.png"),
        Texture.from("walk_02.png"),
        Texture.from("walk_03.png"),
        Texture.from("walk_04.png"),
        Texture.from("walk_05.png"),
        Texture.from("walk_06.png"),
        Texture.from("walk_07.png"),
        Texture.from("walk_08.png"),
    ]);
    capGuy.loop = true;
    capGuy.animationSpeed = 0.11;
    capGuy.play();
    return capGuy;
}

///////////////////////////////////////////
// const capGuyContainer = new PIXI.Container();

// let anim;

// PIXI.Assets.load("../images/capGuyAnimated/capGuy.json").then(() => {
//     // create an array of textures from an image path
//     const frames = [];

//     for (let i = 0; i < 8; i++) {
//         const val = `walk_0${i + 1}.png`;
//         //i < 10 ? `0${i}` : i;

//         // magically works since the spritesheet was loaded with the pixi loader
//         frames.push(PIXI.Texture.from(val));
//     }

//     // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
//     anim = new PIXI.AnimatedSprite(frames);

//     /*
//      * An AnimatedSprite inherits all the properties of a PIXI sprite
//      * so you can change its position, its anchor, mask it, etc
//      */
//     anim.scale.x = 0.5;
//     anim.scale.y = 0.5;
//     // anim.scale(0.5,0.5);

//     anim.x = 10;
//     anim.y = 180;
//     // anim.anchor.set(0.5);
//     anim.animationSpeed = 0.15;
//     anim.play();
//     capGuyContainer.addChild(anim);
//     app.ticker.add(() => {
//         anim.x += 1;
//         if (anim.x > app.renderer.screen.width - 10) {
//             anim.x = 0;
//         }
//     });
// });

// app.stage.addChild(capGuyContainer);
