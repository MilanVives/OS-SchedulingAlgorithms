// Round Robin Scheduling Algorithm in JavaScript

function roundRobinScheduling(processes, timeQuantum) {
    let currentTime = 0;
    let queue = [...processes]; // Copy of the process list
    let completedProcesses = [];
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    // Initialize remaining burst time for each process
    processes.forEach(process => {
        process.remainingTime = process.burstTime;
        process.completionTime = 0;
        process.waitingTime = 0;
        process.turnaroundTime = 0;
    });

    while (queue.length > 0) {
        let process = queue.shift(); // Dequeue the first process

        // If the process has arrived
        if (process.arrivalTime <= currentTime) {
            // Execute the process for the time quantum or remaining burst time
            let executionTime = Math.min(timeQuantum, process.remainingTime);
            currentTime += executionTime;
            process.remainingTime -= executionTime;

            // If the process is completed
            if (process.remainingTime === 0) {
                process.completionTime = currentTime;
                process.turnaroundTime = process.completionTime - process.arrivalTime;
                process.waitingTime = process.turnaroundTime - process.burstTime;
                completedProcesses.push(process);

                totalWaitingTime += process.waitingTime;
                totalTurnaroundTime += process.turnaroundTime;

                console.log(`Process ${process.id}: Completion Time = ${process.completionTime}, Waiting Time = ${process.waitingTime}, Turnaround Time = ${process.turnaroundTime}`);
            } else {
                // Re-queue the process if it's not finished
                queue.push(process);
            }
        } else {
            // If the process hasn't arrived, push it back to the queue
            queue.push(process);
            currentTime++;
        }
    }

    // Calculate averages
    const averageWaitingTime = totalWaitingTime / processes.length;
    const averageTurnaroundTime = totalTurnaroundTime / processes.length;

    console.log(`\nAverage Waiting Time: ${averageWaitingTime.toFixed(2)}`);
    console.log(`Average Turnaround Time: ${averageTurnaroundTime.toFixed(2)}`);
    console.log(`Time Quantum: ${timeQuantum}`);

    return {
        processes: completedProcesses,
        averageWaitingTime,
        averageTurnaroundTime,
    };
}

// Example Usage
const processes = [
    { id: 'A', arrivalTime: 0, burstTime: 3 },
    { id: 'B', arrivalTime: 2, burstTime: 6 },
    { id: 'C', arrivalTime: 4, burstTime: 4 },
    { id: 'D', arrivalTime: 6, burstTime: 5 },
    { id: 'E', arrivalTime: 8, burstTime: 2 },
];

const timeQuantum = 1; // Set time quantum to 1
const results = roundRobinScheduling(processes, timeQuantum);

console.log("\nFinal Process Table:");
console.table(results.processes);