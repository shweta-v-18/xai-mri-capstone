// "use client"

// import type React from "react"

// import Link from "next/link"
// import Image from "next/image"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { EyeIcon, EyeOffIcon } from "lucide-react"
// import { toast } from "@/hooks/use-toast"

// export default function SignupPage() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     if (!formData.email || !formData.password) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       });
//       return;
//     }
  
//     if (formData.password !== formData.confirmPassword) {
//       toast({
//         title: "Error",
//         description: "Passwords do not match",
//         variant: "destructive",
//       });
//       return;
//     }
  
//     setIsLoading(true);
  
//     try {
//       const response = await fetch('http://localhost:5000/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         toast({
//           title: "Success",
//           description: "Account created successfully!",
//         });
  
//         router.push('/login'); // Navigate to Sign-in page
//       } else {
//         toast({
//           title: "Error",
//           description: data.message || "Signup failed",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       toast({
//         title: "Error",
//         description: "Something went wrong",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-100 flex items-center justify-center p-4">
//       <Card className="w-full max-w-4xl overflow-hidden shadow-xl rounded-xl">
//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Left panel */}
//           <div className="bg-gradient-to-b from-cyan-500 to-blue-500 p-8 flex flex-col justify-center relative">
//             <Link href="/" className="absolute top-4 left-4 text-white hover:text-cyan-100">
//               ← Back
//             </Link>
//             <div className="space-y-6">
//               <h2 className="text-3xl font-bold text-white">Join our healthcare community</h2>
//               <div className="flex justify-center py-6">
//                 <Image src="/brain-icon.svg" alt="Brain Icon" width={200} height={200} className="object-contain" />
//               </div>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyan-500/50 to-transparent" />
//           </div>

//           {/* Right panel */}
//           <div className="p-8 flex flex-col justify-center">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="text-center mb-6">
//                 <h2 className="text-xl text-cyan-600 font-medium">Create an account</h2>
//                 <p className="text-gray-500 text-sm">Sign up to connect with our expert doctors</p>
//               </div>

//               <div className="space-y-4">

//                 <div className="space-y-2">
//                   <label htmlFor="email" className="text-sm font-medium text-gray-700">
//                     Email Address
//                   </label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email Address"
//                     className="w-full"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="password" className="text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       name="password"
//                       type={showPassword ? "text" : "password"}
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="Create a password"
//                       className="w-full pr-10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                     >
//                       {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <Input
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       type={showConfirmPassword ? "text" : "password"}
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm your password"
//                       className="w-full pr-10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                     >
//                       {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//                     </button>
//                   </div>
//                 </div>

//                 <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isLoading}>
//                   {isLoading ? "Creating account..." : "Sign up"}
//                 </Button>

//                 <div className="text-center text-sm">
//                   <span className="text-gray-600">Already have an account? </span>
//                   <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
//                     Sign in
//                   </Link>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// }
// /frontend/app/api/signup/route.ts


//correct code dont miss
// 'use client'

// import React, { useState } from 'react'

// export default function SignupPage() {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [message, setMessage] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       const response = await fetch('/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       })

//       const data = await response.json()
//       setMessage(data.message)

//       if (response.ok) {
//         // Clear form if signup successful
//         setUsername('')
//         setPassword('')
//       }
//     } catch (err) {
//       console.error('Signup Error:', err)
//       setMessage('Signup failed')
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Signup</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full mb-4 p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 p-2 border rounded"
//           requiredcd..
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//           Signup
//         </button>
//         {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//       </form>
//     </div>
//   )
// }
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'  // 🚨 Import this hook

export default function SignupPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()  // 🚨 Initialize router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      setMessage(data.message)

      if (response.ok) {
        // 🚨 Navigate to login page after 1 sec delay (optional)
        setTimeout(() => {
          router.push('/login')  // Navigate to login page
        }, 1000)
      }
    } catch (err) {
      console.error('Signup Error:', err)
      setMessage('Signup failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Signup
        </button>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </form>
    </div>
  )
}
