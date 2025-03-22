import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface LongitudinalPageProps {
  params: {
    id: string
  }
}

export default function LongitudinalPage({ params }: LongitudinalPageProps) {
  const patientId = params.id
  const patientName = "XYZ" // This would come from your database

  // Sample MRI scan dates - in a real app, these would come from your database
  const scanDates = [
    { date: "2020/04/16", image: "/placeholder.svg?height=400&width=600" },
    { date: "2020/09/6", image: "/placeholder.svg?height=400&width=600" },
    { date: "2021/03/22", image: "/placeholder.svg?height=400&width=600" },
    { date: "2022/01/26", image: "/placeholder.svg?height=400&width=600" },
  ]

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="pl-0 mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-center">Longitudinal MRI Data</h1>
        </header>

        <div className="flex justify-center gap-8 mb-8">
          <Card className="w-64">
            <CardContent className="p-4 text-center bg-gray-200">
              <p className="text-lg">Patient ID : {patientId}</p>
            </CardContent>
          </Card>

          <Card className="w-64">
            <CardContent className="p-4 text-center bg-gray-200">
              <p className="text-lg">Patient Name : {patientName}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scanDates.map((scan, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full aspect-square mb-2">
                <Image
                  src={scan.image || "/placeholder.svg"}
                  alt={`MRI Scan from ${scan.date}`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-lg font-medium">Date : {scan.date}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href={`/explanation/${patientId}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">View AI Analysis</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

