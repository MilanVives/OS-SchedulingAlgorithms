
# Scheduling Algorithms

This repository contains JavaScript implementations of various CPU scheduling algorithms commonly used in operating systems. These algorithms manage the execution of processes by determining their execution order based on specific criteria.

## Algorithms Included

### 1. **First-Come, First-Served (FCFS)**
- **Description**: Executes processes in the order they arrive.
- **Features**:
  - Non-preemptive.
  - Simple to implement.
  - Long average waiting time if there are long processes at the beginning (convoy effect).
- **Code File**: `fcfs.js`

---

### 2. **Round Robin (RR)**
- **Description**: Processes are executed in a circular order, each receiving a fixed time quantum.
- **Features**:
  - Preemptive.
  - Fair distribution of CPU time.
  - The performance depends heavily on the chosen time quantum.
- **Code File**: `roundRobin.js`
- **Configurable Time Quantum**:
  - You can set the time quantum (e.g., 1, 2, etc.) or even dynamic values (like \( 2^i \)).

---

### 3. **Shortest Process Next (SPN)**
- **Description**: Executes the process with the shortest burst time next.
- **Features**:
  - Non-preemptive.
  - Minimizes average waiting time but may lead to starvation of longer processes.
- **Code File**: `spn.js`

---

### 4. **Shortest Remaining Time (SRT)**
- **Description**: Preemptive version of SPN where a running process is preempted if a new process with a shorter remaining time arrives.
- **Features**:
  - Preemptive.
  - Minimizes average waiting time.
  - Avoids convoy effects.
- **Code File**: `srt.js`

---

### 5. **Highest Response Ratio Next (HRRN)**
- **Description**: Selects the process with the highest response ratio next.
  - **Response Ratio Formula**:
    \[
    \text{Response Ratio} = \frac{\text{Waiting Time} + \text{Burst Time}}{\text{Burst Time}}
    \]
- **Features**:
  - Non-preemptive.
  - Balances fairness and minimizes waiting time.
- **Code File**: `hrrn.js`
---

### 6. **Multilevel Feedback Queue (MLFQ)**
- **Description**: Processes are assigned to multiple queues with different priorities and time quantums. Processes move between queues based on their execution history.
- **Features**:
  - Preemptive.
  - Dynamic time quantum configuration.
  - Suitable for systems where process execution patterns vary widely.
- **Code File**: `feedback.js`
- **Special Configuration**:
  - Implements a time quantum of \( 1 \).
---

### 7. **Multilevel Feedback Queue (MLFQ)**
- **Description**: Processes are assigned to multiple queues with different priorities and time quantums. Processes move between queues based on their execution history.
- **Features**:
  - Preemptive.
  - Dynamic time quantum configuration.
  - Suitable for systems where process execution patterns vary widely.
- **Code File**: `feedback2i.js`
- **Special Configuration**:
  - Implements a time quantum of \( 2^i \), where \( i \) is the current queue level.

---

## Example Usage

Each algorithm is implemented as a standalone function. Here's a general example of how to run these algorithms:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MilanVives/scheduling-algorithms.git
   cd scheduling-algorithms
   ```

2. **Run an Algorithm**:
   Example for FCFS:
   ```bash
   node fcfs.js
   ```

3. **Modify the Processes**:
   Update the `processes` array in the respective file to test with different inputs. Each process typically includes:
   - `id`: Process ID
   - `arrivalTime`: When the process arrives
   - `burstTime`: Execution time for the process

4. **View Results**:
   Each algorithm prints:
   - **Completion Time**: When the process finished execution.
   - **Turnaround Time**: Total time taken for a process from arrival to completion.
   - **Waiting Time**: Time spent waiting in the queue.

---

## How to Add New Scheduling Algorithms

1. Create a new file (e.g., `newAlgorithm.js`).
2. Define the process data structure and logic.
3. Follow the output format for consistency.
4. Update the `README.md` to document the new algorithm.

---

## Contributions

Contributions are welcome! If you'd like to improve the existing algorithms or add new ones, feel free to open a pull request or file an issue.

---

## License

This repository is licensed under the [MIT License](LICENSE).

---

### Author
- **Milan Dima**
- **Contact**: milan.dima@vives.be
- **GitHub**: [MilanVives](https://github.com/MilanVives)

