export type SocialIDL = {
  version: '0.1.0'
  name: 'social_protocol'
  instructions: [
    {
      name: 'submitProfile'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'profile'
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
        {
          name: 'hash'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'updateProfile'
      accounts: [
        {
          name: 'user'
          isMut: false
          isSigner: true
        },
        {
          name: 'profile'
          isMut: true
          isSigner: false
        },
      ]
      args: [
        {
          name: 'hash'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'deleteProfile'
      accounts: [
        {
          name: 'profile'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: false
          isSigner: true
        },
      ]
      args: []
    },
    {
      name: 'submitGroup'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'group'
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
          name: 'shdw'
          type: 'publicKey'
        },
        {
          name: 'hash'
          type: 'publicKey'
        },
        {
          name: 'typ'
          type: 'u8'
        },
      ]
    },
    {
      name: 'updateGroup'
      accounts: [
        {
          name: 'user'
          isMut: false
          isSigner: true
        },
        {
          name: 'group'
          isMut: true
          isSigner: false
        },
      ]
      args: [
        {
          name: 'hash'
          type: 'publicKey'
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
          name: 'group'
          isMut: true
          isSigner: false
        },
        {
          name: 'post'
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
          name: 'parent'
          type: 'publicKey'
        },
        {
          name: 'hash'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'incrementGroupIndex'
      accounts: [
        {
          name: 'group'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: false
          isSigner: true
        },
      ]
      args: []
    },
    {
      name: 'incrementPostIndex'
      accounts: [
        {
          name: 'post'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: false
          isSigner: true
        },
      ]
      args: []
    },
    {
      name: 'submitReply'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'post'
          isMut: true
          isSigner: false
        },
        {
          name: 'reply'
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
      name: 'updatePost'
      accounts: [
        {
          name: 'user'
          isMut: false
          isSigner: true
        },
        {
          name: 'group'
          isMut: false
          isSigner: false
        },
        {
          name: 'post'
          isMut: true
          isSigner: false
        },
      ]
      args: [
        {
          name: 'hash'
          type: 'publicKey'
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'Profile'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'user'
            type: 'publicKey'
          },
          {
            name: 'shdw'
            type: 'publicKey'
          },
          {
            name: 'hash'
            type: 'publicKey'
          },
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'Group'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'user'
            type: 'publicKey'
          },
          {
            name: 'shdw'
            type: 'publicKey'
          },
          {
            name: 'indexPost'
            type: 'u32'
          },
          {
            name: 'hash'
            type: 'publicKey'
          },
          {
            name: 'typ'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'Post'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'user'
            type: 'publicKey'
          },
          {
            name: 'indexReply'
            type: 'u32'
          },
          {
            name: 'hash'
            type: 'publicKey'
          },
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'Reply'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'user'
            type: 'publicKey'
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
    address: '8eAoUBuospHHkz8CuVPSzTBenjadL5SS4GHeEDkBvAjp'
  }
}

export const IDL: SocialIDL = {
  version: '0.1.0',
  name: 'social_protocol',
  instructions: [
    {
      name: 'submitProfile',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'profile',
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
        {
          name: 'hash',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'updateProfile',
      accounts: [
        {
          name: 'user',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'profile',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'hash',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'deleteProfile',
      accounts: [
        {
          name: 'profile',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: 'submitGroup',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'group',
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
          name: 'shdw',
          type: 'publicKey',
        },
        {
          name: 'hash',
          type: 'publicKey',
        },
        {
          name: 'typ',
          type: 'u8',
        },
      ],
    },
    {
      name: 'updateGroup',
      accounts: [
        {
          name: 'user',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'group',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'hash',
          type: 'publicKey',
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
          name: 'group',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'post',
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
          name: 'parent',
          type: 'publicKey',
        },
        {
          name: 'hash',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'incrementGroupIndex',
      accounts: [
        {
          name: 'group',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: 'incrementPostIndex',
      accounts: [
        {
          name: 'post',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: 'submitReply',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'post',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reply',
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
      name: 'updatePost',
      accounts: [
        {
          name: 'user',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'group',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'post',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'hash',
          type: 'publicKey',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'Profile',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'publicKey',
          },
          {
            name: 'shdw',
            type: 'publicKey',
          },
          {
            name: 'hash',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Group',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'publicKey',
          },
          {
            name: 'shdw',
            type: 'publicKey',
          },
          {
            name: 'indexPost',
            type: 'u32',
          },
          {
            name: 'hash',
            type: 'publicKey',
          },
          {
            name: 'typ',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Post',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'publicKey',
          },
          {
            name: 'indexReply',
            type: 'u32',
          },
          {
            name: 'hash',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Reply',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'publicKey',
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
    address: '8eAoUBuospHHkz8CuVPSzTBenjadL5SS4GHeEDkBvAjp',
  },
}
