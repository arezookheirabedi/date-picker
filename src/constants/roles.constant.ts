export const ROLES = {
  ROLE_ADMIN: 10,
  ROLE_ADMIN_HEALTH: 101,
  ROLE_ADMIN_HEALTH_SERVICEPORT: 1011,
  ROLE_ADMIN_HEALTH_VACCINATION: 1012,
  ROLE_ADMIN_HEALTH_VACCINATION_GENERAL: 10121,
  ROLE_ADMIN_HEALTH_VACCINATION_PROVINCE: 10122,
  ROLE_ADMIN_HEALTH_TRANSPORT: 1013,
  ROLE_ADMIN_HEALTH_TRANSPORT_GENERAL: 10131,
  ROLE_ADMIN_HEALTH_TRANSPORT_PROVINCE: 10132,
  ROLE_ADMIN_HEALTH_TRANSPORT_AUDIT: 10133,
  ROLE_ADMIN_HEALTH_GUILD: 1014,
  ROLE_ADMIN_HEALTH_GUILD_GENERAL: 10141,
  ROLE_ADMIN_HEALTH_GUILD_PROVINCE: 10142,
  ROLE_ADMIN_HEALTH_GUILD_AUDIT: 10143,
  ROLE_ADMIN_HEALTH_PASSENGER: 1015,
  ROLE_ADMIN_HEALTH_PASSENGER_GENERAL: 10151,
  ROLE_ADMIN_HEALTH_PASSENGER_PROVINCE: 10152,
  ROLE_ADMIN_HEALTH_SCHOOL: 1016,
  ROLE_ADMIN_HEALTH_SCHOOL_GENERAL: 10161,
  ROLE_ADMIN_HEALTH_SCHOOL_PROVINCE: 10162,
  ROLE_ADMIN_HEALTH_RECRUITMENT: 1017,
  ROLE_ADMIN_HEALTH_RECRUITMENT_GENERAL: 10171,
  ROLE_ADMIN_HEALTH_RECRUITMENT_PROVINCE: 10172,
  ROLE_ADMIN_HEALTH_REPORTS: 1018,
  ROLE_ADMIN_GUILD: 102,
  ROLE_ADMIN_GUILD_BAKERY: 1021,
  ROLE_ADMIN_GUILD_BAKERY_GENERAL: 10211,
  ROLE_ADMIN_GUILD_BAKERY_PROVINCE: 10212,
  ROLE_ADMIN_ZAERIN: 103,
};

export const PERMISSIONS = {

  CAN_MANAGE_ADMINS: 1000,
  CAN_MANAGE_EMPLOYEES: 1001,
  CAN_ACCESS_REPORTS: 1002,
  CAN_UPDATE_PRODUCTS: 1003,
  CAN_MODIFY_USERS: 1004,
  CAN_LOG_REQUEST: 1005,
  CAN_ADD_ADMINS: 1006,
  CAN_ADD_CUSTOMER: 1007,
  CAN_ADD_EMPLOYEE: 1008,
  CAN_VIEW_PAYMENTS: 1009,
};

export const getRoles = {
  [ROLES.ROLE_ADMIN]: [
    PERMISSIONS.CAN_ACCESS_REPORTS,
    PERMISSIONS.CAN_MANAGE_ADMINS,
    PERMISSIONS.CAN_ADD_ADMINS,
    PERMISSIONS.CAN_MANAGE_EMPLOYEES,
  ],
//   [ROLES.ADMIN]: [
//     PERMISSIONS.CAN_VIEW_PAYMENTS,
//     PERMISSIONS.CAN_MANAGE_EMPLOYEES,
//     PERMISSIONS.CAN_ADD_EMPLOYEE,
//   ],
//   [ROLES.CUSTOMER]: [PERMISSIONS.CAN_LOG_REQUEST],
//   [ROLES.EMPLOYEE]: [
//     PERMISSIONS.CAN_UPDATE_PRODUCTS,
//     PERMISSIONS.CAN_LOG_REQUEST,
//     PERMISSIONS.CAN_MODIFY_USERS,
//   ],
};
