import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Spling } from "../target/types/spling";
import { PublicKey } from '@solana/web3.js'

describe("spling", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Spling as Program<Spling>;


  it("Sets up stats", async () => {
  
    const [StatsPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('stats'),
      ],
      program.programId
    )

      await program.methods
      .setupStats()
      .accounts({
        user: provider.wallet.publicKey,
        stats: StatsPDA,
      })
      .rpc()

      const stats = await program.account.stats.fetch(StatsPDA);
      console.log(stats);

  });


  it("Creates User ID", async () => {
  
    const [UserIDPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_id'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const [StatsPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('stats'),
      ],
      program.programId
    )

      await program.methods
      .createUserid()
      .accounts({
        user: provider.wallet.publicKey,
        stats: StatsPDA,
        userId: UserIDPDA,
      })
      .rpc()

      const user_id = await program.account.userId.fetch(UserIDPDA);
      console.log(user_id);

  });



  it("Creates User Profile", async () => {
  
    const [UserIDPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_id'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const user_id_pda = await program.account.userId.fetch(UserIDPDA);
    const uid = user_id_pda.uid;

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        uid.toString(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .createUserProfile(shdw.publicKey)
      .accounts({
        user: provider.wallet.publicKey,
        userId: UserIDPDA,
        userProfile: UserProfilePDA,
      })
      .rpc()

      const user_id = await program.account.userProfile.fetch(UserProfilePDA);
      console.log(user_id);

  });



  it("Creates Group ID", async () => {
  
    const [GroupIDPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('group_id'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const [StatsPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('stats'),
      ],
      program.programId
    )

      await program.methods
      .creategroupid()
      .accounts({
        user: provider.wallet.publicKey,
        stats: StatsPDA,
        groupId: GroupIDPDA,
      })
      .rpc()

      const group_id = await program.account.groupId.fetch(GroupIDPDA);
      console.log(group_id);

  });


  it("Creates Group Profile", async () => {
  
    const [GroupIDPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('group_id'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const group_id_pda = await program.account.groupId.fetch(GroupIDPDA);
    const gid = group_id_pda.gid;


    const [GroupProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('group_profile'),
        gid.toString(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .createGroupProfile(shdw.publicKey)
      .accounts({
        user: provider.wallet.publicKey,
        groupId: GroupIDPDA,
        groupProfile: GroupProfilePDA,
      })
      .rpc()

      const group_id = await program.account.groupProfile.fetch(GroupProfilePDA);
      console.log(group_id);

  }); 



  it("Submits a post", async () => {

    const [UserIDPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_id'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )
  
    const hash = anchor.web3.Keypair.generate();

      await program.methods
      .submitPost(1)
      .accounts({
        post: hash.publicKey,
        user: provider.wallet.publicKey,
        userId: UserIDPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([hash])
      .rpc()

      const post = await program.account.post.fetch(hash.publicKey);
      console.log(post);

  });


  it("Join a group", async () => {
  
    const [UserIDPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_id'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const user_id_pda = await program.account.userId.fetch(UserIDPDA);
    const uid = user_id_pda.uid;

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        uid.toString(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .joinGroup(33)
      .accounts({
        user: provider.wallet.publicKey,
        userId: UserIDPDA,
        userProfile: UserProfilePDA,
      })
      .rpc()

      const user_id = await program.account.userProfile.fetch(UserProfilePDA);
      console.log(user_id);

  });


  it("Follow another user", async () => {
  
    const [UserIDPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_id'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const user_id_pda = await program.account.userId.fetch(UserIDPDA);
    const uid = user_id_pda.uid;

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        uid.toString(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .followUser(4)
      .accounts({
        user: provider.wallet.publicKey,
        userId: UserIDPDA,
        userProfile: UserProfilePDA,
      })
      .rpc()

      const user_id = await program.account.userProfile.fetch(UserProfilePDA);
      console.log(user_id);

  });



  it("Check stats", async () => {
  
    const [StatsPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('stats'),
      ],
      program.programId
    )

      const stats = await program.account.stats.fetch(StatsPDA);
      console.log(stats);

  });


});
