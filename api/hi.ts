export async function GET(request) {
  console.log("hi im test");

  return new Response(JSON.stringify({ message: "Hi from the server!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
