const mongoose = require("mongoose");
const budget = require("./models/budget");

const insertBudget = async (budgetData)=> {
    var newBudget = new budget();
    newBudget.user_id = budgetData.user_id;
    newBudget.category_id = budgetData.category_id;
    newBudget.amount = budgetData.amount;
    await newBudget.save();
    return newBudget;
}

const updateBudget = async (budgetData) => {
    var doc = await budget.findOne({user_id:budgetData.user_id,category_id:budgetData.category_id});
    doc.amount = budgetData.amount;
    await doc.save();
    return doc;
}

const doesBudgetExistAlredy = async (budgetData) => {
    var doc = await budget.findOne({user_id:budgetData.user_id,category_id:budgetData.category_id});
    if (doc != null) {
        return true;
    }
    return false;
}

const getBudget = async(budgetData) => {
    if (budgetData.category_id != undefined) {
        var doc = await budget.findOne({user_id:budgetData.user_id,category_id:budgetData.category_id});
        if(doc != null) {
            return doc;
        }
    }else{
        var docs = await budget.find({user_id:budgetData.user_id});
        if(docs != null) {
            return docs;
        }
    }
    throw "No budget found";
}


module.exports = {
    "insertBudget":insertBudget,
    "updateBudget":updateBudget,
    "doesBudgetExistAlredy":doesBudgetExistAlredy,
    "getBudget":getBudget,
}

