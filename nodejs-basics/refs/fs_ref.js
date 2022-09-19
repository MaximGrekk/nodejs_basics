const fs = require("fs");
const path = require("path");

// File system

// fs.mkdir(path.join(__dirname, "notes"), (err) => {
//   if (err) throw new Error(err);
//   console.log('Directory was created');
// });

// fs.writeFile(
//   path.join(__dirname, "notes", "mynotes.txt"),
//   "Hello World",
//   (err) => {
//     if (err) throw new Error(err);
//     console.log("File was created");

//     fs.appendFile(
//       path.join(__dirname, "notes", "mynotes.txt"),
//       "\nNew content from append file",
//       (err) => {
//         if (err) throw new Error(err);
//         console.log("File was updated");

//         fs.readFile(
//           path.join(__dirname, "notes", "mynotes.txt"),
//           "utf-8",
//           (err, data) => {
//             if (err) throw new Error(err);
//             console.log(Buffer.from(data).toString());
//           }
//         );
//       }
//     );
//   }
// );

fs.rename(
  path.join(__dirname, "notes", "mynotes.txt"),
  path.join(__dirname, "notes", "notes.txt"),
  (err) => {
    if (err) throw new Error(err);
    console.log("File was renamed");
  }
);
