use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;
use std::mem;

declare_id!("28fAzkcpA8pgTT8AtJGkWqSRkU8yznhBdEZBCxqRhHR9");

#[program]
pub mod spling {
    use super::*;

    // initialize stats once, to keep track of number of users and groups
    // these numbers serve as id's for users and groups as well
    pub fn setup_stats(ctx: Context<SetupStats>) -> Result<()> {
        let stats: &mut Account<Stats> = &mut ctx.accounts.stats;
        let _user: &Signer = &ctx.accounts.user;
        
        // start with 0 - when a new user signs up/group is created, increments with 1 
        stats.users = 0;
        stats.groups = 0;

        // Stats is a PDA, so here we store the bump
        stats.bump = *ctx.bumps.get("stats").unwrap();

        Ok(())
    }

    // for new users, we create a new user id and increment stats with 1
    pub fn create_userid(ctx: Context<CreateUserId>) -> Result<()> {
        let user_id: &mut Account<UserId> = &mut ctx.accounts.user_id;
        let stats: &mut Account<Stats> = &mut ctx.accounts.stats;
        let user: &Signer = &ctx.accounts.user;

        // store the signers public key as user
        user_id.user = *user.key;

        // create new uid (user id) by incrementing the last global user id with 1
        let uid: u32 = &stats.users + 1;
        user_id.uid = uid;

        // increment user stats with 1, to reflect the newly created user
        stats.users += 1;

        // UserId is a PDA, so here we store the bump
        user_id.bump = *ctx.bumps.get("user_id").unwrap();

        Ok(())
    }

    // a user can add a profile, of which the content is stored on the Shadow Drive
    pub fn create_user_profile(ctx: Context<CreateUserProfile>, shdw: Pubkey) -> Result<()> {
        let user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;
        let user_id: &mut Account<UserId> = &mut ctx.accounts.user_id;
        let user: &Signer = &ctx.accounts.user;

        // load the clock to create a creation date timestamp (ts)
        let clock: Clock = Clock::get().unwrap();
        user_profile.ts = clock.unix_timestamp;

        // store the signers public key as user
        user_profile.user = *user.key;

        // take the uid from the UserId PDA and store it in this UserProfilePDA
        user_profile.uid = user_id.uid;

        // status (st) is standard 1, can have future utility for moderation purposes
        user_profile.st = 1;

        // public key of user's Shadow Drive storage account is stored here
        user_profile.shdw = shdw;

        // UserProfile is a PDA, so here we store the bump
        user_profile.bump = *ctx.bumps.get("user_profile").unwrap();

        Ok(())
    }

    // delete a user's id
    pub fn delete_user_id(ctx: Context<DeleteUserId>) -> Result<()> {
        let user_id: &mut Account<UserId> = &mut ctx.accounts.user_id;

        Ok(())
    }

     // for new groups, create a new group id and increment stats with 1
    pub fn creategroupid(ctx: Context<CreateGroupId>) -> Result<()> {
        let group_id: &mut Account<GroupId> = &mut ctx.accounts.group_id;
        let stats: &mut Account<Stats> = &mut ctx.accounts.stats;
        let user: &Signer = &ctx.accounts.user;

        // store the signers public key as group
        // it's recommended to use a new/seperate wallet for creating a group
        group_id.group = *user.key;

        // create new gid (group id), by incrementing the last global group id with 1
        let gid: u32 = &stats.groups + 1;
        group_id.gid = gid;

        // increment group stats with 1, to reflect the newly created group
        stats.groups += 1;

        // GroupId is a PDA, so here we store the bump
        group_id.bump = *ctx.bumps.get("group_id").unwrap();

        Ok(())
    }

    // delete a group's id
    pub fn delete_group_id(ctx: Context<DeleteGroupId>) -> Result<()> {
        let group_id: &mut Account<GroupId> = &mut ctx.accounts.group_id;

        Ok(())
    }

    // create a group profile, of which the content is stored on the Shadow Drive
    pub fn create_group_profile(ctx: Context<CreateGroupProfile>, shdw: Pubkey) -> Result<()> {
        let group_profile: &mut Account<GroupProfile> = &mut ctx.accounts.group_profile;
        let group_id: &mut Account<GroupId> = &mut ctx.accounts.group_id;
        let user: &Signer = &ctx.accounts.user;

        // load the clock to create a creation date timestamp (ts)
        let clock: Clock = Clock::get().unwrap();
        group_profile.ts = clock.unix_timestamp;

        // store the signers public key as group
        group_profile.group = *user.key;

        // take the gid from the GroupId PDA and store it in this GroupProfilePDA
        group_profile.gid = group_id.gid;

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
        let user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;
        let user: &Signer = &ctx.accounts.user;

        // add group id to vector
        user_profile.groups.push(address);

        Ok(())
    }

