import { BASE_ADMIN_PATH, BASE_PATH, BASE_URL_PATH } from "./httpClient";

export const PATH = {
  auth: {
    signup: `${BASE_PATH}/registerCompany`,
    login: `${BASE_PATH}/login`,
    getAdminDetails: `${BASE_PATH}/getAdminDetails`,
    getIndustrySector: `${BASE_PATH}/getIndustrySector`,
    editCompanyProfile: `${BASE_PATH}/editCompanyProfile`,
    sendOtp: `${BASE_PATH}/sendOtp`,
    verifyEmail: `${BASE_PATH}/forgotPassword/verifyEmail`,
    verifyRegistrationEmail: `${BASE_PATH}/verifyEmail`,
    resetPassword: `${BASE_PATH}/forgotPassword/resetPassword`,
    changePassword: `${BASE_PATH}/userChangePassword`
  },
  echoEcho: {
    createEchoEcos: `${BASE_PATH}/createEchoEcos`,
    getEcoType: `${BASE_PATH}/getEcoType`,
    getEcoPurpose: `${BASE_PATH}/getEcoPurpose`,
    getEchoEcosByCompanyId: `${BASE_PATH}/getEchoEcosByCompanyId`,
    editEchoEcoGoalById: `${BASE_PATH}/editEchoEcoGoalById`,
    getDailyEchoEcoCallApiKeyAndUrl: `${BASE_PATH}/getDailyEchoEcoCallApiKeyAndUrl`,
    getDailyEchoEcoDetails: `${BASE_PATH}/getDailyEchoEcoDetails`,
    getTotalEchoPlantedUrl: `${BASE_PATH}/getTotalEchoPlantedUrl`,
    getMonthlyTotalEchoPlanted: `${BASE_PATH}/getMonthlyTotalEchoPlanted`,
    getKeyMilestoneByCompanyId: `${BASE_PATH}/getKeyMilestoneByCompanyId`,
    latestOverallEchoEco: `${BASE_PATH}/latestOverallEchoEco`,
    getEchoEcoGoalStatus: `${BASE_PATH}/getEchoEcoGoalStatus`,
    createEchoEcoReport: `${BASE_PATH}/createEchoEcoReport`
  },
  leaderBoard: {
    getAllCompaniesByrdsPoints: `${BASE_URL_PATH}/getAllCompaniesByrdsPoints`,
    getCompanyDetailsByCompanyId: `${BASE_URL_PATH}/getCompanyDetailsByCompanyId`,
    getTotalTreeAlgaeAllCompanies: `${BASE_URL_PATH}/getTotalTreeAlgaeAllCompanies`,
    getNotifications: `${BASE_URL_PATH}/getNotifications`,
    getNotificationFlag: `${BASE_URL_PATH}/getNotificationFlag`,
    createSupportComplaint: `${BASE_PATH}/createSupportComplaint`
  },
  transaction: {
    pendingTransactions: `${BASE_PATH}/pendingTransactions`,
    createOrder: `${BASE_PATH}/createOrder`,
    paymentVerify: `${BASE_PATH}/paymentVerify`,
    completedTransactions: `${BASE_PATH}/completedTransactions`,
    getUsersTransactions: `${BASE_PATH}/getUsersTransactions`
  },
  byrdsPage: {
    createPost: `${BASE_PATH}/createPost`,
    getPostsByCompanyId: `${BASE_PATH}/getPostsByCompanyId`,
    deletePostByCompanyId: `${BASE_PATH}/deletePostByCompanyId`,
    editPostById: `${BASE_PATH}/editPostById`,
    getTotalTreeAlgae: `${BASE_PATH}/getTotalTreeAlgae`,
    sharePost: `${BASE_PATH}/sharePost`,
    getPostById: `${BASE_PATH}/getPostById`
  },
  announcements: {
    getAnnouncements: `${BASE_ADMIN_PATH}/getAnnouncements`,
  },
  area: {
    getUsedArea: `${BASE_ADMIN_PATH}/getUsedArea`
  }
};
