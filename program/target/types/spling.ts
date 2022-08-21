export type Spling = {
  "version": "0.1.0",
  "name": "spling",
  "instructions": [
    {
      "name": "setupSpling",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createUserProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createGroupProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "groupProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "joinGroup",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "u32"
        }
      ]
    },
    {
      "name": "leaveGroup",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "u32"
        }
      ]
    },
    {
      "name": "followUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "u32"
        }
      ]
    },
    {
      "name": "unfollowUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "u32"
        }
      ]
    },
    {
      "name": "submitPost",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "groupId",
          "type": "u32"
        },
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "deletePost",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "groupId",
          "type": "u32"
        },
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "deleteGroupProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "groupProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "deleteUserProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "userId",
          "type": "u32"
        },
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "post",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ts",
            "type": "i64"
          },
          {
            "name": "uid",
            "type": "u32"
          },
          {
            "name": "gid",
            "type": "u32"
          },
          {
            "name": "st",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "spling",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "users",
            "type": "u32"
          },
          {
            "name": "groups",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userId",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "uid",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ts",
            "type": "i64"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "uid",
            "type": "u32"
          },
          {
            "name": "st",
            "type": "u8"
          },
          {
            "name": "shdw",
            "type": "publicKey"
          },
          {
            "name": "groups",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "following",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "groupId",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "group",
            "type": "publicKey"
          },
          {
            "name": "gid",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "groupProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ts",
            "type": "i64"
          },
          {
            "name": "group",
            "type": "publicKey"
          },
          {
            "name": "gid",
            "type": "u32"
          },
          {
            "name": "st",
            "type": "u8"
          },
          {
            "name": "shdw",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: Spling = {
  "version": "0.1.0",
  "name": "spling",
  "instructions": [
    {
      "name": "setupSpling",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createUserProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createGroupProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "groupProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "joinGroup",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "u32"
        }
      ]
    },
    {
      "name": "leaveGroup",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "u32"
        }
      ]
    },
    {
      "name": "followUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "u32"
        }
      ]
    },
    {
      "name": "unfollowUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "u32"
        }
      ]
    },
    {
      "name": "submitPost",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "groupId",
          "type": "u32"
        },
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "deletePost",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "groupId",
          "type": "u32"
        },
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "deleteGroupProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "groupProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "deleteUserProfile",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "spling",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userProfile",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "userId",
          "type": "u32"
        },
        {
          "name": "shdw",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "post",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ts",
            "type": "i64"
          },
          {
            "name": "uid",
            "type": "u32"
          },
          {
            "name": "gid",
            "type": "u32"
          },
          {
            "name": "st",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "spling",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "users",
            "type": "u32"
          },
          {
            "name": "groups",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userId",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "uid",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ts",
            "type": "i64"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "uid",
            "type": "u32"
          },
          {
            "name": "st",
            "type": "u8"
          },
          {
            "name": "shdw",
            "type": "publicKey"
          },
          {
            "name": "groups",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "following",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "groupId",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "group",
            "type": "publicKey"
          },
          {
            "name": "gid",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "groupProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ts",
            "type": "i64"
          },
          {
            "name": "group",
            "type": "publicKey"
          },
          {
            "name": "gid",
            "type": "u32"
          },
          {
            "name": "st",
            "type": "u8"
          },
          {
            "name": "shdw",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
