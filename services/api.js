import { 
  userData, 
  cardsData, 
  transactionsData, 
  quickActionsData, 
  accountsData 
} from '../data/dummyData';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// User API
export const getUserData = async () => {
  await delay();
  return {
    success: true,
    data: userData
  };
};

// Cards API
export const getCards = async () => {
  await delay();
  return {
    success: true,
    data: cardsData
  };
};

export const getCardById = async (cardId) => {
  await delay();
  const card = cardsData.find(c => c.id === cardId);
  return {
    success: !!card,
    data: card || null
  };
};

// Transactions API
export const getTransactions = async (limit = null) => {
  await delay();
  const data = limit ? transactionsData.slice(0, limit) : transactionsData;
  return {
    success: true,
    data
  };
};

export const getTransactionById = async (transactionId) => {
  await delay();
  const transaction = transactionsData.find(t => t.id === transactionId);
  return {
    success: !!transaction,
    data: transaction || null
  };
};

// Quick Actions API
export const getQuickActions = async () => {
  await delay();
  return {
    success: true,
    data: quickActionsData
  };
};

// Accounts API
export const getAccounts = async () => {
  await delay();
  return {
    success: true,
    data: accountsData
  };
};

export const getAccountById = async (accountId) => {
  await delay();
  const account = accountsData.find(a => a.id === accountId);
  return {
    success: !!account,
    data: account || null
  };
};

// Virtual Card API
export const applyForVirtualCard = async (cardData) => {
  await delay(1000);
  return {
    success: true,
    message: "Your request for a new Secondary Debit Card has been received.",
    data: {
      requestId: `REQ${Date.now()}`,
      status: "pending",
      ...cardData
    }
  };
};

// Basic Info API
export const submitBasicInfo = async (basicInfo) => {
  await delay(1000);
  return {
    success: true,
    message: "Basic information submitted successfully.",
    data: {
      submissionId: `SUB${Date.now()}`,
      ...basicInfo
    }
  };
};
