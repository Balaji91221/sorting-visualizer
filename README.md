# Sorting Visualizer

A visual tool to demonstrate various sorting algorithms in action. This application provides a user-friendly interface for exploring how sorting algorithms like Bubble Sort, Merge Sort and Quick Sort work by visualizing each step of the process.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)

## Features

- 📊 **Visualize Sorting Algorithms**: Watch Bubble Sort and Quick Sort as they work through an array.
- 🎛️ **Customizable Options**: Set custom array size and speed of visualization.
- ⌨️ **Interactive Input**: Enter your own array to sort.
- 🔄 **Real-Time Updates**: Observe comparisons and swaps highlighted during sorting.
- 🛠️ **Choose Algorithms**: Select from various sorting algorithms.
  
## Demo

![Sorting Visualizer Demo](./demo.gif)
<img width="946" alt="{D0720EC5-9AFF-41E0-B3DF-2D52575C9E5B}" src="https://github.com/user-attachments/assets/af03cea4-e911-4c75-b3c8-9332e6b60dd9">


## Technologies

- **React.js**: Frontend library for building the UI components.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: For smooth animations during sorting steps.

## Setup

### Prerequisites

- Node.js (>=14.0.0)
- npm (comes with Node.js) or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sorting-visualizer.git ```
   
2. Navigate to the project directory:
   
```bash
cd sorting-visualizer
 ```


### Usage 

- **Generate New Array**: 
  - Click on the "Generate New Array" button to create a new random array.

- **Set Custom Array**: 
  - Enter numbers separated by commas (e.g., `5, 3, 8, 1`) into the input box and click the "Set Custom Array" button to visualize sorting on your custom array.

- **Select Algorithm**: 
  - Use the dropdown menu to select the sorting algorithm you want to visualize. Choose between **Bubble Sort** and **Quick Sort**.

- **Control Array Size and Speed**: 
  - Use the sliders to adjust the array size and the sorting speed according to your preference.
  - Increase the array size for a more complex sorting process, or decrease it for quicker visualization.
  - Adjust the speed slider to control the sorting speed, with options ranging from slow (more detailed visualization) to fast (quicker completion).

- **Start/Stop Sorting**: 
  - Click on the "Start Sorting" button to begin visualizing the sorting process step-by-step.
  - At any time, you can click the "Stop Sorting" button to halt the process.

