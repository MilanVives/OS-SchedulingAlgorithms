// Shortest Process Next (SPN) Scheduling Algorithm in JavaScript

function spnScheduling(processes) {
    let currentTime = 0;
    let completedProcesses = [];
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    // Clone processes to avoid mutating the original array
    let processQueue = [...processes].map(process => ({
        ...process,
        completionTime: 0,
        waitingTime: 0,
        turnaroundTime: 0,
        completed: false,
    }));

    while (processQueue.some(p => !p.completed)) {
        // Select processes that have arrived but are not completed
        let availableProcesses = processQueue.filter(
            process => process.arrivalTime <= currentTime && !process.completed
        );

        if (availableProcesses.length === 0) {
            // If no process is available, move the current time forward
            currentTime++;
            continue;
        }

        // Select the process with the shortest burst time
        let shortestProcess = availableProcesses.reduce((prev, curr) =>
            prev.burstTime < curr.burstTime ? prev : curr
        );

        // Process execution
        currentTime += shortestProcess.burstTime;
        shortestProcess.completionTime = currentTime;
        shortestProcess.turnaroundTime =
            shortestProcess.completionTime - shortestProcess.arrivalTime;
        shortestProcess.waitingTime =
            shortestProcess.turnaroundTime - shortestProcess.burstTime;
        shortestProcess.completed = true;

        // Add to completed processes
        completedProcesses.push(shortestProcess);

        totalWaitingTime += shortestProcess.waitingTime;
        totalTurnaroundTime += shortestProcess.turnaroundTime;

        console.log(
            `Process ${shortestProcess.id}: Completion Time = ${shortestProcess.completionTime}, Waiting Time = ${shortestProcess.waitingTime}, Turnaround Time = ${shortestProcess.turnaroundTime}`
        );
    }

    // Calculate averages
    const averageWaitingTime = totalWaitingTime / processes.length;
    const averageTurnaroundTime = totalTurnaroundTime / processes.length;

    console.log(`\nAverage Waiting Time: ${averageWaitingTime.toFixed(2)}`);
    console.log(`Average Turnaround Time: ${averageTurnaroundTime.toFixed(2)}`);

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

const results = spnScheduling(processes);

console.log("\nFinal Process Table:");
console.table(results.processes);