export async function GET(request) {
  console.log("hello im test");

  return new Response(JSON.stringify({ message: "Hello from the server!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
