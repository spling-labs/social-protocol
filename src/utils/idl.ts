export type SocialProtocol = {
  version: "0.1.0";
  name: "social_protocol";
  instructions: [
    {
      name: "submitItem";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "item";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "shdw";
          type: "publicKey";
        },
        {
          name: "hash";
          type: "publicKey";
        },
        {
          name: "typ";
          type: "u8";
        }
      ];
    },
    {
      name: "updateItem";
      accounts: [
        {
          name: "user";
          isMut: false;
          isSigner: true;
        },
        {
          name: "item";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "hash";
          type: "publicKey";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "Item";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "publicKey";
          },
          {
            name: "shdw";
            type: "publicKey";
          },
          {
            name: "index";
            type: "u32";
          },
          {
            name: "hash";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "typ";
            type: "u8";
          }
        ];
      };
    }
  ];
  metadata: {
    address: "8eAoUBuospHHkz8CuVPSzTBenjadL5SS4GHeEDkBvAjp";
  };
};

export const IDL: SocialProtocol = {
  version: "0.1.0",
  name: "social_protocol",
  instructions: [
    {
      name: "submitItem",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "item",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "shdw",
          type: "publicKey",
        },
        {
          name: "hash",
          type: "publicKey",
        },
        {
          name: "typ",
          type: "u8",
        },
      ],
    },
    {
      name: "updateItem",
      accounts: [
        {
          name: "user",
          isMut: false,
          isSigner: true,
        },
        {
          name: "item",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "hash",
          type: "publicKey",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Item",
      type: {
        kind: "struct",
        fields: [
          {
            name: "user",
            type: "publicKey",
          },
          {
            name: "shdw",
            type: "publicKey",
          },
          {
            name: "index",
            type: "u32",
          },
          {
            name: "hash",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "typ",
            type: "u8",
          },
        ],
      },
    },
  ],
  metadata: {
    address: "8eAoUBuospHHkz8CuVPSzTBenjadL5SS4GHeEDkBvAjp",
  },
};
