// const puppeteer = require("pdf-puppeteer");
// const { parentPort } = require("worker_threads");

// parentPort.on("message", async ({ html, opts }) => {
//   try {
//     const pdf = await new Promise((resolve, reject) => {
//       puppeteer(
//         html,
//         resolve,
//         {...opts, timeout:5000*60*5},
//         {
//           args: ["--no-sandbox", "--disable-setuid-sandbox"],
//           headless: "new",
//         },
//         (err) => {
//           if (err) reject(err);
//         }
//       );
//     });

//     parentPort.postMessage(pdf);
//   } catch (error) {
//     parentPort.postMessage({ error: error.message });
//   } finally {
//     // Ensure the worker exits naturally
//     parentPort.close()
//     // process.exitCode = 0; // Set proper exit code for clean shutdown
//   }
// });
const puppeteer = require("pdf-puppeteer");
const { parentPort } = require("worker_threads");
const fs = require("fs");
const path = require("path");

parentPort.on("message", async ({ html, opts, outputPath }) => {
  try {
    const pdfPath = outputPath || path.join(__dirname, "output.pdf");

    await new Promise((resolve, reject) => {
      puppeteer(
        html,
        (pdfBuffer) => {
          fs.writeFile(pdfPath, pdfBuffer, (err) => {
            if (err) return reject(err);
            resolve();
          });
        },
        {
          ...opts,
          timeout: 0,
        },
        {
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          headless: "new",
        },
        (err) => {
          if (err) reject(err);
        }
      );
    });

    parentPort.postMessage({ success: true, pdfPath });
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  } finally {
    process.exitCode = 0;
    parentPort.close();
  }
});
