const expense = require("./models/expense")

const insertExpense = async (expenseData) => {
    var newExpense = new expense();
    newExpense.user_id = expenseData.user_id;
    newExpense.category_id = expenseData.category_id;
    newExpense.amount = expenseData.amount;
    newExpense.date_of_expense = expenseData.date_of_expense;
    await newExpense.save();
    return newExpense;
}

const updateExpense = async (expenseData) => {
    throw "not implemented"
}

const deleteExpense = async (expenseData) => {
    throw "not implemented"
}

const getAll = async () => {
    var doc = await expense.find();
    return doc;
}

const getbyUser = async (user_id) => {
    var doc = await expense.find({user_id:user_id});
    return doc;
}

module.exports = {
    "insertExpense": insertExpense,
    "getAll":getAll,
    "getbyUser":getbyUser,
     "updateExpense":updateExpense,
     "deleteExpense":deleteExpense,
}