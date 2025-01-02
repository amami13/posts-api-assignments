import initApp from "./server";
const port = process.env.PORT;
// debug - remove
console.log("1");
initApp().then((app) => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
