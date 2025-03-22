import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface ResultsPageProps {
  params: {
    id: string
  }
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const patientId = params.id
  const patientName = "XYZ" // This would come from your database
  const scanDate = "2022/01/26" // This would come from your database

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8 flex justify-between items-center">
          {/* 🔻 UPDATED: Changed Link from /explanation to /dashboard */}
          <Link href="/dashboard">
            <Button variant="ghost" className="pl-0">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          {/* 🔺 END OF UPDATE */}

          <h1 className="text-3xl font-bold">Results</h1>

          <Button variant="outline">View History</Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <p className="text-lg">Patient Name : {patientName}</p>
              <p className="text-lg">Patient ID : {patientId}</p>
              <p className="text-lg">Scan Date : {scanDate}</p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Progression Graph</h3>
              <div className="relative h-48 w-full bg-gray-100 border rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Disease Progression Graph"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Region Analysis</h3>
              <div className="bg-gray-50 p-4 rounded-md border">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="bg-red-100 p-2 rounded">
                    <p className="font-bold">Hippocampus</p>
                    <p>Volume Change: -2.5% change</p>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded">
                    <p className="font-bold">Temporal Lobe</p>
                    <p>Volume Change: -1.8% change</p>
                  </div>
                  <div className="bg-orange-100 p-2 rounded">
                    <p className="font-bold">Ventricles</p>
                    <p>Volume Change: +3.2% change</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">AI Confidence Score:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "89%" }}></div>
                  </div>
                  <p className="text-right text-sm mt-1">89.5%</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4">AI Heatmap Output</h3>
            <div className="relative aspect-square w-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AI Heatmap Output"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline">Download Report</Button>
        </div>
      </div>
    </div>
  )
}
