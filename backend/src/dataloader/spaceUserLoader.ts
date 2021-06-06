import DataLoader from 'dataloader';
import { User } from '../entity/User';

export const spaceUserLoader = () =>
  new DataLoader<string, User>(async (followingIds) => {
    const users = await User.findByIds(followingIds as string[]);
    const userIdToUser: Record<string, User> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    const sortedUsers = followingIds.map(
      (followingId) => userIdToUser[followingId]
    );
    return sortedUsers;
  });
