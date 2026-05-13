import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Daily refresh cron scaffold in place. This endpoint will later trigger market updates, auction updates, comp refreshes, and projection generation.',
  });
}
