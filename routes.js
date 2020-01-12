'use strict';

// Import modules
const db = require('./db').models;

// Construct a router instance
const express = require('express');
const router = express.Router();

// Async Handler Helper Function
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
}

// USER ROUTES

// GET /api/users 200 - Returns the currently authenticated user

router.get('/users', (req, res) => {
    const testData = { 'user': 'current user' };
    res.json(testData);
  });
  
  // POST /users 201 - Creates a user, sets the Location header to "/", and returns no content
  router.post('/users', (req, res) => {
    const testData = { 'user': 'create user' };
    res.status(201).json(testData);
  });
  
 // COURSE ROUTES
  
  // GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
  router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await db.Course.findAll();
    res.status(200).json(courses).end();
}));
  
  // GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
  router.get('/courses/:id', (req, res) => {
    const testData = { 'course': 'course and user' };
    res.json(testData);
}); 
  
  // POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
  router.post('/courses', (req, res) => {
    const testData = { message: 'create a course' };
    res.status(201).json(testData);
  });
  
  // PUT /api/courses/:id 204 - Updates a course and returns no content
  router.put('/courses/:id', (req, res) => {
    const testData = { message: 'Update a course' };
    res.json(testData).status(204);
  });

  // DELETE /api/courses/:id 204 - Deletes a course and returns no content
  router.delete('/courses/:id', (req, res) => {
    const testData = { 'course': 'Delete a course' };
    res.json(testData).status(204);
  });
  
  module.exports = router;