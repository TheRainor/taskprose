import * as todoModel from "../models/todo-model.js";

// Create list
export async function createListController(req, res, next) {
  try {
    const { listName } = req.body;
    const userId = req.user.id;
    await todoModel.createList(userId, listName);
    return res.status(201).json({ success: true, messageKey: "server.list.success.created" });
  } catch (err) {
    next(err);
  }
}

// Get lists
export async function getListsController(req, res, next) {
  try {
    const userId = req.user.id;
    const lists = await todoModel.getLists(userId);
    return res.json({ success: true, lists });
  } catch (err) {
    next(err);
  }
}

// Delete lists
export async function deleteListController(req, res, next) {
  try {
    const listId = req.params.id;
    await todoModel.deleteList(listId);
    await todoModel.deleteListTasks(listId);
    return res.json({ success: true, messageKey: "server.list.success.deleted" });
  } catch (err) {
    next(err);
  }
}

// Get list tasks
export async function getListTasksController(req, res, next) {
  try {
    const userId = req.user.id;
    const { listId } = req.query;
    const resultListTasks = await todoModel.getListTasks(userId, listId);
    return res.json({ success: true, resultListTasks });
  } catch (err) {
    next(err);
  }
}


// Get list counts
export async function getListCountsController(req, res, next) {
  try {
    const userId = req.user.id;
    const listCounts = await todoModel.getListCounts(userId);
    return res.json({ success: true, listCounts });
  } catch (err) {
    next(err);
  }
}