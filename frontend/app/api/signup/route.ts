// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   const body = await req.json()
//   const { username, password } = body

//   // TODO: Add validation and save to DB
//   console.log("Signup Data:", { username, password })

//   return NextResponse.json({ message: "Signup successful" }, { status: 200 })
// }
// frontend/app/api/signup/route.ts

import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import pool from "@/lib/db"




export async function POST(req: Request) {
  try {
    // Parse JSON body from request
    const body = await req.json()
    const { username, password } = body

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 400 }
      )
    }

    // Check if user already exists in the database
    const [rows]: any = await pool.execute(
      "SELECT * FROM Doctors WHERE email = ?",
      [username]
    )

    if (rows.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      )
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user into Doctors table
    await pool.execute(
      "INSERT INTO Doctors (email, password_hash) VALUES (?, ?)",
      [username, hashedPassword]
    )

    // Success response
    return NextResponse.json(
      { message: "Signup successful" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Signup Error:", error)
    return NextResponse.json(
      { message: "Signup failed due to server error" },
      { status: 500 }
    )
  }
}
