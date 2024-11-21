import { IDL, Principal } from "azle";

// Define Record and Variant types using TypeScript types
export const Service = IDL.Record({
  id: IDL.Principal,
  createdAt: IDL.Nat64,
});
export type Service = {
  id: Principal;
  createdAt: bigint;
};

export const Log = IDL.Record({
  id: IDL.Principal,
  serviceId: IDL.Principal,
  action: IDL.Text,
  dataId: IDL.Text,
  dataName: IDL.Text,
  userId: IDL.Text,
  compositeHash: IDL.Text,
  createdAt: IDL.Nat64,
});
export type Log = {
  id: Principal;
  serviceId: Principal;
  action: string;
  dataId: string;
  dataName: string;
  userId: string;
  compositeHash: string;
  createdAt: bigint;
};

export const ErrorType = IDL.Variant({
  NotFound: IDL.Text,
  Conflict: IDL.Text,
  Unauthorized: IDL.Text,
  InvalidPayload: IDL.Text,
});
export type ErrorType =
  | { NotFound: string }
  | { Conflict: string }
  | { Unauthorized: string }
  | { InvalidPayload: string };

export const ServiceResult = IDL.Variant({ Ok: Service, Err: ErrorType });
export type ServiceResult = { Ok: Service } | { Err: ErrorType };

export const LogResult = IDL.Variant({ Ok: Log, Err: ErrorType });
export type LogResult = { Ok: Log } | { Err: ErrorType };

export const LogResultArray = IDL.Variant({ Ok: IDL.Vec(Log), Err: ErrorType });
export type LogResultArray = { Ok: Log[] } | { Err: ErrorType };

export const LogIntegrityResult = IDL.Variant({ Ok: IDL.Bool, Err: ErrorType });
export type LogIntegrityResult = { Ok: boolean } | { Err: ErrorType };
