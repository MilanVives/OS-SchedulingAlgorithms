// Highest Response Ratio Next (HRRN) Scheduling Algorithm in JavaScript

function hrrnScheduling(processes) {
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

    while (completedProcesses.length < processes.length) {
        // Select processes that have arrived but are not completed
        let availableProcesses = processQueue.filter(
            process => process.arrivalTime <= currentTime && !process.completed
        );

        if (availableProcesses.length === 0) {
            // If no process is available, move the current time forward
            currentTime++;
            continue;
        }

        // Calculate response ratios for available processes
        availableProcesses.forEach(process => {
            process.responseRatio =
                (currentTime - process.arrivalTime + process.burstTime) /
                process.burstTime;
        });

        // Select the process with the highest response ratio
        let highestResponseProcess = availableProcesses.reduce((prev, curr) =>
            prev.responseRatio > curr.responseRatio ? prev : curr
        );

        // Execute the selected process
        currentTime += highestResponseProcess.burstTime;
        highestResponseProcess.completionTime = currentTime;
        highestResponseProcess.turnaroundTime =
            highestResponseProcess.completionTime - highestResponseProcess.arrivalTime;
        highestResponseProcess.waitingTime =
            highestResponseProcess.turnaroundTime - highestResponseProcess.burstTime;
        highestResponseProcess.completed = true;

        // Add to completed processes
        completedProcesses.push(highestResponseProcess);

        totalWaitingTime += highestResponseProcess.waitingTime;
        totalTurnaroundTime += highestResponseProcess.turnaroundTime;

        console.log(
            `Process ${highestResponseProcess.id}: Completion Time = ${highestResponseProcess.completionTime}, Waiting Time = ${highestResponseProcess.waitingTime}, Turnaround Time = ${highestResponseProcess.turnaroundTime}`
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

const results = hrrnScheduling(processes);

console.log("\nFinal Process Table:");
console.table(results.processes);