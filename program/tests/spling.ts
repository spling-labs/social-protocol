import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Spling } from "../target/types/spling";
import { PublicKey } from '@solana/web3.js'

describe("spling", () => {

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Spling as Program<Spling>;

  const shdw = anchor.web3.Keypair.generate();


  it("Sets up spling", async () => {
  
    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

      await program.methods
      .setupSpling()
      .accounts({
        user: provider.wallet.publicKey,
        spling: SplingPDA,
      })
      .rpc()

      const spling = await program.account.spling.fetch(SplingPDA);
      console.log(spling);

  });




  it("Creates User Profile", async () => {
  

    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .createUserProfile(shdw.publicKey)
      .accounts({
        user: provider.wallet.publicKey,
        spling: SplingPDA,
        userProfile: UserProfilePDA,
      })
      .rpc()

      const user_id = await program.account.userProfile.fetch(UserProfilePDA);
      console.log(user_id);

  });



  it("Creates Group Profile", async () => {
  

    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

    const [GroupProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('group_profile'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .createGroupProfile(shdw.publicKey)
      .accounts({
        user: provider.wallet.publicKey,
        spling: SplingPDA,
        groupProfile: GroupProfilePDA,
      })
      .rpc()

      const group_id = await program.account.groupProfile.fetch(GroupProfilePDA);
      console.log(group_id);

  });



  it("Submits a post", async () => {

    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const [PostPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('post'),
        shdw.publicKey.toBuffer(),
      ],
      program.programId
    )

      await program.methods
      .submitPost(1, shdw.publicKey)
      .accounts({
        user: provider.wallet.publicKey,
        userProfile: UserProfilePDA,
        post: PostPDA,
        spling: SplingPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

      const post = await program.account.post.fetch(PostPDA);
      console.log(post);

  });


  it("Join a group", async () => {

    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .joinGroup(33)
      .accounts({
        user: provider.wallet.publicKey,
        userProfile: UserProfilePDA,
        spling: SplingPDA,
      })
      .rpc()

      const user_id = await program.account.userProfile.fetch(UserProfilePDA);
      console.log(user_id);

  });


  it("Follow another user", async () => {

    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .followUser(4)
      .accounts({
        user: provider.wallet.publicKey,
        userProfile: UserProfilePDA,
        spling: SplingPDA,
      })
      .rpc()

      const user_id = await program.account.userProfile.fetch(UserProfilePDA);
      console.log(user_id);

  });



  it("Check spling", async () => {
  
    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

      // const spling = await program.account.spling.fetch(SplingPDA);
      // console.log(spling);

  });

  it("Show group membership", async () => {
    const spling = await program.account.userProfile.all();
    console.log(spling[0].account.groups);
  });


  it("Unfollow another user", async () => {

    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .unfollowUser(4)
      .accounts({
        user: provider.wallet.publicKey,
        userProfile: UserProfilePDA,
        spling: SplingPDA,
      })
      .rpc()

      const user_id = await program.account.userProfile.fetch(UserProfilePDA);
      console.log(user_id);

  });

  it("Leave a group", async () => {

    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const shdw = anchor.web3.Keypair.generate();

      await program.methods
      .leaveGroup(33)
      .accounts({
        user: provider.wallet.publicKey,
        userProfile: UserProfilePDA,
        spling: SplingPDA,
      })
      .rpc()

      // const user_id = await program.account.userProfile.fetch(UserProfilePDA);
      // console.log(user_id);

  });

  it("Show group memberships", async () => {
    const spling = await program.account.userProfile.all();
    console.log(spling[0].account.groups);
  });




  it("Delete a post", async () => {

    const [SplingPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('spling'),
      ],
      program.programId
    )

    const [UserProfilePDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    )

    const [PostPDA] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('post'),
        shdw.publicKey.toBuffer(),
      ],
      program.programId
    )

      await program.methods
      .deletePost(1, shdw.publicKey)
      .accounts({
        user: provider.wallet.publicKey,
        userProfile: UserProfilePDA,
        post: PostPDA,
        spling: SplingPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

      // const post = await program.account.post.fetch(PostPDA);
      // console.log(post);

  });


});
