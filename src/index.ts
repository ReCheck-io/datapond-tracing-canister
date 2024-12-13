import {
  IDL,
  Principal,
  query,
  update,
  StableBTreeMap,
  time,
  caller,
  isController,
} from "azle";
import { keccak256 } from "js-sha3";

import { generateId, handleError, validateAction } from "./utils";
import {
  Service,
  Log,
  LogResult,
  LogResultArray,
  ServiceResult,
  LogIntegrityResult,
} from "./types";

export default class TracingCanister {
  serviceStorage = StableBTreeMap<Principal, Service>(0);
  logStorage = StableBTreeMap<Principal, Log>(1);

  @update([IDL.Principal], ServiceResult)
  initializeCanister(serviceId: Principal): ServiceResult {
    try {
      if (!isController(caller())) {
        throw { Unauthorized: "Unauthorized access!" };
      }

      if (this.serviceStorage.containsKey(serviceId)) {
        throw { Conflict: "User already exists!" };
      }

      const newService: Service = {
        id: serviceId,
        createdAt: time(),
      };

      this.serviceStorage.insert(serviceId, newService);
      return { Ok: newService };
    } catch (error) {
      return { Err: handleError(error) };
    }
  }

  @update([IDL.Text, IDL.Text, IDL.Text, IDL.Text], LogResult)
  addLog(
    action: string,
    dataId: string,
    dataName: string,
    userId: string,
  ): LogResult {
    try {
      this.authorizeCaller();
      validateAction(action);

      const compositeHash = keccak256(userId + dataId + action);

      const log: Log = {
        id: generateId(),
        userId,
        dataId,
        dataName,
        compositeHash,
        action: action.toLowerCase(),
        serviceId: caller(),
        createdAt: time(),
      };

      this.logStorage.insert(log.id, log);
      return { Ok: log };
    } catch (error) {
      return { Err: handleError(error) };
    }
  }

  @query([], LogResultArray)
  getLogs(): LogResultArray {
    try {
      this.authorizeCaller();
      return { Ok: this.logStorage.values() };
    } catch (error) {
      return { Err: handleError(error) };
    }
  }

  @query([IDL.Text], LogResultArray)
  getLogsByAction(action: string): LogResultArray {
    try {
      this.authorizeCaller();
      validateAction(action);

      const logs = this.logStorage.values();
      const filteredLogs = logs.filter(
        (x) => x.action.toLowerCase() === action.toLowerCase(),
      );

      return { Ok: filteredLogs };
    } catch (error) {
      return { Err: handleError(error) };
    }
  }

  @query([IDL.Text], LogResultArray)
  getLogsByUser(userId: string): LogResultArray {
    try {
      this.authorizeCaller();

      const logs = this.logStorage.values();
      const userLogs = logs.filter((log) => log.userId === userId);

      return { Ok: userLogs };
    } catch (error) {
      return { Err: handleError(error) };
    }
  }

  @query([IDL.Text], LogResultArray)
  getLogsByDataId(dataId: string): LogResultArray {
    try {
      this.authorizeCaller();

      const logs = this.logStorage.values();
      const logsForDataId = logs.filter((x) => x.dataId === dataId);

      return { Ok: logsForDataId };
    } catch (error) {
      return { Err: handleError(error) };
    }
  }

  @query([IDL.Text, IDL.Text], LogResultArray)
  getLogsByUserAndDataId(userId: string, dataId: string): LogResultArray {
    try {
      this.authorizeCaller();

      const logs = this.logStorage.values();
      const filteredLogs = logs.filter(
        (log) => log.userId === userId && log.dataId === dataId,
      );

      return { Ok: filteredLogs };
    } catch (error) {
      return { Err: handleError(error) };
    }
  }

  @query([IDL.Text, IDL.Text], LogResultArray)
  getLogsByDataIdAndAction(dataId: string, action: string): LogResultArray {
    try {
      this.authorizeCaller();
      validateAction(action);

      const logs = this.logStorage.values();
      const filteredLogs = logs.filter(
        (x) =>
          x.dataId === dataId &&
          x.action.toLowerCase() === action.toLowerCase(),
      );

      return { Ok: filteredLogs };
    } catch (error) {
      return { Err: handleError(error) };
    }
  }

  // Verify methods

  @query([IDL.Text, IDL.Text, IDL.Text], LogIntegrityResult)
  verifyLog(
    userId: string,
    dataId: string,
    action: string,
  ): LogIntegrityResult {
    try {
      this.authorizeCaller();
      validateAction(action);

      const computedHash = keccak256(userId + dataId + action);

      const logs = this.logStorage.values();
      const matchingLog = logs.find(
        (log) => log.compositeHash === computedHash,
      );

      if (!matchingLog) {
        throw { NotFound: "No log found with the given hash." };
      }

      const isValid =
        matchingLog.userId === userId &&
        matchingLog.dataId === dataId &&
        matchingLog.action.toLowerCase() === action.toLowerCase();

      return { Ok: isValid };
    } catch (error) {
      return { Err: handleError(error) };
    }
  }

  private authorizeCaller(): void {
    if (!this.serviceStorage.containsKey(caller())) {
      throw { Unauthorized: "Unauthorized access!" };
    }
  }
}
