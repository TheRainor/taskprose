import { createTaskService, updateTaskService, deleteTaskService } from '../services/task-service.js';
import * as todoModel from '../models/todo-model.js';

// Add task 
export async function createTaskController(req, res, next) {
    try {
      const { title, description, alarm, date, repeat, activePage } = req.body;
      const userId = req.user.id;
    await createTaskService( userId, title, description, alarm, date, repeat );
  
    return res.status(201).json({
      success: true,
      message: 'Görev başarıyla eklendi',
      activePage
    });
    } catch (err) {
      next(err);
    }
  } 

  // Get all tasks
  export async function getAllTasksController(req, res, next) {
    try {
      const userId = req.user.id; 
      const resultAllTasks = await todoModel.showAllTasks( userId );
      return res.json({ success: true, resultAllTasks }); 
    } catch (err) {
      next(err);
    }
  }
  
  // Get today tasks
  export async function getTodayTasksController(req, res, next) {
    try {
      const userId = req.user.id; 
      const resultTodayTasks = await todoModel.showTodayTasks( userId );
      return res.json({ success: true, resultTodayTasks });
    } catch (err) {
      next(err);
    }
  }

  // Get important tasks
  export async function getImportantTasksController(req, res, next) {
    try {
      const userId = req.user.id; 
      const resultImportantTasks = await todoModel.showImportantTasks( userId );
      return res.json({ success: true, resultImportantTasks });
    } catch (err) {
      next(err);
    }
  }

  // Get planned tasks
  export async function getPlannedTasksController(req, res, next) {
    try {
      const userId = req.user.id; 
      const resultPlannedTasks = await todoModel.showPlannedTasks( userId );
      return res.json({ success: true, resultPlannedTasks });
    } catch (err) {
      next(err);
    }
  }

  // Get completed tasks
  export async function getCompletedTasksController(req, res, next) {
    try {
      const userId = req.user.id; 
      const resultCompletedTasks = await todoModel.showCompletedTasks( userId );
      return res.json({ success: true, resultCompletedTasks });
    } catch (err) {
      next(err);
    }
  }

  // Get task counts
  export async function getTaskCountsController(req, res, next) {
    try {
      const userId = req.user.id; 
      const counts = await todoModel.getTaskCounts( userId );
      return res.json({ success: true, counts });
    } catch (err) {
      next(err);
    }
  }

  // Update tasks
  export async function updateTaskController(req, res, next) {
    try {
      const id = req.params.id;
      const { completed } = req.body;
      await updateTaskService(id, completed);
      return res.json({ success: true, message: "Görev tamamlandı olarak işaretlendi."})
    } catch (err) {
      next(err);
    }
  }

  // Delete tasks
  export async function deleteTaskController(req, res, next) {
    try {
      const id = req.params.id;
      await deleteTaskService(id);
      return res.json({ success: true, message: "Görev başarıyla silindi."})
    } catch (err) {
      next(err);
    }
  }