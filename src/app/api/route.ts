/* /* https://nga-states-lga.onrender.com/fetch 

export const dynamic = 'force-static'
 
export async function GET() {
  const res = await fetch('https://nga-states-lga.onrender.com/fetch')
  const data = await res.json()
  return Response.json({data})
} */