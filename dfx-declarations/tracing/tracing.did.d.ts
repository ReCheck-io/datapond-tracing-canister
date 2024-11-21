import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'addLog' : ActorMethod<
    [string, string, string, string],
    {
        'Ok' : {
          'id' : Principal,
          'action' : string,
          'dataId' : string,
          'userId' : string,
          'createdAt' : bigint,
          'compositeHash' : string,
          'dataName' : string,
          'serviceId' : Principal,
        }
      } |
      {
        'Err' : { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'Unauthorized' : string } |
          { 'Conflict' : string }
      }
  >,
  'getLogs' : ActorMethod<
    [],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'action' : string,
            'dataId' : string,
            'userId' : string,
            'createdAt' : bigint,
            'compositeHash' : string,
            'dataName' : string,
            'serviceId' : Principal,
          }
        >
      } |
      {
        'Err' : { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'Unauthorized' : string } |
          { 'Conflict' : string }
      }
  >,
  'getLogsByAction' : ActorMethod<
    [string],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'action' : string,
            'dataId' : string,
            'userId' : string,
            'createdAt' : bigint,
            'compositeHash' : string,
            'dataName' : string,
            'serviceId' : Principal,
          }
        >
      } |
      {
        'Err' : { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'Unauthorized' : string } |
          { 'Conflict' : string }
      }
  >,
  'getLogsByDataId' : ActorMethod<
    [string],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'action' : string,
            'dataId' : string,
            'userId' : string,
            'createdAt' : bigint,
            'compositeHash' : string,
            'dataName' : string,
            'serviceId' : Principal,
          }
        >
      } |
      {
        'Err' : { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'Unauthorized' : string } |
          { 'Conflict' : string }
      }
  >,
  'getLogsByDataIdAndAction' : ActorMethod<
    [string, string],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'action' : string,
            'dataId' : string,
            'userId' : string,
            'createdAt' : bigint,
            'compositeHash' : string,
            'dataName' : string,
            'serviceId' : Principal,
          }
        >
      } |
      {
        'Err' : { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'Unauthorized' : string } |
          { 'Conflict' : string }
      }
  >,
  'getLogsByUser' : ActorMethod<
    [string],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'action' : string,
            'dataId' : string,
            'userId' : string,
            'createdAt' : bigint,
            'compositeHash' : string,
            'dataName' : string,
            'serviceId' : Principal,
          }
        >
      } |
      {
        'Err' : { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'Unauthorized' : string } |
          { 'Conflict' : string }
      }
  >,
  'getLogsByUserAndFile' : ActorMethod<
    [string, string],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'action' : string,
            'dataId' : string,
            'userId' : string,
            'createdAt' : bigint,
            'compositeHash' : string,
            'dataName' : string,
            'serviceId' : Principal,
          }
        >
      } |
      {
        'Err' : { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'Unauthorized' : string } |
          { 'Conflict' : string }
      }
  >,
  'initializeCanister' : ActorMethod<
    [Principal],
    { 'Ok' : { 'id' : Principal, 'createdAt' : bigint } } |
      {
        'Err' : { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'Unauthorized' : string } |
          { 'Conflict' : string }
      }
  >,
  'verifyLog' : ActorMethod<
    [string, string, string],
    { 'Ok' : boolean } |
      {
        'Err' : { 'InvalidPayload' : string } |
          { 'NotFound' : string } |
          { 'Unauthorized' : string } |
          { 'Conflict' : string }
      }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
