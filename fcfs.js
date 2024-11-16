// FCFS Scheduling Algorithm in JavaScript

function fcfsScheduling(processes) {
    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    processes.forEach((process, index) => {
        // Waiting time is the difference between the current time and the arrival time
        process.waitingTime = Math.max(0, currentTime - process.arrivalTime);

        // Update current time
        currentTime = Math.max(currentTime, process.arrivalTime) + process.burstTime;

        // Turnaround time is the sum of waiting time and burst time
        process.turnaroundTime = process.waitingTime + process.burstTime;

        // Accumulate total waiting and turnaround times
        totalWaitingTime += process.waitingTime;
        totalTurnaroundTime += process.turnaroundTime;

        console.log(`Process ${process.id}: Waiting Time = ${process.waitingTime}, Turnaround Time = ${process.turnaroundTime}`);
    });

    // Calculate averages
    const averageWaitingTime = totalWaitingTime / processes.length;
    const averageTurnaroundTime = totalTurnaroundTime / processes.length;

    console.log(`\nAverage Waiting Time: ${averageWaitingTime.toFixed(2)}`);
    console.log(`Average Turnaround Time: ${averageTurnaroundTime.toFixed(2)}`);

    return {
        processes,
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

const results = fcfsScheduling(processes);

console.log("\nFinal Process Table:");
console.table(results.processes);