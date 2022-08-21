use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;
use std::mem;

declare_id!("9XXBUPPp5gpsd8ii6NutuyPVQMGJhFSTqcnJawgQenpt");

#[program]
pub mod spling {
    use super::*;

    // initialize spling once, to keep track of number of users and groups
    // these numbers serve as id's for users and groups as well
    pub fn setup_spling(ctx: Context<SetupSpling>) -> Result<()> {
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let _user: &Signer = &ctx.accounts.user;
        
        // start with 0 - when a new user signs up/group is created, increments with 1 
        spling.users = 0;
        spling.groups = 0;

        // Spling is a PDA, so here we store the bump
        spling.bump = *ctx.bumps.get("spling").unwrap();

        Ok(())
    }

    // a user can add a profile, of which the content is stored on the Shadow Drive
    pub fn create_user_profile(ctx: Context<CreateUserProfile>, shdw: Pubkey) -> Result<()> {
        let user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let user: &Signer = &ctx.accounts.user;

        // load the clock to create a creation date timestamp (ts)
        let clock: Clock = Clock::get().unwrap();
        user_profile.ts = clock.unix_timestamp;

        // store the signers public key as user
        user_profile.user = *user.key;

        // take the uid from the UserId PDA and store it in this UserProfilePDA
        user_profile.uid = &spling.users + 1;
        spling.users += 1;

        // status (st) is standard 1, can have future utility for moderation purposes
        user_profile.st = 1;

        // public key of user's Shadow Drive storage account is stored here
        user_profile.shdw = shdw;

        // UserProfile is a PDA, so here we store the bump
        user_profile.bump = *ctx.bumps.get("user_profile").unwrap();

        Ok(())
    }

    // create a group profile, of which the content is stored on the Shadow Drive
    pub fn create_group_profile(ctx: Context<CreateGroupProfile>, shdw: Pubkey) -> Result<()> {
        let group_profile: &mut Account<GroupProfile> = &mut ctx.accounts.group_profile;
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let user: &Signer = &ctx.accounts.user;

        // load the clock to create a creation date timestamp (ts)
        let clock: Clock = Clock::get().unwrap();
        group_profile.ts = clock.unix_timestamp;

        // store the signers public key as group
        group_profile.group = *user.key;

        group_profile.gid = &spling.groups + 1;

        // increment group spling with 1, to reflect the newly created group
        spling.groups += 1;

        // status (st) is standard 1, can have future utility for moderation purposes
        group_profile.st = 1;

        // public key of group's Shadow Drive storage account is stored here
        group_profile.shdw = shdw;

        // GroupId is a PDA, so here we store the bump
        group_profile.bump = *ctx.bumps.get("group_profile").unwrap();

        Ok(())
    }

    // user can join a group
    pub fn join_group(ctx: Context<JoinGroup>, address: u32) -> Result<()> {
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;
        let _user: &Signer = &ctx.accounts.user;

        // add group id to vector
        user_profile.groups.push(address);

        Ok(())
    }

    // leave group
    pub fn leave_group(ctx: Context<LeaveGroup>, address: u32) -> Result<()> {
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;
        let _user: &Signer = &ctx.accounts.user;

        // retain all user id's except for the user id to be deleted
        user_profile.groups.retain(|x| *x != address);

        Ok(())
    }

    // user can follow another user
    // part of an open social graph
    pub fn follow_user(ctx: Context<FollowUser>, address: u32) -> Result<()> {
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;
        let _user: &Signer = &ctx.accounts.user;

        // add user id to vector
        user_profile.following.push(address);

        Ok(())
    }

    // unfollow another user
    pub fn unfollow_user(ctx: Context<UnfollowUser>, address: u32) -> Result<()> {
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;
        let _user: &Signer = &ctx.accounts.user;

        // retain all user id's except for the user id to be deleted
        user_profile.following.retain(|x| *x != address);

        Ok(())
    }

    // this submit_post function takes no arguments because the account address == filename of the post
    // the account is kept as light as possible, to make posts as cheap as possible
    pub fn submit_post(ctx: Context<SubmitPost>, group_id: u32, _shdw: Pubkey) -> Result<()> {
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;
        let _user: &Signer = &ctx.accounts.user;

        // load the clock to create a creation date timestamp (ts)
        let clock: Clock = Clock::get().unwrap();
        post.ts = clock.unix_timestamp;

        // store the id of the user
        let uid: u32 = user_profile.uid;
        post.uid = uid;

        // store the group in which this post is posted
        post.gid = group_id;

        // status (st) is standard 1, can have future utility for moderation purposes
        post.st = 1;

        // Post is a PDA, so here we store the bump
        post.bump = *ctx.bumps.get("post").unwrap();

        Ok(())
    }

    // delete a post
    pub fn delete_post(ctx: Context<DeletePost>, _group_id: u32, _shdw: Pubkey) -> Result<()> {
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let _post: &mut Account<Post> = &mut ctx.accounts.post;

        Ok(())
    }

    // delete user profile
    pub fn delete_group_profile(ctx: Context<DeleteGroupProfile>, _shdw: Pubkey) -> Result<()> {
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let _group_profile: &mut Account<GroupProfile> = &mut ctx.accounts.group_profile;

        Ok(())
    }

    // delete group profile
    pub fn delete_user_profile(ctx: Context<DeleteUserProfile>, _user_id: u32, _shdw: Pubkey) -> Result<()> {
        let spling: &mut Account<Spling> = &mut ctx.accounts.spling;
        let _user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;

        Ok(())
    }

}

