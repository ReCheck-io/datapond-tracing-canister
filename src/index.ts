import {
  Canister,
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
  Vec,
  Void,
} from "azle";

import { POSSIBLE_ACTIONS } from "./constants";

const User = Record({
  id: Principal,
  name: text,
  createdAt: nat64,
});

const LogRecord = Record({
  id: Principal,
  user: Principal,

  action: text,
  dataName: text,
  organizationId: text,

  createdAt: nat64,
});

const userStorage = StableBTreeMap(Principal, User, 0);
const logStorage = StableBTreeMap(Principal, LogRecord, 1);

export default Canister({
  addAuthorizedUser: update([Principal], Void, (newPrincipal) => {
    // Check if the caller is an authorized principal
    // If so, add newPrincipal to the list of authorized principals
    // Otherwise, reject the call
  }),

  addLog: update(
    [text, text, text],
    Result(LogRecord, text),
    (action, dataName, organizationId) => {
      if (!isUserHasAccess()) {
        throw new Error("You do not have access!");
      }
      if (!POSSIBLE_ACTIONS.includes(action.toLowerCase())) {
        throw new Error(
          `'${action}' is not supported, please select one of: ${POSSIBLE_ACTIONS}`,
        );
      }

      const id = generateId();
      const log: typeof LogRecord = {
        id,
        user: ic.caller(),

        dataName,
        organizationId,
        action: action.toLowerCase(),

        createdAt: ic.time(),
      };

      logStorage.insert(log.id, log);

      return Ok(log);
    },
  ),

  getLogs: query([], Result(Vec(LogRecord), text), () => {
    if (!isUserHasAccess()) {
      throw new Error("You do not have access!");
    }

    return Ok(logStorage.values());
  }),

  getLogsByAction: query([text], Result(Vec(LogRecord), text), (action) => {
    if (!isUserHasAccess()) {
      throw new Error("You do not have access!");
    }
    if (!POSSIBLE_ACTIONS.includes(action.toLowerCase())) {
      throw new Error(
        `'${action}' is not supported, please select one of: ${POSSIBLE_ACTIONS}`,
      );
    }

    return Ok(
      logStorage
        .values()
        .filter(
          (x: typeof LogRecord) =>
            x.action.toLowerCase() === action.toLowerCase(),
        ),
    );
  }),

  getUsersLogs: query([Principal], Result(Vec(LogRecord), text), (id) => {
    if (!isUserHasAccess()) {
      throw new Error("You do not have access!");
    }

    return Ok(
      logStorage.values().filter((x: typeof LogRecord) => x.user === id),
    );
  }),
});

/**
 * Generate an ID of a type Principal.
 * @returns a Principal ID.
 */
function generateId(): Principal {
  const randomBytes = new Array(29)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256));

  return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

function isUserHasAccess(): boolean {
  return userStorage.values().find((x: typeof User) => x.id === ic.caller());
}
