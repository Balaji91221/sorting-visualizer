
"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const ARRAY_SIZE = 50
const ANIMATION_SPEED_MS = 50

type SortingAlgorithm = 'quickSort' | 'bubbleSort' | 'mergeSort'

export default function Home() {
  const [array, setArray] = useState<number[]>([])
  const [sorting, setSorting] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('quickSort')
  const [arraySize, setArraySize] = useState(ARRAY_SIZE)
  const [speed, setSpeed] = useState(ANIMATION_SPEED_MS)
  const [comparingIndices, setComparingIndices] = useState<[number, number] | null>(null)
  const [codeSnippet, setCodeSnippet] = useState('')
  const [currentLine, setCurrentLine] = useState<number | null>(null)
  const stopSortingRef = useRef(false)
  const arrayRef = useRef<number[]>([])

  const resetArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    arrayRef.current = newArray
    setCompleted(false)
    setComparingIndices(null)
    setCurrentLine(null)
  }, [arraySize])

  useEffect(() => {
    resetArray()
  }, [resetArray])

  const updateArray = useCallback((newArray: number[]) => {
    if (!stopSortingRef.current) {
      setArray([...newArray])
      arrayRef.current = newArray
    }
  }, [])

  const swap = useCallback((arr: number[], i: number, j: number) => {
    if (i >= 0 && i < arr.length && j >= 0 && j < arr.length) {
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
      updateArray(arr)
    }
  }, [updateArray])

  const quickSort = async (arr: number[], low: number, high: number) => {
    if (low < high && !stopSortingRef.current) {
      setCurrentLine(1)
      const pi = await partition(arr, low, high)
      setCurrentLine(2)
      await quickSort(arr, low, pi - 1)
      setCurrentLine(3)
      await quickSort(arr, pi + 1, high)
    }
    setCurrentLine(null)
  }

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high]
    let i = low - 1

    for (let j = low; j < high && !stopSortingRef.current; j++) {
      setComparingIndices([j, high])
      await new Promise(resolve => setTimeout(resolve, speed))

      if (arr[j] < pivot) {
        i++
        swap(arr, i, j)
      }
    }

    if (!stopSortingRef.current) {
      swap(arr, i + 1, high)
    }

    return i + 1
  }

  const bubbleSort = async (arr: number[]) => {
    const n = arr.length
    for (let i = 0; i < n - 1 && !stopSortingRef.current; i++) {
      setCurrentLine(1)
      for (let j = 0; j < n - i - 1 && !stopSortingRef.current; j++) {
        setCurrentLine(2)
        setComparingIndices([j, j + 1])
        await new Promise(resolve => setTimeout(resolve, speed))

        setCurrentLine(3)
        if (arr[j] > arr[j + 1]) {
          setCurrentLine(4)
          swap(arr, j, j + 1)
        }
      }
    }
    setCurrentLine(null)
  }

  const mergeSort = async (arr: number[], left: number, right: number) => {
    if (left < right && !stopSortingRef.current) {
      setCurrentLine(1)
      const mid = Math.floor((left + right) / 2)
      setCurrentLine(2)
      await mergeSort(arr, left, mid)
      setCurrentLine(3)
      await mergeSort(arr, mid + 1, right)
      setCurrentLine(4)
      await merge(arr, left, mid, right)
    }
    setCurrentLine(null)
  }

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    const n1 = mid - left + 1
    const n2 = right - mid
    const L = arr.slice(left, mid + 1)
    const R = arr.slice(mid + 1, right + 1)

    let i = 0, j = 0, k = left

    while (i < n1 && j < n2 && !stopSortingRef.current) {
      setComparingIndices([left + i, mid + 1 + j])
      await new Promise(resolve => setTimeout(resolve, speed))

      if (L[i] <= R[j]) {
        arr[k] = L[i]
        i++
      } else {
        arr[k] = R[j]
        j++
      }
      k++
      updateArray(arr)
    }

    while (i < n1 && !stopSortingRef.current) {
      arr[k] = L[i]
      i++
      k++
      updateArray(arr)
      await new Promise(resolve => setTimeout(resolve, speed))
    }

    while (j < n2 && !stopSortingRef.current) {
      arr[k] = R[j]
      j++
      k++
      updateArray(arr)
      await new Promise(resolve => setTimeout(resolve, speed))
    }
  }

  const startSorting = async () => {
    setSorting(true)
    setCompleted(false)
    stopSortingRef.current = false

    const algorithmCode = {
      quickSort: `const quickSort = async (arr, low, high) => {
  if (low < high) {
    const pi = await partition(arr, low, high)
    await quickSort(arr, low, pi - 1)
    await quickSort(arr, pi + 1, high)
  }
}`,
      bubbleSort: `const bubbleSort = async (arr) => {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
}`,
      mergeSort: `const mergeSort = async (arr, left, right) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2)
    await mergeSort(arr, left, mid)
    await mergeSort(arr, mid + 1, right)
    await merge(arr, left, mid, right)
  }
}`
    }

    setCodeSnippet(algorithmCode[algorithm])

    const arrayCopy = [...arrayRef.current]
    if (algorithm === 'quickSort') {
      await quickSort(arrayCopy, 0, arrayCopy.length - 1)
    } else if (algorithm === 'bubbleSort') {
      await bubbleSort(arrayCopy)
    } else if (algorithm === 'mergeSort') {
      await mergeSort(arrayCopy, 0, arrayCopy.length - 1)
    }

    if (!stopSortingRef.current) {
      setCompleted(true)
    }
    setSorting(false)
    setComparingIndices(null)
    setCurrentLine(null)
  }

  const stopSorting = () => {
    stopSortingRef.current = true
    setSorting(false)
    setComparingIndices(null)
    setCurrentLine(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">Sorting Visualizer</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-4">
            <Button onClick={resetArray} disabled={sorting} variant="outline" className="bg-gray-800 text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900">
              Generate New Array
            </Button>
            <Button onClick={startSorting} disabled={sorting || completed} variant="outline" className="bg-gray-800 text-green-400 border-green-400 hover:bg-green-400 hover:text-gray-900">
              Start Sorting
            </Button>
            <Button onClick={stopSorting} disabled={!sorting} variant="outline" className="bg-gray-800 text-red-400 border-red-400 hover:bg-red-400 hover:text-gray-900">
              Stop Sorting
            </Button>
            <Select
              value={algorithm}
              onValueChange={(value: SortingAlgorithm) => setAlgorithm(value)}
              disabled={sorting}
            >
              <SelectTrigger className="w-[180px] bg-gray-800 text-purple-400 border-purple-400">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quickSort">Quick Sort</SelectItem>
                <SelectItem value="bubbleSort">Bubble Sort</SelectItem>
                <SelectItem value="mergeSort">Merge Sort</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Array Size: {arraySize}</label>
              <Slider
                value={[arraySize]}
                onValueChange={([value]) => setArraySize(value)}
                min={10}
                max={100}
                step={1}
                disabled={sorting}
                className="bg-gray-8"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Speed: {speed}ms</label>
              <Slider
                value={[speed]}
                onValueChange={([value]) => setSpeed(value)}
                min={10}
                max={1000}
                step={10}
                disabled={sorting}
                className="bg-gray-800"
              />
            </div>
          </div>
          <div className="h-64 flex items-end bg-gray-800 rounded-lg p-4">
            {array.map((value, idx) => (
              <motion.div
                key={idx}
                className={`w-52 mx-px  ${
                  comparingIndices?.includes(idx)
                    ? 'bg-yellow-400'
                    : completed
                    ? 'bg-green-400'
                    : 'bg-purple-400'
                }`}
                style={{ height: `${value}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 text-purple-400">Code:</h2>
          <AnimatePresence mode='wait'>
            <motion.pre
              key={codeSnippet}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 p-4 rounded overflow-x-auto"
            >
              <code>
                {codeSnippet.split('\n').map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    animate={{ 
                      backgroundColor: currentLine === index + 1 ? 'rgba(236, 72, 153, 0.3)' : 'rgba(0,0,0,0)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-sm"
                  >
                    {line}
                  </motion.div>
                ))}
              </code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}