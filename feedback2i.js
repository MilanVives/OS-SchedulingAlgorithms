// Multilevel Feedback Queue (MLFQ) Scheduling Algorithm with Time Quantum 2^i

function mlfqScheduling(processes) {
    const queues = [];
    let currentTime = 0;
    let completedProcesses = [];
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    // Initialize queues
    for (let i = 0; i < processes.length; i++) {
        queues.push([]);
    }

    // Add all processes to the first queue
    processes.forEach(process => {
        process.remainingTime = process.burstTime;
        process.waitingTime = 0;
        process.turnaroundTime = 0;
        process.completed = false;
        queues[0].push(process);
    });

    // Function to calculate time quantum as 2^i
    function calculateTimeQuantum(queueLevel) {
        return Math.pow(2, queueLevel);
    }

    // Function to move processes to the next queue
    function moveProcessToLowerQueue(process, currentQueue) {
        const index = queues[currentQueue].indexOf(process);
        if (index !== -1) {
            queues[currentQueue].splice(index, 1); // Remove from current queue
            if (currentQueue + 1 < queues.length) {
                queues[currentQueue + 1].push(process); // Move to the next lower queue
            }
        }
    }

    // Main scheduling loop
    while (queues.some(queue => queue.length > 0)) {
        let processExecuted = false;

        for (let i = 0; i < queues.length; i++) {
            const queue = queues[i];
            const timeQuantum = calculateTimeQuantum(i);

            while (queue.length > 0) {
                const process = queue.shift();

                if (process.arrivalTime <= currentTime && !process.completed) {
                    // Execute the process for the time quantum or remaining time
                    const executionTime = Math.min(timeQuantum, process.remainingTime);
                    currentTime += executionTime;
                    process.remainingTime -= executionTime;

                    // If the process is completed
                    if (process.remainingTime === 0) {
                        process.completed = true;
                        process.turnaroundTime = currentTime - process.arrivalTime;
                        process.waitingTime = process.turnaroundTime - process.burstTime;
                        completedProcesses.push(process);

                        totalWaitingTime += process.waitingTime;
                        totalTurnaroundTime += process.turnaroundTime;

                        console.log(
                            `Process ${process.id}: Completion Time = ${currentTime}, Waiting Time = ${process.waitingTime}, Turnaround Time = ${process.turnaroundTime}`
                        );
                    } else {
                        // Move the process to the next lower queue
                        moveProcessToLowerQueue(process, i);
                    }

                    processExecuted = true; // Mark that a process was executed in this cycle
                } else {
                    // Re-add the process if it hasn't arrived yet
                    queue.push(process);
                    break;
                }
            }

            if (processExecuted) break; // If a process was executed, stop iterating through queues
        }

        // If no process was executed, jump time to the next available process
        if (!processExecuted) {
            const nextProcess = processes.find(
                process => !process.completed && process.arrivalTime > currentTime
            );
            if (nextProcess) {
                currentTime = nextProcess.arrivalTime;
            }
        }
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

const results = mlfqScheduling(processes);

console.log("\nFinal Process Table:");
console.table(results.processes);