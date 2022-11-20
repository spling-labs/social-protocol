export type SocialIDL = {
  version: '0.1.0'
  name: 'spling'
  instructions: [
    {
      name: 'setupSpling'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
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
          name: 'spling'
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
      name: 'createGroupProfile'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
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
          name: 'spling'
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
      name: 'leaveGroup'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
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
          name: 'spling'
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
      name: 'unfollowUser'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
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
          name: 'spling'
          isMut: true
          isSigner: false
        },
        {
          name: 'userProfile'
          isMut: false
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
          name: 'groupId'
          type: 'u32'
        },
        {
          name: 'shdw'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'submitPostWithLikes'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
          isMut: true
          isSigner: false
        },
        {
          name: 'userProfile'
          isMut: false
          isSigner: false
        },
        {
          name: 'post'
          isMut: true
          isSigner: false
        },
        {
          name: 'likes'
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
          name: 'groupId'
          type: 'u32'
        },
        {
          name: 'shdw'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'likePost'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
          isMut: true
          isSigner: false
        },
        {
          name: 'userProfile'
          isMut: false
          isSigner: false
        },
        {
          name: 'post'
          isMut: false
          isSigner: false
        },
        {
          name: 'likes'
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
      name: 'submitReply'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
          isMut: true
          isSigner: false
        },
        {
          name: 'userProfile'
          isMut: false
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
      args: [
        {
          name: 'postId'
          type: 'u32'
        },
        {
          name: 'shdw'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'deletePost'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
          isMut: true
          isSigner: false
        },
        {
          name: 'userProfile'
          isMut: false
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
          name: 'groupId'
          type: 'u32'
        },
        {
          name: 'shdw'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'deleteReply'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
          isMut: true
          isSigner: false
        },
        {
          name: 'userProfile'
          isMut: false
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
      args: [
        {
          name: 'postId'
          type: 'u32'
        },
        {
          name: 'shdw'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'deleteUserProfile'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
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
          name: 'userId'
          type: 'u32'
        },
        {
          name: 'shdw'
          type: 'publicKey'
        },
      ]
    },
    {
      name: 'deleteGroupProfile'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
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
      name: 'createBank'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
          isMut: true
          isSigner: false
        },
        {
          name: 'bank'
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
      name: 'resetBank'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
          isMut: true
          isSigner: false
        },
        {
          name: 'bank'
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
      name: 'extractBank'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: true
        },
        {
          name: 'spling'
          isMut: true
          isSigner: false
        },
        {
          name: 'bank'
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
            name: 'pid'
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
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'Tip'
      type: {
        kind: 'struct'
        fields: [
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
      name: 'Likes'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'counter'
            type: 'u16'
          },
          {
            name: 'users'
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
      name: 'Reply'
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
            name: 'pid'
            type: 'u32'
          },
          {
            name: 'st'
            type: 'u8'
          },
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'Spling'
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
            name: 'posts'
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
      name: 'Bank'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'size'
            type: 'u16'
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
    address: '2CfHWikwHGSAb4mudPdnWEbf5CQwXbod1d9bN9pL34gs'
  }
}

export const IDL: SocialIDL = {
  version: '0.1.0',
  name: 'spling',
  instructions: [
    {
      name: 'setupSpling',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
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
          name: 'spling',
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
      name: 'createGroupProfile',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
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
          name: 'spling',
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
      name: 'leaveGroup',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
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
          name: 'spling',
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
      name: 'unfollowUser',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
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
          name: 'spling',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: false,
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
          name: 'groupId',
          type: 'u32',
        },
        {
          name: 'shdw',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'submitPostWithLikes',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'post',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'likes',
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
          name: 'groupId',
          type: 'u32',
        },
        {
          name: 'shdw',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'likePost',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'post',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'likes',
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
      name: 'submitReply',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: false,
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
      args: [
        {
          name: 'postId',
          type: 'u32',
        },
        {
          name: 'shdw',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'deletePost',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: false,
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
          name: 'groupId',
          type: 'u32',
        },
        {
          name: 'shdw',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'deleteReply',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userProfile',
          isMut: false,
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
      args: [
        {
          name: 'postId',
          type: 'u32',
        },
        {
          name: 'shdw',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'deleteUserProfile',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
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
          name: 'userId',
          type: 'u32',
        },
        {
          name: 'shdw',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'deleteGroupProfile',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
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
      name: 'createBank',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'bank',
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
      name: 'resetBank',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'bank',
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
      name: 'extractBank',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'spling',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'bank',
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
            name: 'pid',
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
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Tip',
      type: {
        kind: 'struct',
        fields: [
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
      name: 'Likes',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'counter',
            type: 'u16',
          },
          {
            name: 'users',
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
      name: 'Reply',
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
            name: 'pid',
            type: 'u32',
          },
          {
            name: 'st',
            type: 'u8',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'Spling',
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
            name: 'posts',
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
      name: 'Bank',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'size',
            type: 'u16',
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
    address: '2CfHWikwHGSAb4mudPdnWEbf5CQwXbod1d9bN9pL34gs',
  },
}
