# datapond-tracing-canister

> DataPond Tracing canister is a Internet Computer smart contract for seamless data transparency and accountability. Effortlessly store and trace every action, from data uploads to processing and consumption, providing methods for granular verification and retrieving logs for a specific data.

## Setup

1. Install DFINITY SDK using the following command:
```bash
  DFX_VERSION=0.22.0 sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

2. Add DFINITY to your PATH variables by appending the following line to your `.bashrc`:
```bash
  echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
```

3. Start the DFINITY local environment in the background:
```bash
  dfx start --background
```

4. Install project dependencies:
```bash
  npm install
```

4. Then run deploy command
```bash
dfx deploy points
```

5. Then call initialize canister method to authorize back-end identity principle.
```bash
dfx canister call points initializeCanister '(principal "<YOUR_PRINCIPLE_HERE>")'
```

## Methods

#### `initializeCanister`
- **Description:** Initializes the canister by registering a new service. Only the controller can call this method.  
- **Parameters:**  
  - `serviceId` (`Principal`) – The unique identifier for the service.  
- **Returns:** The created service entry or an error.

---

#### `addLog`
- **Description:** Adds a new log entry for a user’s action on a specific data item. A unique hash is generated for each log entry.  
- **Parameters:**  
  - `action` (`Text`) – The action performed (e.g., "create," "update," "delete").  
  - `dataId` (`Text`) – The identifier of the data item.  
  - `dataName` (`Text`) – The name of the data item.  
  - `userId` (`Text`) – The identifier of the user performing the action.  
- **Returns:** The created log entry or an error.

---

#### `getLogs`
- **Description:** Retrieves all logs stored in the canister.  
- **Returns:** A list of all log entries or an error.

---

#### `getLogsByAction`
- **Description:** Retrieves logs filtered by a specific action.  
- **Parameters:** `action` (`Text`) – The action to filter logs by.  
- **Returns:** A list of log entries matching the action or an error.

---

#### `getLogsByUser`
- **Description:** Retrieves logs associated with a specific user.  
- **Parameters:** `userId` (`Text`) – The identifier of the user.  
- **Returns:** A list of log entries for the user or an error.

---

#### `getLogsByDataId`
- **Description:** Retrieves logs related to a specific data item.  
- **Parameters:** `dataId` (`Text`) – The identifier of the data item.  
- **Returns:** A list of log entries for the data item or an error.

---

#### `getLogsByUserAndDataId`
- **Description:** Retrieves logs for a specific user and data.  
- **Parameters:**  
  - `userId` (`Text`) – The identifier of the user.  
  - `dataId` (`Text`) – The identifier of the data item.  
- **Returns:** A list of log entries for the user and data item or an error.

---

#### `getLogsByDataIdAndAction`
- **Description:** Retrieves logs filtered by both a specific data item and an action.  
- **Parameters:**  
  - `dataId` (`Text`) – The identifier of the data item.  
  - `action` (`Text`) – The action to filter logs by.  
- **Returns:** A list of log entries matching the data item and action or an error.

---

#### `verifyLog`
- **Description:** Verifies the integrity of a log by comparing the computed hash of the input data against stored logs.  
- **Parameters:**  
  - `userId` (`Text`) – The identifier of the user.  
  - `dataId` (`Text`) – The identifier of the data item.  
  - `action` (`Text`) – The action performed.  
- **Returns:** A boolean indicating whether the log is valid or an error.

---

#### `authorizeCaller` (Private)
- **Description:** Ensures that the caller is authorized to perform actions on the canister.  
- **Throws:** An `Unauthorized` error if the caller is not authorized.