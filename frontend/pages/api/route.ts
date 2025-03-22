// frontend/app/api/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
const dbPool = require('../../../../backend/db');  // Using require() for CommonJS

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const [existing]: any = await dbPool.query('SELECT * FROM Doctors WHERE email = ?', [email]);
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    const [result]: any = await dbPool.query(
      'INSERT INTO Doctors (email, password_hash) VALUES (?, ?)',
      [email, password]
    );

    return NextResponse.json({ message: 'Signup successful', doctor_id: result.insertId }, { status: 201 });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
