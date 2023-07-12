import { NextResponse } from 'next/server';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  await wait(1000);
  return NextResponse.redirect(
    'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=160&h=160&dpr=2&q=80'
  );
}
