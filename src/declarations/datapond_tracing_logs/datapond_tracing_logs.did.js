export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addAuthorizedUser' : IDL.Func([IDL.Principal], [], []),
    'addLog' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Principal,
              'organizationId' : IDL.Text,
              'action' : IDL.Text,
              'createdAt' : IDL.Nat64,
              'user' : IDL.Principal,
              'dataName' : IDL.Text,
            }),
            'Err' : IDL.Text,
          }),
        ],
        [],
      ),
    'getLogs' : IDL.Func(
        [],
        [
          IDL.Variant({
            'Ok' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'organizationId' : IDL.Text,
                'action' : IDL.Text,
                'createdAt' : IDL.Nat64,
                'user' : IDL.Principal,
                'dataName' : IDL.Text,
              })
            ),
            'Err' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'getLogsByAction' : IDL.Func(
        [IDL.Text],
        [
          IDL.Variant({
            'Ok' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'organizationId' : IDL.Text,
                'action' : IDL.Text,
                'createdAt' : IDL.Nat64,
                'user' : IDL.Principal,
                'dataName' : IDL.Text,
              })
            ),
            'Err' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'getUsersLogs' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Variant({
            'Ok' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'organizationId' : IDL.Text,
                'action' : IDL.Text,
                'createdAt' : IDL.Nat64,
                'user' : IDL.Principal,
                'dataName' : IDL.Text,
              })
            ),
            'Err' : IDL.Text,
          }),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