#[account]
pub struct Post {   
    pub ts: i64,    // 8 byte - timestamp
    pub uid: u32,   // 4 byte - user id (max 4,294,967,295)  
    pub gid: u32,   // 4 byte - group id (max 4,294,967,295)
    // pub rep: u16,   // 2 byte - reply index (max 65,535 replies)
    pub st: u8,     // 1 byte - status (default = 1)
    pub bump: u8,   // 1 byte - bump
}

#[account]
pub struct Spling {   
    pub users: u32,     // doubles as count of users and user id's
    pub groups: u32,    // doubles as count of groups and group id's
    pub bump: u8,  
}

#[account]
pub struct UserId {
    pub user: Pubkey,   // user public key
    pub uid: u32,       // user id (max 4,294,967,295)
    pub bump: u8,
}

#[account]
pub struct UserProfile {   
    pub ts: i64,                // timestamp
    pub user: Pubkey,           // user public key
    pub uid: u32,               // user id (max 4,294,967,295)
    pub st: u8,                 // status (default = 1)
    pub shdw: Pubkey,           // public key of user's shadow storage account
    pub groups: Vec<u32>,       // group id's the user is member of
    pub following: Vec<u32>,    // user id's the user is following
    pub bump: u8,   
}

#[account]
pub struct GroupId {
    pub group: Pubkey,          // group's public key
    pub gid: u32,               // group id (max 4,294,967,295)
    pub bump: u8,  
}

#[account]
pub struct GroupProfile {   
    pub ts: i64,                // timestamp
    pub group: Pubkey,          // user public key
    pub gid: u32,               // group id (max 4,294,967,295)
    pub st: u8,                 // status (default = 1)
    pub shdw: Pubkey,           // public key of group's shadow storage account
    pub bump: u8,   
}



#[derive(Accounts)]
// use function arguments for pda account creation 
#[instruction(group_id: u32, shdw: Pubkey)]
pub struct SubmitPost<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // retrieve user id and check if signer is the owner of this user id
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    #[account(seeds = [b"user_profile", user.key().as_ref()], bump = user_profile.bump, has_one = user)]
    pub user_profile: Account<'info, UserProfile>,
    // create new post account, use shdw argument as seed
    #[account(init, payer = user, space = 8 + mem::size_of::<Post>(), seeds = [b"post".as_ref(), shdw.as_ref()], bump)]
    pub post: Account<'info, Post>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(group_id: u32, shdw: Pubkey)]
pub struct DeletePost<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    #[account(seeds = [b"user_profile", user.key().as_ref()], bump = user_profile.bump, has_one = user)]
    pub user_profile: Account<'info, UserProfile>,
    #[account(mut, seeds = [b"post".as_ref(), shdw.as_ref()], bump = post.bump, constraint = user_profile.uid == post.uid, close = spling)]
    pub post: Account<'info, Post>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetupSpling<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(init, payer = user, space = 8 + mem::size_of::<Spling>(), seeds = [b"spling"], bump)]
    pub spling: Account<'info, Spling>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateUserProfile<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // retrieve spling account to update number of users
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    // create new user profile account, using the user id as seed
    #[account(init, payer = user, space = 8 + mem::size_of::<UserProfile>(), seeds = [b"user_profile".as_ref(), user.key().as_ref()], bump)]
    pub user_profile: Account<'info, UserProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteUserProfile<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    #[account(mut, seeds = [b"user_profile".as_ref(), user.key().as_ref() ], bump = user_profile.bump, has_one = user, close = spling)]
    pub user_profile: Account<'info, UserProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct CreateGroupProfile<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // retrieve spling account to update number of users
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    // create new user profile account, using the user id as seed
    #[account(init, payer = user, space = 8 + mem::size_of::<GroupProfile>(), seeds = [b"group_profile".as_ref(), user.key().as_ref()], bump)]
    pub group_profile: Account<'info, GroupProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteGroupProfile<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    // create new group profile account, using the group id as seed
    // TODO: check if user = group
    #[account(mut, seeds = [b"group_profile".as_ref(), user.key().as_ref()], bump = group_profile.bump, close = spling)]
    pub group_profile: Account<'info, GroupProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct JoinGroup<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    // increase user profile account size, with 4 (u32) to accomodate adding the group id to the user's joined groups
    #[account(
        mut, 
        seeds = [b"user_profile", user.key().as_ref()],
        bump = user_profile.bump,
        has_one = user,
        realloc = 8 + std::mem::size_of::<UserProfile>() + 4,
        realloc::payer = user,
        realloc::zero = false,
    )]
    pub user_profile: Account<'info, UserProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct LeaveGroup<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    #[account(mut, seeds = [b"user_profile", user.key().as_ref()], has_one = user, bump = user_profile.bump)]
    pub user_profile: Account<'info, UserProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct FollowUser<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    // increase user profile account size, with 4 (u32) to accomodate adding the user id to the user's follows
    #[account(
        mut, 
        seeds = [b"user_profile", user.key().as_ref()],
        bump = user_profile.bump,
        has_one = user,
        realloc = 8 + std::mem::size_of::<UserProfile>() + 4,
        realloc::payer = user,
        realloc::zero = false,
    )]
    pub user_profile: Account<'info, UserProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct UnfollowUser<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"spling"], bump = spling.bump)]
    pub spling: Account<'info, Spling>,
    #[account(mut, seeds = [b"user_profile", user.key().as_ref()], has_one = user, bump = user_profile.bump)]
    pub user_profile: Account<'info, UserProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}


