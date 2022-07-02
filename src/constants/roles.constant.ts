export const ROLES = {
  ROLE_ADMIN: 10,
  ROLE_REPORT_VIEWER_HEALTH: 101,
  ROLE_REPORT_VIEWER_HEALTH_SERVICEPORT: 1011,
  ROLE_REPORT_VIEWER_HEALTH_VACCINATION: 1012,
  ROLE_REPORT_VIEWER_HEALTH_VACCINATION_GENERAL: 10121,
  ROLE_REPORT_VIEWER_HEALTH_VACCINATION_PROVINCE: 10122,
  ROLE_REPORT_VIEWER_HEALTH_TRANSPORT: 1013,
  ROLE_REPORT_VIEWER_HEALTH_TRANSPORT_GENERAL: 10131,
  ROLE_REPORT_VIEWER_HEALTH_TRANSPORT_PROVINCE: 10132,
  ROLE_REPORT_VIEWER_HEALTH_TRANSPORT_AUDIT: 10133,
  ROLE_REPORT_VIEWER_HEALTH_GUILD: 1014,
  ROLE_REPORT_VIEWER_HEALTH_GUILD_OWNER: 10141,
  ROLE_REPORT_VIEWER_HEALTH_GUILD_OWNER_GENERAL: 101411,
  ROLE_REPORT_VIEWER_HEALTH_GUILD_OWNER_PROVINCE: 101412,
  ROLE_REPORT_VIEWER_HEALTH_GUILD_EMPLOYEE: 10142,
  ROLE_REPORT_VIEWER_HEALTH_GUILD_EMPLOYEE_GENERAL: 101421,
  ROLE_REPORT_VIEWER_HEALTH_GUILD_EMPLOYEE_PROVINCE: 101422,
  ROLE_REPORT_VIEWER_HEALTH_GUILD_AUDIT: 10143,
  ROLE_REPORT_VIEWER_HEALTH_PASSENGER: 1015,
  ROLE_REPORT_VIEWER_HEALTH_PASSENGER_GENERAL: 10151,
  ROLE_REPORT_VIEWER_HEALTH_PASSENGER_PROVINCE: 10152,
  ROLE_REPORT_VIEWER_HEALTH_SCHOOL: 1016,
  ROLE_REPORT_VIEWER_HEALTH_SCHOOL_GENERAL: 10161,
  ROLE_REPORT_VIEWER_HEALTH_SCHOOL_PROVINCE: 10162,
  ROLE_REPORT_VIEWER_HEALTH_RECRUITMENT: 1017,
  ROLE_REPORT_VIEWER_HEALTH_RECRUITMENT_GENERAL: 10171,
  ROLE_REPORT_VIEWER_HEALTH_RECRUITMENT_PROVINCE: 10172,
  ROLE_REPORT_VIEWER_HEALTH_REPORTS: 1018,
  ROLE_REPORT_VIEWER_GUILD: 102,
  ROLE_REPORT_VIEWER_GUILD_BAKERY: 1021,
  ROLE_REPORT_VIEWER_GUILD_BAKERY_GENERAL: 10211,
  ROLE_REPORT_VIEWER_GUILD_BAKERY_PROVINCE: 10212,
  ROLE_REPORT_VIEWER_ZAERIN: 103,
};

