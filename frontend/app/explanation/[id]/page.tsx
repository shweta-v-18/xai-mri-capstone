import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface ExplanationPageProps {
  params: {
    patientId: string
  }
}

export default function ExplanationPage({ params }: ExplanationPageProps) {
  const { patientId } = params
  const patientName = "XYZ" // This would come from your database

  const analysisData = [
    {
      date: "2022/01/26",
      originalImage: "/placeholder.svg?height=400&width=600",
      heatmapImage: "/placeholder.svg?height=400&width=600",
    },
    {
      date: "2021/03/22",
      originalImage: "/placeholder.svg?height=400&width=600",
      heatmapImage: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8">
          <Link href={`/longitudinal/${patientId}`}>
            <Button variant="ghost" className="pl-0 mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Longitudinal Data
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-center">XAI Explanation</h1>
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

        {analysisData.map((analysis, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-xl font-medium mb-4">Date : {analysis.date}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square mb-2">
                  <Image
                    src={analysis.originalImage || "/placeholder.svg"}
                    alt={`Original MRI Scan from ${analysis.date}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-lg font-medium">Original Image</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square mb-2">
                  <Image
                    src={analysis.heatmapImage || "/placeholder.svg"}
                    alt={`AI Analysis Heatmap from ${analysis.date}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-lg font-medium">AI Analysis Heatmap</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-center">
          <Link href={`/results/${patientId}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">View Results</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
