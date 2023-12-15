import {
  Canister,
  Err,
  ic,
  nat64,
  Ok,
  Principal,
  query,
  Record,
  Result,
  StableBTreeMap,
  text,
  update,
  Variant,
  Vec,
} from "azle";

import { POSSIBLE_ACTIONS } from "./constants";
import { generateId } from "./utils";

const User = Record({
  id: Principal,
  createdAt: nat64,
});

const LogRecord = Record({
  id: Principal,
  user: Principal,
  action: text,
  metadata: text,
  createdAt: nat64,
});

const Error = Variant({
  NotFound: text,
  Conflict: text,
  Unauthorized: text,
  InvalidPayload: text,
});

const userStorage = StableBTreeMap(Principal, User, 0);
const logStorage = StableBTreeMap(Principal, LogRecord, 1);

export default Canister({
  /**
   * Initializes the canister by adding a new user during deployment.
   * @param userId - The Principal ID of the new user.
   */
  initializeCanister: update([Principal], Result(User, Error), (userId) => {
    if (!ic.caller().compareTo(ic.id())) {
      return Err({ Unauthorized: "Unauthorized access!" });
    }

    if (userStorage.containsKey(userId)) {
      return Err({ Conflict: "User already exists!" });
    }

    const newUser: typeof User = {
      id: userId,
      createdAt: ic.time(),
    };

    userStorage.insert(userId, newUser);

    return Ok(newUser);
  }),

  /**
   * Adds a log entry with the provided details.
   * @param action - The action performed.
   * @param dataName - The name of the data.
   * @param organizationId - The ID of the organization.
   * @returns The log entry.
   */
  addLog: update([text, text], Result(LogRecord, Error), (action, metadata) => {
    if (!userStorage.containsKey(ic.caller())) {
      return Err({ Unauthorized: "Unauthorized access!" });
    }

    // Check if the action is supported
    if (!POSSIBLE_ACTIONS.includes(action.toLowerCase())) {
      return Err({
        InvalidPayload: `'${action}' is not supported, please select one of: ${POSSIBLE_ACTIONS}`,
      });
    }

    const log: typeof LogRecord = {
      id: generateId(),
      user: ic.caller(),
      metadata,
      action: action.toLowerCase(),
      createdAt: ic.time(),
    };

    logStorage.insert(log.id, log);

    return Ok(log);
  }),

  /**
   * Retrieves all logs stored in the canister.
   * @returns A list of log entries.
   */
  getLogs: query([], Result(Vec(LogRecord), Error), () => {
    if (!userStorage.containsKey(ic.caller())) {
      return Err({ Unauthorized: "Unauthorized access!" });
    }

    return Ok(logStorage.values());
  }),

  /**
   * Retrieves logs filtered by a specific action.
   * @param action - The action to filter logs by.
   * @returns A list of log entries matching the specified action.
   */
  getLogsByAction: query([text], Result(Vec(LogRecord), Error), (action) => {
    if (!userStorage.containsKey(ic.caller())) {
      return Err({ Unauthorized: "Unauthorized access!" });
    }

    // Check if the provided action is supported
    if (!POSSIBLE_ACTIONS.includes(action.toLowerCase())) {
      return Err({
        InvalidPayload: `'${action}' is not supported, please select one of: ${POSSIBLE_ACTIONS}`,
      });
    }

    const filteredLogs = logStorage
      .values()
      .filter(
        (x: typeof LogRecord) =>
          x.action.toLowerCase() === action.toLowerCase(),
      );

    return Ok(filteredLogs);
  }),

  /**
   * Generates an ID of type Principal using UUID.
   * @returns a Principal ID.
   */
  generateId: query([], Result(Principal, Error), () => {
    if (!userStorage.containsKey(ic.caller())) {
      return Err({ Unauthorized: "Unauthorized access!" });
    }

    return Ok(generateId());
  }),
});