const PERMISSIONS_HEALTH = {
  CAN_VIEW_HEALTH_SERVICEPORT_OVERVIEW: 10110001,
  CAN_VIEW_HEALTH_SERVICEPORT_COUNTUPTIMER: 10110001,
  CAN_VIEW_HEALTH_SERVICEPORT_LISTOFSERVICES: 10110001,
  CAN_VIEW_HEALTH_SERVICEPORT_CALLCHART: 10110001,
  CAN_VIEW_HEALTH_VACCINATION_GENERAL_OVERVIEW: 101210001,
  CAN_VIEW_HEALTH_VACCINATION_GENERAL_OVERVIEW_VACCINE_COUNT: 101210001,
  CAN_VIEW_HEALTH_VACCINATION_GENERAL_OVERVIEW_VACCINE_PERCENT: 101210001,
  CAN_VIEW_HEALTH_VACCINATION_GENERAL_OVERVIEW_VACCINE_STATUS_CHART: 101210001,
  CAN_VIEW_HEALTH_VACCINATION_PROVINCE_MAP: 101210001,
  CAN_VIEW_HEALTH_VACCINATION_PROVINCE_OVERVIEW: 101210001,
  CAN_VIEW_HEALTH_VACCINATION_PROVINCE_OVERVIEW_VACCINE_COUNT: 101210001,
  CAN_VIEW_HEALTH_VACCINATION_PROVINCE_OVERVIEW_VACCINE_PERCENT: 101210001,
  CAN_VIEW_HEALTH_VACCINATION_PROVINCE_OVERVIEW_VACCINE_STATUS_CHART: 101210001,

  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW_SAMAS: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW_CATEGORY: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW_PUBLIC_PATIENTS: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW_VACCINE_PROCESS: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW_THE_LATEST_PUBLIC_TRANSPORT_VACCINATION_STATUS_CARD: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW_THE_LATEST_PUBLIC_TRANSPORT_VACCINATION_STATUS_CHART: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW_OF_VACCINATION_IN_PUBLIC_TRANSPORT: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW_OF_THE_PUBLIC_TRANSPORT_VACCINATION_STATUS: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_GENERAL_OVERVIEW_TABLE_OF_TESTS_IN_TRANSPORT: 10131,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_MAP: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW_SAMAS: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW_CATEGORY: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW_PUBLIC_PATIENTS: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW_VACCINE_PROCESS: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW_THE_LATEST_PUBLIC_TRANSPORT_VACCINATION_STATUS_CARD: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW_THE_LATEST_PUBLIC_TRANSPORT_VACCINATION_STATUS_CHART: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW_OF_VACCINATION_IN_PUBLIC_TRANSPORT: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW_OF_THE_PUBLIC_TRANSPORT_VACCINATION_STATUS: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_PROVINCE_OVERVIEW_TABLE_OF_TESTS_IN_TRANSPORT: 10132,
  CAN_VIEW_HEALTH_TRANSPORT_AUDIT_MAP: 10133,
  CAN_VIEW_HEALTH_TRANSPORT_AUDIT_OVERVIEW_DRIVER_STATUS: 10133,
  CAN_VIEW_HEALTH_TRANSPORT_AUDIT_OVERVIEW_DRIVER_STATUS_DOWNLOAD: 10133,

  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_CATEGORY: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_POSITIVE_PCR: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_OF_GUILD_VACCINATION_PROCESS: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_THE_LATEST_OVERWIEW_OF_VACCINATION: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_GUILD_POSITIVE_PCR_PERCENTAGE: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_GUILD_REGISTER_PERCENTAGE: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_GUILD_REGISTER_NUMBER: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_VACCINATION: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_GUILDS_PER_PROVINCE: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_TEST_STATUS: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_GENERAL_OVERVIEW_REGISTER_GUILD: 10141,
  CAN_VIEW_HEALTH_GUILD_OWNER_PROVINCE_MAP: 10142,
  CAN_VIEW_HEALTH_GUILD_OWNER_PROVINCE_OVERVIEW: 10142,
  CAN_VIEW_HEALTH_GUILD_OWNER_PROVINCE_OVERVIEW_CATEGORY: 10142,
  CAN_VIEW_HEALTH_GUILD_OWNER_PROVINCE_OVERVIEW_POSITIVE_PCR: 10142,
  CAN_VIEW_HEALTH_GUILD_OWNER_PROVINCE_OVERVIEW_OF_GUILD_VACCINATION_PROCESS: 10142,
  CAN_VIEW_HEALTH_GUILD_OWNER_PROVINCE_OVERVIEW_THE_LATEST_OVERWIEW_OF_VACCINATION: 10142,
  CAN_VIEW_HEALTH_GUILD_OWNER_PROVINCE_OVERVIEW_OVERVIEW_VACCINATION: 10142,
  CAN_VIEW_HEALTH_GUILD_OWNER_PROVINCE_OVERVIEW_TEST_STATUS: 10142,
  CAN_VIEW_HEALTH_GUILD_OWNER_PROVINCE_OVERVIEW_REGISTER_GUILD: 10142,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_GENERAL_OVERVIEW: 10141,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_GENERAL_OVERVIEW_CATEGORY: 10141,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_GENERAL_OVERVIEW_PER_PROVINCE: 10141,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_GENERAL_OVERVIEW_VACCINATION: 10141,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_GENERAL_OVERVIEW_TEST_STATUS: 10141,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_PROVINCE_MAP: 10142,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_PROVINCE_OVERVIEW: 10141,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_PROVINCE_OVERVIEW_CATEGORY: 10141,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_PROVINCE_OVERVIEW_PER_PROVINCE: 10141,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_PROVINCE_OVERVIEW_VACCINATION: 10141,
  CAN_VIEW_HEALTH_GUILD_EMPLOYEE_PROVINCE_OVERVIEW_TEST_STATUS: 10141,  
  CAN_VIEW_HEALTH_GUILD_AUDIT_MAP: 10143,
  CAN_VIEW_HEALTH_GUILD_AUDIT_OVERVIEW_NOT_SCANED: 10143,
  CAN_VIEW_HEALTH_GUILD_AUDIT_OVERVIEW_NOT_SCANED_DOWNLOAD: 10143,
  CAN_VIEW_HEALTH_GUILD_AUDIT_OVERVIEW_POSITIVE: 10143,
  CAN_VIEW_HEALTH_GUILD_AUDIT_OVERVIEW_POSITIVE_DOWNLOAD: 10143,
  CAN_VIEW_HEALTH_GUILD_AUDIT_OVERVIEW_UNVACCINATED: 10143,
  CAN_VIEW_HEALTH_GUILD_AUDIT_OVERVIEW_UNVACCINATED_DOWNLOAD: 10143,

  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_PASSENGER_STATUS_CARD: 10151,
  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_AIRLINES_PASSENGERS_STATUS_CARD: 10151,
  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_BUS_PASSENGERS_STATUS_CARD: 10151,
  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_TRAIN_PASSENGERS_STATUS_CARD: 10151,
  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_SHIP_PASSENGERS_STATUS_CARD: 10151,
  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_PASSENGER_VACCINATE: 10151,
  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_PASSENGER_STATUS_VACCINATE_CHART: 10151,
  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_PATIENTS: 10151,
  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_OF_LATEST_PASSENGERS_VACCINATION_STATUS: 10151,
  CAN_VIEW_HEALTH_PASSENGER_GENERAL_OVERVIEW_OF_TRIPS_MADE_BY_PASSENGERS_BY_VEHICLE: 10151,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_MAP: 10152,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_OVERVIEW_PASSENGER_STATUS_CARD: 10152,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_OVERVIEW_AIRLINES_PASSENGERS_STATUS_CARD: 10152,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_OVERVIEW_BUS_PASSENGERS_STATUS_CARD: 10152,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_OVERVIEW_TRAIN_PASSENGERS_STATUS_CARD: 10152,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_OVERVIEW_SHIP_PASSENGERS_STATUS_CARD: 10152,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_OVERVIEW_PASSENGER_VACCINATE: 10152,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_OVERVIEW_PASSENGERS_VACCINE_PER_DOSES_PROVINCE: 10152,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_OVERVIEW_OF_AFFECTED_AFTER_TRAVELING_IN_COUNTRY_PROVINCE: 10152,
  CAN_VIEW_HEALTH_PASSENGER_PROVINCE_OVERVIEW_OF_TRIPS_MADE_BY_PASSENGERS_BY_VEHICLE_PROVINCE: 10152,

  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_EDUCATIONAL_EMPLOYE: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_DEPARTMENT_EMPLOYE: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_STEUDENT: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_CATEGORIES: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_SCHOOLS_POSITIVE_PCR: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_OF_VACCINATION_PROCESS: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_THE_LATEST_OVERWIEW_OF_VACCINATION: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_GUILD_POSITIVE_PCR_PERCENTAGE: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_SCHOOLS_VACCINATION_PERCENTAGE_PER_GRADE: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_VACCINATION: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_TO_VACCINATION_STATUS: 10161,
  CAN_VIEW_HEALTH_SCHOOL_GENERAL_OVERVIEW_TEST_STATUS: 10161,

  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_MAP: 10162,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_EDUCATIONAL_EMPLOYE: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_DEPARTMENT_EMPLOYE: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_STEUDENT: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_CATEGORIES: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_SCHOOLS_POSITIVE_PCR: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_OF_VACCINATION_PROCESS: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_THE_LATEST_OVERWIEW_OF_VACCINATION: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_GUILD_POSITIVE_PCR_PERCENTAGE: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_SCHOOLS_VACCINATION_PERCENTAGE_PER_GRADE: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_VACCINATION: 10161,
  CAN_VIEW_HEALTH_SCHOOL_PROVINCE_OVERVIEW_TEST_STATUS: 10161,

  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL: 10171,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW_CATEGORY: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW_PATIENTS: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW_OF_GOVERNMENT_EMPLOYEES_VACCINATION_PROCESS: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW_OF_THE_LATEST_GOVERNMENT_EMPLOYEES_VACCINATION_STATUS_CHART: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW_OF_THE_LATEST_GOVERNMENT_EMPLOYEES_VACCINATION_STATUS_CARD: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW_OF_PERCENTAGE_OF_GOVERNMENT_EMPLOYEES_IN_EACH_PROVINCE: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW_OF_VACCINATION: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW_VACCINE_PER_PROVINCE: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_GENERAL_OVERVIEW_TEST_STATUS: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_PROVINCE_MAP: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_PROVINCE_OVERVIEW: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_PROVINCE_OVERVIEW_CATEGORY: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_PROVINCE_OVERVIEW_PATIENTS: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_PROVINCE_OVERVIEW_OF_GOVERNMENT_EMPLOYEES_VACCINATION_PROCESS: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_PROVINCE_OVERVIEW_OF_THE_LATEST_GOVERNMENT_EMPLOYEES_VACCINATION_STATUS_CHART: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_PROVINCE_OVERVIEW_OF_THE_LATEST_GOVERNMENT_EMPLOYEES_VACCINATION_STATUS_CARD: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_PROVINCE_OVERVIEW_OF_VACCINATION: 10172,
  CAN_VIEW_HEALTH_RECRUITMENT_PROVINCE_OVERVIEW_TEST_STATUS: 10172,

  CAN_VIEW_HEALTH_REPORTS_TRANSPORT_REPORT: 1018,
  CAN_VIEW_HEALTH_REPORTS_TRANSPORT_REPORT_DOWNLOAD: 1018,
  CAN_VIEW_HEALTH_REPORTS_GUILD_REPORT: 1018,
  CAN_VIEW_HEALTH_REPORTS_GUILD_REPORT_DOWNLOAD: 1018,
};

