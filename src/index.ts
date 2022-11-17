import { Application, Loader, Texture, AnimatedSprite, Sprite } from "pixi.js";
// import "./style.css";
///////////////////////////////////////////////////

const gameWidth = 800;
const gameHeight = 600;

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

    const birdFromSprite = Sprite.from("assets/cat.jpg");
    birdFromSprite.anchor.set(0.5, 0.5);
    birdFromSprite.position.set(gameWidth / 2, 530);

    app.stage.addChild(birdFromSprite);
    app.stage.interactive = true;
};

////////////////--loadGameAssets
async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("rabbit", "./assets/simpleSpriteSheet.json");
        loader.add("pixie", "./assets/spine-assets/pixie.json");

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
