export type SocialIDL = {
  'version': '0.1.0',
  'name': 'socialprotocol',
  'instructions': [
    {
      'name': 'setupSpling',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'setupTags',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tags',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'createUserProfile',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'createGroupProfile',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'groupProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'joinGroup',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'address',
          'type': 'u32'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'leaveGroup',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'address',
          'type': 'u32'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'followUser',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'address',
          'type': 'u32'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'unfollowUser',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'address',
          'type': 'u32'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'submitPost',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'post',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tags',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'likes',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'groupId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'tagName',
          'type': 'string'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'submitTemporaryPost',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'post',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tags',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'likes',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'groupId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'tagName',
          'type': 'string'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'likePost',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'post',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'likes',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'submitReply',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'reply',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'postId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'deletePost',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'post',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'groupId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'deleteReply',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'reply',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'postId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'deleteUserProfile',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'userId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'deleteGroupProfile',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'groupProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'createBank',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'bank',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'createB',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'resetBank',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'bank',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'extractBank',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'Post',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'ts',
            'type': 'i64'
          },
          {
            'name': 'uid',
            'type': 'u32'
          },
          {
            'name': 'pid',
            'type': 'u32'
          },
          {
            'name': 'gid',
            'type': 'u32'
          },
          {
            'name': 'tid',
            'type': 'u16'
          },
          {
            'name': 'st',
            'type': 'u8'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Tags',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'taglist',
            'type': {
              'vec': 'string'
            }
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Tip',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'uid',
            'type': 'u32'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Likes',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'counter',
            'type': 'u16'
          },
          {
            'name': 'users',
            'type': {
              'vec': 'u32'
            }
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Reply',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'ts',
            'type': 'i64'
          },
          {
            'name': 'uid',
            'type': 'u32'
          },
          {
            'name': 'pid',
            'type': 'u32'
          },
          {
            'name': 'st',
            'type': 'u8'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Spling',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'users',
            'type': 'u32'
          },
          {
            'name': 'groups',
            'type': 'u32'
          },
          {
            'name': 'posts',
            'type': 'u32'
          },
          {
            'name': 'tags',
            'type': 'u16'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Bank',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'size',
            'type': 'u16'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'B',
      'type': {
        'kind': 'struct',
        'fields': []
      }
    },
    {
      'name': 'UserProfile',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'ts',
            'type': 'i64'
          },
          {
            'name': 'user',
            'type': 'publicKey'
          },
          {
            'name': 'uid',
            'type': 'u32'
          },
          {
            'name': 'st',
            'type': 'u8'
          },
          {
            'name': 'shdw',
            'type': 'publicKey'
          },
          {
            'name': 'groups',
            'type': {
              'vec': 'u32'
            }
          },
          {
            'name': 'following',
            'type': {
              'vec': 'u32'
            }
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'GroupProfile',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'ts',
            'type': 'i64'
          },
          {
            'name': 'group',
            'type': 'publicKey'
          },
          {
            'name': 'gid',
            'type': 'u32'
          },
          {
            'name': 'st',
            'type': 'u8'
          },
          {
            'name': 'shdw',
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'metadata': {
    'address': 'D2mvyNuzAKFAsfmwgZpt6hCL45LJQw1Y965z6dnV15hZ'
  }
}

export const IDL: SocialIDL = {
  'version': '0.1.0',
  'name': 'socialprotocol',
  'instructions': [
    {
      'name': 'setupSpling',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'setupTags',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tags',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'createUserProfile',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'createGroupProfile',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'groupProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'joinGroup',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'address',
          'type': 'u32'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'leaveGroup',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'address',
          'type': 'u32'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'followUser',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'address',
          'type': 'u32'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'unfollowUser',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'address',
          'type': 'u32'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'submitPost',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'post',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tags',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'likes',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'groupId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'tagName',
          'type': 'string'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'submitTemporaryPost',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'post',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'tags',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'likes',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'groupId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'tagName',
          'type': 'string'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'likePost',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'post',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'likes',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'submitReply',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'reply',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'postId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'deletePost',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'post',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'groupId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'deleteReply',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'reply',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'postId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'deleteUserProfile',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'userProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'userId',
          'type': 'u32'
        },
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'deleteGroupProfile',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'groupProfile',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'shdw',
          'type': 'publicKey'
        },
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    },
    {
      'name': 'createBank',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'bank',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'createB',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'resetBank',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'bank',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'extractBank',
      'accounts': [
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'spling',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'b',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiver',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'senderTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'receiverTokenAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'mint',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'tokenProgram',
          'isMut': false,
          'isSigner': false
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': [
        {
          'name': 'amount',
          'type': {
            'option': 'u64'
          }
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'Post',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'ts',
            'type': 'i64'
          },
          {
            'name': 'uid',
            'type': 'u32'
          },
          {
            'name': 'pid',
            'type': 'u32'
          },
          {
            'name': 'gid',
            'type': 'u32'
          },
          {
            'name': 'tid',
            'type': 'u16'
          },
          {
            'name': 'st',
            'type': 'u8'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Tags',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'taglist',
            'type': {
              'vec': 'string'
            }
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Tip',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'uid',
            'type': 'u32'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Likes',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'counter',
            'type': 'u16'
          },
          {
            'name': 'users',
            'type': {
              'vec': 'u32'
            }
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Reply',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'ts',
            'type': 'i64'
          },
          {
            'name': 'uid',
            'type': 'u32'
          },
          {
            'name': 'pid',
            'type': 'u32'
          },
          {
            'name': 'st',
            'type': 'u8'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Spling',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'users',
            'type': 'u32'
          },
          {
            'name': 'groups',
            'type': 'u32'
          },
          {
            'name': 'posts',
            'type': 'u32'
          },
          {
            'name': 'tags',
            'type': 'u16'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'Bank',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'size',
            'type': 'u16'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'B',
      'type': {
        'kind': 'struct',
        'fields': []
      }
    },
    {
      'name': 'UserProfile',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'ts',
            'type': 'i64'
          },
          {
            'name': 'user',
            'type': 'publicKey'
          },
          {
            'name': 'uid',
            'type': 'u32'
          },
          {
            'name': 'st',
            'type': 'u8'
          },
          {
            'name': 'shdw',
            'type': 'publicKey'
          },
          {
            'name': 'groups',
            'type': {
              'vec': 'u32'
            }
          },
          {
            'name': 'following',
            'type': {
              'vec': 'u32'
            }
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    },
    {
      'name': 'GroupProfile',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'ts',
            'type': 'i64'
          },
          {
            'name': 'group',
            'type': 'publicKey'
          },
          {
            'name': 'gid',
            'type': 'u32'
          },
          {
            'name': 'st',
            'type': 'u8'
          },
          {
            'name': 'shdw',
            'type': 'publicKey'
          },
          {
            'name': 'bump',
            'type': 'u8'
          }
        ]
      }
    }
  ],
  'metadata': {
    'address': 'D2mvyNuzAKFAsfmwgZpt6hCL45LJQw1Y965z6dnV15hZ'
  }
}
