import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'addAuthorizedUser' : ActorMethod<[Principal], undefined>,
  'addLog' : ActorMethod<
    [string, string, string],
    {
        'Ok' : {
          'id' : Principal,
          'organizationId' : string,
          'action' : string,
          'createdAt' : bigint,
          'user' : Principal,
          'dataName' : string,
        }
      } |
      { 'Err' : string }
  >,
  'getLogs' : ActorMethod<
    [],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'organizationId' : string,
            'action' : string,
            'createdAt' : bigint,
            'user' : Principal,
            'dataName' : string,
          }
        >
      } |
      { 'Err' : string }
  >,
  'getLogsByAction' : ActorMethod<
    [string],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'organizationId' : string,
            'action' : string,
            'createdAt' : bigint,
            'user' : Principal,
            'dataName' : string,
          }
        >
      } |
      { 'Err' : string }
  >,
  'getUsersLogs' : ActorMethod<
    [Principal],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'organizationId' : string,
            'action' : string,
            'createdAt' : bigint,
            'user' : Principal,
            'dataName' : string,
          }
        >
      } |
      { 'Err' : string }
  >,
}
