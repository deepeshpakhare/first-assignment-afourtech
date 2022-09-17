const notification = require("./models/notification");

const createNotification = async (notificationData) => {
    var newNotification = new notification();
    newNotification.user_id = notificationData.user_id;
    newNotification.category_id = notificationData.category_id;
    newNotification.budget_id = notificationData.budget_id;
    newNotification.date_of_creation = notificationData.date_of_creation;
    await newNotification.save();
    return newNotification;
}

const getUserNotifications = async (userData) => {
    var docs = await notification.find({user_id:userData.user_id});
    return docs;
}

module.exports = {
    "createNotification":createNotification,
    "getUserNotifications":getUserNotifications,
}