const PERMISSIONS_GUILD = {
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_BAKERY_INSPECTION_NEED: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_AUDIT: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_INVALID_GUILD_CODE: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_DEAD_OWNER: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_PERMISSION: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_LICENCE: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_ACTIVE_TIME: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_SELL_COST_AVERAGE: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_SOLD_COUNT: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_SELL_RATE: 10211,
  CAN_VIEW_GUILD_BAKERY_GENERAL_OVERVIEW_SUPPLY_FLOUR: 10211,
  CAN_VIEW_GUILD_BAKERY_PROVINCE_MAP: 10212,
  CAN_VIEW_GUILD_BAKERY_PROVINCE_OVERVIEW: 10211,
  CAN_VIEW_GUILD_BAKERY_PROVINCE_OVERVIEW_BAKERY_INSPECTION_NEED: 10211,
  CAN_VIEW_GUILD_BAKERY_PROVINCE_OVERVIEW_AUDIT: 10211,
  CAN_VIEW_GUILD_BAKERY_PROVINCE_OVERVIEW_INVALID_GUILD_CODE: 10211,
  CAN_VIEW_GUILD_BAKERY_PROVINCE_OVERVIEW_DEAD_OWNER: 10211,
  CAN_VIEW_GUILD_BAKERY_PROVINCE_OVERVIEW_PERMISSION: 10211,
  CAN_VIEW_GUILD_BAKERY_PROVINCE_OVERVIEW_LICENCE: 10211,
};