    // user can follow another user
    // part of an open social graph
    pub fn follow_user(ctx: Context<FollowUser>, address: u32) -> Result<()> {
        let user_profile: &mut Account<UserProfile> = &mut ctx.accounts.user_profile;
        let user: &Signer = &ctx.accounts.user;

        // add user id to vector
        user_profile.following.push(address);

        Ok(())
    }

    // this submit_post function takes no arguments because the account address == filename of the post
    // the account is kept as light as possible, to make posts as cheap as possible
    pub fn submit_post(ctx: Context<SubmitPost>, group_id: u32) -> Result<()> {
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let user_id: &mut Account<UserId> = &mut ctx.accounts.user_id;
        let _user: &Signer = &ctx.accounts.user;

        // load the clock to create a creation date timestamp (ts)
        let clock: Clock = Clock::get().unwrap();
        post.ts = clock.unix_timestamp;

        // store the id of the user
        let uid: u32 = user_id.uid;
        post.uid = uid;

        // store the group in which this post is posted
        post.gid = group_id;

        // status (st) is standard 1, can have future utility for moderation purposes
        post.st = 1;

        Ok(())
    }


}

#[account]
pub struct Post {   
    pub ts: i64,    // 8 byte - timestamp
    pub uid: u32,   // 4 byte - user id (max 4,294,967,295)  
    pub gid: u32,   // 4 byte - group id (max 4,294,967,295)
    pub st: u8,     // 1 byte - status (default = 1)
}

#[account]
pub struct Stats {   
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
pub struct SubmitPost<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(seeds = [b"user_id", user.key().as_ref()], bump = user_id.bump, has_one = user)]
    pub user_id: Account<'info, UserId>,
    #[account(init, payer = user, space = 8 + mem::size_of::<Post>())]
    pub post: Account<'info, Post>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetupStats<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(init, payer = user, space = 8 + mem::size_of::<Stats>(), seeds = [b"stats"], bump)]
    pub stats: Account<'info, Stats>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateUserId<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"stats"], bump = stats.bump)]
    pub stats: Account<'info, Stats>,
    #[account(init, payer = user, space = 8 + mem::size_of::<UserId>(), seeds = [b"user_id", user.key().as_ref()], bump)]
    pub user_id: Account<'info, UserId>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteUserId<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user_id", user.key().as_ref()], bump = user_id.bump, close = user)]
    pub user_id: Account<'info, UserId>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteGroupId<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"group_id", user.key().as_ref()], bump = group_id.bump, close = user)]
    pub group_id: Account<'info, GroupId>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct CreateGroupId<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"stats"], bump = stats.bump)]
    pub stats: Account<'info, Stats>,
    #[account(init, payer = user, space = 8 + mem::size_of::<GroupId>(), seeds = [b"group_id", user.key().as_ref()], bump)]
    pub group_id: Account<'info, GroupId>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateUserProfile<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user_id", user.key().as_ref()], bump = user_id.bump)]
    pub user_id: Account<'info, UserId>,
    #[account(init, payer = user, space = 8 + mem::size_of::<UserProfile>(), seeds = [b"user_profile".as_ref(), user_id.uid.to_string().as_ref() ], bump)]
    pub user_profile: Account<'info, UserProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateGroupProfile<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"group_id", user.key().as_ref()], bump = group_id.bump)]
    pub group_id: Account<'info, GroupId>,
    #[account(init, payer = user, space = 8 + mem::size_of::<GroupProfile>(), seeds = [b"group_profile".as_ref(), group_id.gid.to_string().as_ref() ], bump)]
    pub group_profile: Account<'info, GroupProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct JoinGroup<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user_id", user.key().as_ref()], bump = user_id.bump, has_one = user)]
    pub user_id: Account<'info, UserId>,
    #[account(
        mut, 
        seeds = [b"user_profile", user_id.uid.to_string().as_ref()],
        bump = user_profile.bump,
        realloc = 8 + std::mem::size_of::<UserProfile>() + 4,
        realloc::payer = user,
        realloc::zero = false,
    )]
    pub user_profile: Account<'info, UserProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct FollowUser<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user_id", user.key().as_ref()], bump = user_id.bump, has_one = user)]
    pub user_id: Account<'info, UserId>,
    #[account(
        mut, 
        seeds = [b"user_profile", user_id.uid.to_string().as_ref()],
        bump = user_profile.bump,
        realloc = 8 + std::mem::size_of::<UserProfile>() + 4,
        realloc::payer = user,
        realloc::zero = false,
    )]
    pub user_profile: Account<'info, UserProfile>,
    #[account(address = system_program::ID)]
    pub system_program: Program<'info, System>,
}


