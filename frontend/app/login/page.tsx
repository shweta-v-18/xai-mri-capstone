// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { EyeIcon } from "lucide-react"

// export default function LoginPage() {
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
//               <h2 className="text-3xl font-bold text-white">Expert advice from top doctors</h2>
//               <div className="flex justify-center py-6">
//                 <Image src="/brain-icon.svg" alt="Brain Icon" width={200} height={200} className="object-contain" />
//               </div>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyan-500/50 to-transparent" />
//           </div>

//           {/* Right panel */}
//           <div className="p-8 flex flex-col justify-center">
//             <div className="space-y-6">
//               <div className="text-center mb-6">
//                 <h2 className="text-xl text-cyan-600 font-medium">Welcome back</h2>
//                 <p className="text-gray-500 text-sm">
//                   Log in to your account and we'll get you set up with our doctors
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="email" className="text-sm font-medium text-gray-700">
//                     Email Address
//                   </label>
//                   <Input id="email" type="email" placeholder="Email Address" className="w-full" />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="password" className="text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <Input id="password" type="password" placeholder="Password" className="w-full pr-10" />
//                     <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
//                       <EyeIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <Button className="w-full bg-teal-500 hover:bg-teal-600">Sign in</Button>

//                 <div className="text-center text-sm">
//                   <span className="text-gray-600">Don't have an account? </span>
//                   <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
//                     Sign up
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// }







// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { EyeIcon } from "lucide-react";

// export default function LoginPage() {
//   const router = useRouter();

//   // const handleSignIn = () => {
//   //   // Simulating authentication (replace with actual logic if needed)
//   //   setTimeout(() => {
//   //     router.push("/upload");
//   //   }, 500);
//   // };
//   const handleSignIn = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/login", {  // Replace with your backend URL
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         // Login successful
//         router.push("/upload");
//       } else {
//         // Login failed
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An error occurred. Please try again.");
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
//               <h2 className="text-3xl font-bold text-white">Expert advice from top doctors</h2>
//               <div className="flex justify-center py-6">
//                 <Image src="/brain-icon.svg" alt="Brain Icon" width={200} height={200} className="object-contain" />
//               </div>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyan-500/50 to-transparent" />
//           </div>

//           {/* Right panel */}
//           <div className="p-8 flex flex-col justify-center">
//             <div className="space-y-6">
//               <div className="text-center mb-6">
//                 <h2 className="text-xl text-cyan-600 font-medium">Welcome back</h2>
//                 <p className="text-gray-500 text-sm">
//                   Log in to your account and we'll get you set up with our doctors
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="email" className="text-sm font-medium text-gray-700">
//                     Email Address
//                   </label>
//                   <Input id="email" type="email" placeholder="Email Address" className="w-full" />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="password" className="text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <Input id="password" type="password" placeholder="Password" className="w-full pr-10" />
//                     <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
//                       <EyeIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>

//                 <Button className="w-full bg-teal-500 hover:bg-teal-600" onClick={handleSignIn}>
//                   Sign in
//                 </Button>

//                 <div className="text-center text-sm">
//                   <span className="text-gray-600">Don't have an account? </span>
//                   <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
//                     Sign up
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { EyeIcon } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async () => {
    // Reset error
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/upload");
      } else {
        setErrorMsg(data.message || "Login failed");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl overflow-hidden shadow-xl rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left panel */}
          <div className="bg-gradient-to-b from-cyan-500 to-blue-500 p-8 flex flex-col justify-center relative">
            <Link href="/" className="absolute top-4 left-4 text-white hover:text-cyan-100">
              ← Back
            </Link>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Expert advice from top doctors</h2>
              <div className="flex justify-center py-6">
                <Image src="/brain-icon.svg" alt="Brain Icon" width={200} height={200} className="object-contain" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyan-500/50 to-transparent" />
          </div>

          {/* Right panel */}
          <div className="p-8 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl text-cyan-600 font-medium">Welcome back</h2>
                <p className="text-gray-500 text-sm">
                  Log in to your account and we'll get you set up with our doctors
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="w-full pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                )}

                <Button className="w-full bg-teal-500 hover:bg-teal-600" onClick={handleSignIn}>
                  Sign in
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
