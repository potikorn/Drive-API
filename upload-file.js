const fs = require("fs");
const { google } = require("googleapis");
const { authorize } = require("./authentication");

const folderId = "1NE6VHVpCHvYB-Tany4mI3T-_GQbm9c9k";

authorize()
  .then(auth => uploadFile(auth))
  .catch(err => {
    console.log(err);
  });

function uploadFile(auth) {
  const fileMetaData = {
    name: "test-text.txt",
    parents: [folderId]
  };

  const media = {
    mimeType: "text/plain",
    body: fs.createReadStream("test-text.txt")
  };
  const drive = google.drive({ version: "v3", auth });
  drive.files.create(
    {
      resource: fileMetaData,
      media: media,
      fields: "id"
    },
    (err, file) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File Id: ", file.data.id);
      }
    }
  );
}