const PERMISSIONS_ZAERIN = {};


export const PERMISSIONS = {
  ...PERMISSIONS_HEALTH,
  ...PERMISSIONS_GUILD,
  ...PERMISSIONS_ZAERIN,
};

export const getRoles = {
  [ROLES.ROLE_ADMIN]: [PERMISSIONS],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH]: [PERMISSIONS_HEALTH],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_SERVICEPORT]: [PERMISSIONS_HEALTH],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_VACCINATION]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_VACCINATION_GENERAL]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_VACCINATION_PROVINCE]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_TRANSPORT]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_TRANSPORT_GENERAL]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_TRANSPORT_PROVINCE]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_TRANSPORT_AUDIT]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_GUILD]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_GUILD_OWNER]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_GUILD_OWNER_GENERAL]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_GUILD_OWNER_PROVINCE]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_GUILD_EMPLOYEE]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_GUILD_EMPLOYEE_GENERAL]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_GUILD_EMPLOYEE_PROVINCE]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_GUILD_AUDIT]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_PASSENGER]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_PASSENGER_GENERAL]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_PASSENGER_PROVINCE]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_SCHOOL]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_SCHOOL_GENERAL]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_SCHOOL_PROVINCE]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_RECRUITMENT]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_RECRUITMENT_GENERAL]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_RECRUITMENT_PROVINCE]: [],
  [ROLES.ROLE_REPORT_VIEWER_HEALTH_REPORTS]: [],
  [ROLES.ROLE_REPORT_VIEWER_GUILD]: [],
  [ROLES.ROLE_REPORT_VIEWER_GUILD_BAKERY]: [],
  [ROLES.ROLE_REPORT_VIEWER_GUILD_BAKERY_GENERAL]: [],
  [ROLES.ROLE_REPORT_VIEWER_GUILD_BAKERY_PROVINCE]: [],
  [ROLES.ROLE_REPORT_VIEWER_ZAERIN]: [],
};
