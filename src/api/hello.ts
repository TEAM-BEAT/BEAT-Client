export function GET(request: Request, res) {
  console.log("hi im test");
  return res.status(200).json({ message: "Hello from the server!" });
}
