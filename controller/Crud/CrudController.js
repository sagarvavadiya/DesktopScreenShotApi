const ip = require("ip");
const fs = require("fs");
const screenshot = require("screenshot-desktop");
var screenshot2 = require("desktop-screenshot");
const { CurrentScreen } = require("./CurrentActiveScreen");

class CRUDController {
  static TakeScreenShot = async (req, res) => {
    try { 
      await screenshot.listDisplays().then(async (displays) => {
        // displays: [{ id, name }, { id, name }]

        const ScreenShotData = [];
        await Promise.all(
          await displays.map(async (d, index) => {
            await screenshot({
              screen: displays[displays.length - index - 1].id,
            }).then((img) => {
              // fs.writeFileSync(`Screenshot${index}.jpg`, img);
              ScreenShotData.push(
                `data:image/png;base64,${img.toString("base64")}`
              );
            });
          })
        )
          .then((result) => {
            return res.json({
              stutus: 1,
              message: "Screenshot added Successfully",
              image: ScreenShotData,
            });
          })
          .catch((err) => {
            console.log(err, "screenshot");
            return res.status(500).json({ error: err });
          });
      });
    } catch (error) {
      console.log(error, "try");
      return res.status(500).json({ error: error });
    }
  };
  static ActiveScreen = async (req, res) => {
    try {
      CurrentScreen();
      return res.json({
        stutus: 1,
        message: "Screenshot added Successfully",
      });
    } catch (error) {
      console.log(error, "try");
      return res.status(500).json({ error: error });
    }
  };
  static TakeScreenShot2 = async (req, res) => {
    screenshot2("screenshot.png", { width: 700 }, function (error, complete) {
      if (error) {
        console.log("Screenshot failed", error);

        return res.status(500).json({ error: error });
      } else {
        console.log("Screenshot succeeded", res);
        fs.writeFileSync(`Screenshot.jpg`, complete.bitmap.data);
        return res.json({
          stutus: 1,
          message: "Screenshot added Successfully",

          image: [
            `data:image/png;base64,${complete.bitmap.data.toString("base64")}`,
          ],
        });
      }
    });
  };
}

module.exports = CRUDController;
