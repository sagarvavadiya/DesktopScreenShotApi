const ip = require("ip");
const fs = require("fs");
const screenshot = require("screenshot-desktop");
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
            return res.status(500).json({ error: err });
          });
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };
}

module.exports = CRUDController;
