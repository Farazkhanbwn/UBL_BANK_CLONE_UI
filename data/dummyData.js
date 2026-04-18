export const userData = {
  name: "Faraz Khan",
  email: "farazkhanaa2555@gmail.com",
  phone: "0301-3309056",
  greeting: "Good Morning"
};

export const cardsData = [
  {
    id: 1,
    type: "WIZ Debit Card",
    cardNumber: "**** **** **** 9288",
    balance: 73893.00,
    currency: "PKR",
    gradient: ['#7B2FF7', '#F107A3']
  },
  {
    id: 2,
    type: "UBL Credit Card",
    cardNumber: "**** **** **** 1234",
    balance: 200000.00,
    currency: "PKR",
    gradient: ['#0EA5E9', '#3B82F6'],
    isCredit: true
  }
];

export const transactionsData = [
  { 
    id: 1, 
    name: "Amazon Purchase", 
    amount: -4500, 
    date: "Today", 
    type: "debit", 
    icon: "cart",
    category: "Shopping"
  },
  { 
    id: 2, 
    name: "Salary Credit", 
    amount: 150000, 
    date: "Yesterday", 
    type: "credit", 
    icon: "cash",
    category: "Income"
  },
  { 
    id: 3, 
    name: "Utility Bill", 
    amount: -3200, 
    date: "12 Apr", 
    type: "debit", 
    icon: "receipt",
    category: "Bills"
  },
  { 
    id: 4, 
    name: "ATM Withdrawal", 
    amount: -10000, 
    date: "10 Apr", 
    type: "debit", 
    icon: "card",
    category: "Cash"
  }
];

export const quickActionsData = [
  { id: 1, icon: "send", label: "Send Money", color: "#00B4D8", route: "SendMoney" },
  { id: 2, icon: "phone-portrait", label: "Mobile Topup", color: "#7B2FF7", route: "MobileTopup" },
  { id: 3, icon: "receipt", label: "Pay Bills", color: "#F107A3", route: "PayBills" },
  { id: 4, icon: "business", label: "Accounts", color: "#22C55E", route: "VirtualCard" }
];

export const accountsData = [
  {
    id: 1,
    accountHolder: "Tania Khan",
    accountNumber: "0209997612243",
    balance: 273900893.00,
    currency: "PKR",
    type: "Savings"
  },
  {
    id: 2,
    accountHolder: "Faraz Khan",
    accountNumber: "0209997612244",
    balance: 150000.00,
    currency: "PKR",
    type: "Current"
  }
];
