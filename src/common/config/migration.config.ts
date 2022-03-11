import { chatDbConfigAsync } from '@config/chat-db.config';
import { mainDbConfigAsync } from '@config/main-db.config';
import { adminDbConfigAsync } from '@config/admin-db.config';

const migrationConfig = {
  main: mainDbConfigAsync,
  chat: chatDbConfigAsync,
  admin: adminDbConfigAsync,
};

export default migrationConfig.main;
