"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Loader2, CheckCircle, X, RefreshCw, FileText } from 'lucide-react'
import Link from "next/link"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [patientName, setPatientName] = useState("")
  const [patientId, setPatientId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [processingStep, setProcessingStep] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter();


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  const handleReplaceFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles(newFiles) // Replace all files
    }
  }

  const removeFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove))
  }

  const handleReset = () => {
    setFiles([])
    setPatientName("")
    setPatientId("")
  }

  const handleUpload = () => {
    setIsLoading(true)
    setProgress(0)
    setProcessingStep("Initializing upload...")
    setIsComplete(false)
    
    // Simulate upload process with different steps
    const steps = [
      { progress: 20, message: "Uploading files..." },
      { progress: 40, message: "Processing MRI scans..." },
      { progress: 60, message: "Running AI analysis..." },
      { progress: 80, message: "Generating results..." },
      { progress: 100, message: "Complete!" }
    ]
    
    let currentStep = 0
    
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress)
        setProcessingStep(steps[currentStep].message)
        currentStep++
        
        if (currentStep === steps.length) {
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => {
              setIsLoading(false)
              router.push(`/results/${patientId}`);
            }, 1000)
          }, 500)
          clearInterval(interval)
        }
      }
    }, 1200) // Each step takes 1.2 seconds
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    
    switch(extension) {
      case 'nii':
        return <div className="bg-purple-100 text-purple-800 p-1 rounded text-xs font-medium">NII</div>
      case 'dcm':
        return <div className="bg-blue-100 text-blue-800 p-1 rounded text-xs font-medium">DICOM</div>
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <div className="bg-green-100 text-green-800 p-1 rounded text-xs font-medium">IMG</div>
      default:
        return <div className="bg-gray-100 text-gray-800 p-1 rounded text-xs font-medium">FILE</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-8 flex justify-between items-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
            ← Back to Dashboard
          </Link>
        </header>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">Upload MRI Scans</CardTitle>
            <p className="text-gray-500">Upload MRI scans for AI-powered analysis and disease tracking</p>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left panel - Upload area */}
              <div className="lg:col-span-2">
                <div
                  className={`w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px] transition-colors
                    ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {files.length === 0 ? (
                    <>
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <FileText className="h-12 w-12 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Drag & Drop your MRI scan files here</h3>
                      <p className="text-sm text-gray-500 mb-4">Supported formats: .nii, .dicom, .png, .jpeg (max 50MB)</p>

                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
                          Browse Files
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          accept=".nii,.dcm,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </>
                  ) : (
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Selected files ({files.length})</h3>
                        <div className="flex gap-2">
                          <label htmlFor="replace-files" className="cursor-pointer">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <RefreshCw className="h-3.5 w-3.5" />
                              Replace All
                            </Button>
                            <input
                              id="replace-files"
                              type="file"
                              multiple
                              accept=".nii,.dcm,.png,.jpg,.jpeg"
                              className="hidden"
                              onChange={handleReplaceFiles}
                            />
                          </label>
                          <label htmlFor="add-more-files" className="cursor-pointer">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Upload className="h-3.5 w-3.5" />
                              Add More
                            </Button>
                            <input
                              id="add-more-files"
                              type="file"
                              multiple
                              accept=".nii,.dcm,.png,.jpg,.jpeg"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="max-h-[300px] overflow-y-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {files.map((file, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                      {getFileIcon(file.name)}
                                      <span className="ml-2 text-sm text-gray-900 truncate max-w-[200px]">{file.name}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {file.type || file.name.split('.').pop()?.toUpperCase()}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => removeFile(index)}
                                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                    >
                                      <X className="h-4 w-4" />
                                      <span className="sr-only">Remove</span>
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right panel - Patient details */}
              <div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
                  <h3 className="font-medium text-lg mb-4">Patient Details</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="patient-name" className="text-sm font-medium text-gray-700">
                        Patient Name
                      </label>
                      <Input
                        id="patient-name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Patient Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="patient-id" className="text-sm font-medium text-gray-700">
                        Patient ID
                      </label>
                      <Input
                        id="patient-id"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        placeholder="Patient ID"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={handleReset}>
            Reset Form
          </Button>
          <Button 
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleUpload}
            disabled={isLoading || files.length === 0}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {isLoading ? "Processing..." : "Upload & Process"}
          </Button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                {isComplete ? (
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                ) : (
                  <div className="relative mb-6">
                    <div className="h-16 w-16 rounded-full border-4 border-t-blue-500 border-b-blue-500 border-l-blue-200 border-r-blue-200 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-2">
                  {isComplete ? "Processing Complete!" : "Processing Your MRI Scans"}
                </h3>
                
                <p className="text-gray-500 mb-4">
                  {isComplete ? "Your results are ready to view" : processingStep}
                </p>
                
                {!isComplete && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
                
                {isComplete && (
                  <p className="text-sm text-gray-500">Redirecting to results...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


