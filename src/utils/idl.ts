export type SocialIDL = {
  version: '0.1.0'
  name: 'spling'
  instructions: [
    {
      name: 'setupStats'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'stats'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'createUserid'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'stats'
          isMut: true
          isSigner: false
        },
        {
          name: 'userId'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'createUserProfile'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'userId'
          isMut: true
          isSigner: false
        },
        {
          name: 'userProfile'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'shdw'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'deleteUserId'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'userId'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'creategroupid'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'stats'
          isMut: true
          isSigner: false
        },
        {
          name: 'groupId'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'deleteGroupId'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'groupId'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: 'createGroupProfile'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'groupId'
          isMut: true
          isSigner: false
        },
        {
          name: 'groupProfile'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'shdw'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'joinGroup'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'userId'
          isMut: true
          isSigner: false
        },
        {
          name: 'userProfile'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'address'
          type: 'u32'
        },
      ]
    },
    {
      name: 'followUser'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'userId'
          isMut: true
          isSigner: false
        },
        {
          name: 'userProfile'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'address'
          type: 'u32'
        },
      ]
    },
    {
      name: 'submitPost'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'userId'
          isMut: false
          isSigner: false
        },
        {
          name: 'post'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'groupId'
          type: 'u32'
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'Post'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'ts'
            type: 'i64'
          },
          {
            name: 'uid'
            type: 'u32'
          },
          {
            name: 'gid'
            type: 'u32'
          },
          {
            name: 'st'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'Stats'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'users'
            type: 'u32'
          },
          {
            name: 'groups'
            type: 'u32'
          },
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'UserId'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'user'
            type: 'publicKey'
          },
          {
            name: 'uid'
            type: 'u32'
          },
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'UserProfile'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'ts'
            type: 'i64'
          },
          {
            name: 'user'
            type: 'publicKey'
          },
          {
            name: 'uid'
            type: 'u32'
          },
          {
            name: 'st'
            type: 'u8'
          },
          {
            name: 'shdw'
            type: 'publicKey'
          },
          {
            name: 'groups'
            type: {
              vec: 'u32'
            }
          },
          {
            name: 'following'
            type: {
              vec: 'u32'
            }
          },
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'GroupId'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'group'
            type: 'publicKey'
          },
          {
            name: 'gid'
            type: 'u32'
          },
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'GroupProfile'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'ts'
            type: 'i64'
          },
          {
            name: 'group'
            type: 'publicKey'
          },
          {
            name: 'gid'
            type: 'u32'
          },
          {
            name: 'st'
            type: 'u8'
          },
          {
            name: 'shdw'
            type: 'publicKey'
          },
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
  ]
  metadata: {
    address: '28fAzkcpA8pgTT8AtJGkWqSRkU8yznhBdEZBCxqRhHR9'
  }
}

export const IDL: SocialIDL = {
  version: '0.1.0',
  name: 'spling',
  instructions: [
    {
      name: 'setupStats',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'stats',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createUserid',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'stats',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userId',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createUserProfile',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userId',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'shdw',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'deleteUserId',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userId',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'creategroupid',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'stats',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'groupId',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'deleteGroupId',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'groupId',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createGroupProfile',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'groupId',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'groupProfile',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'shdw',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'joinGroup',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userId',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'address',
          type: 'u32',
        },
      ],
    },
    {
      name: 'followUser',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userId',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'address',
          type: 'u32',
        },
      ],
    },
    {
      name: 'submitPost',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'userId',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'post',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'groupId',
          type: 'u32',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'Post',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'ts',
            type: 'i64',
          },
          {
            name: 'uid',
            type: 'u32',
          },
          {
            name: 'gid',
            type: 'u32',
          },
          {
            name: 'st',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Stats',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'users',
            type: 'u32',
          },
          {
            name: 'groups',
            type: 'u32',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'UserId',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'publicKey',
          },
          {
            name: 'uid',
            type: 'u32',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'UserProfile',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'ts',
            type: 'i64',
          },
          {
            name: 'user',
            type: 'publicKey',
          },
          {
            name: 'uid',
            type: 'u32',
          },
          {
            name: 'st',
            type: 'u8',
          },
          {
            name: 'shdw',
            type: 'publicKey',
          },
          {
            name: 'groups',
            type: {
              vec: 'u32',
            },
          },
          {
            name: 'following',
            type: {
              vec: 'u32',
            },
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'GroupId',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'group',
            type: 'publicKey',
          },
          {
            name: 'gid',
            type: 'u32',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'GroupProfile',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'ts',
            type: 'i64',
          },
          {
            name: 'group',
            type: 'publicKey',
          },
          {
            name: 'gid',
            type: 'u32',
          },
          {
            name: 'st',
            type: 'u8',
          },
          {
            name: 'shdw',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  metadata: {
    address: '28fAzkcpA8pgTT8AtJGkWqSRkU8yznhBdEZBCxqRhHR9',
  },
}
