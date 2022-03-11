// DB Connections
export const DEFAULT_CONNECTION = 'default';
export const CHAT_CONNECTION = 'chat_service';
export const ADMIN_CONNECTION = 'admin_service';

// Tokens
export const ACCESS_TOKEN_NAME = 'access_token';
export const REFRESH_TOKEN_NAME = 'refresh_token';
export const ACCESS_TOKEN_IS_NOT_SET = 'Access token is not set';
export const REFRESH_TOKEN_IS_NOT_SET = 'Refresh token is not set';
export const REFRESH_TOKEN_IS_NOT_VALID = 'Refresh token is not valid';

// Exceptions
export const ROLE_NOT_FOUND = 'Роль не найдена';
export const ROLES_NOT_FOUND = 'В системе нет ролей';

export const TOPIC_NOT_FOUND = 'Тема не найдена';
export const TOPICS_NOT_FOUND = 'В системе нет тем';

export const FILTER_NOT_FOUND = 'Фильтр не найден';

export const EMPTY_BLACKLIST = 'Черный список пуст';
export const USER_IS_NOT_BLOCKED = 'Пользователь не заблокирован';

export const ELITE_NOT_FOUND = 'Пользователь не является элитным';
export const ELITES_NOT_FOUND = 'В системе нет элитных пользователей';
export const ACTIVE_ELITES_NOT_FOUND = 'В системе нет элит, стань первым!';

export const TOKEN_NOT_FOUND = 'Токен не найден';
export const TOKENS_NOT_FOUND = 'В системе нет токенов';

export const USER_NOT_FOUND = 'Пользователь не найден';
export const USERS_NOT_FOUND = 'В системе нет пользователей';

export const DIALOG_NOT_FOUND = 'Диалог не найден';
export const USER_HAVENT_DIALOGS = 'У пользователя нет диалогов';

export const MESSAGE_NOT_FOUND = 'Сообщение не найден';
export const MESSAGES_NOT_FOUND = 'В диалоге нет соощений';
export const DIALOG_HAVENT_MESSAGES = 'Диалог пуст';

export const BOT_NOT_FOUND = 'Бот не найден';
export const BOTS_NOT_FOUND = 'Ботов нет в системе';
export const ACTIVE_BOTS_NOT_FOUND = 'В системе нет активных ботов';
export const BOT_HAVENT_MESSAGES = 'У бота нет сообщений';
export const BM_NOT_FOUND = 'Сообщение бота не найдено';

export const UNAUTHORIZED_EXCEPTION = 'Unauthorized exception';

// PROVIDERS
export const BM_REPO = 'BMRepository';
export const BOT_REPO = 'BotRepository';
export const USER_REPO = 'UserRepository';
export const CITY_REPO = 'CityRepository';
export const ROLE_REPO = 'RoleRepository';
export const TOKEN_REPO = 'TokenRepository';
export const TOPIC_REPO = 'TopicRepository';
export const ELITE_REPO = 'EliteRepository';
export const FILTER_REPO = 'FilterRepository';
export const TARIFF_REPO = 'TariffRepository';
export const COUNTRY_REPO = 'CountryRepository';
export const PAYMENT_REPO = 'PaymentRepository';
export const STORY_REPO = 'StoryRepository';
export const DIALOG_REPO = 'DialogRepository';
export const COMPLAINT_REPO = 'CityRepository';
export const MESSAGE_REPO = 'MessageRepository';
export const BLACKLIST_REPO = 'BlacklistRepository';
export const STORY_CONTENT_REPO = 'StoryContentRepository';

// SERVICES
export const USER_SERVICE = 'UserService';
export const AUTH_SERVICE = 'AuthService';
export const MAIL_SERVICE = 'MailService';
export const TOPIC_SERVICE = 'TopicService';
export const TOKEN_SERVICE = 'TokenService';
export const DIALOG_SERVICE = 'DialogService';
export const MESSAGE_SERVICE = 'MessageService';
export const BOT_SERVICE = 'BotService';
export const CITY_SERVICE = 'CityService';
export const COUNTRY_SERVICE = 'CountryService';
export const COMPLAINT_SERVICE = 'ComplaintService';
export const PAYMENT_SERVICE = 'PaymentService';
export const STORY_SERVICE = 'StoryService';
export const TARIFF_SERVICE = 'TariffService';
export const ELITE_SERVICE = 'EliteService';
export const FILTER_SERVICE = 'FilterService';
export const SOC_AUTH_SERVICE = 'SocAuthService';
export const FILESTORE_SERVICE = 'FilestoreService';
export const CHECK_PREMIUM = 'CheckPremium';
export const CLOUDPAYMENTS_SERVICE = 'CloudPaymentsService';
