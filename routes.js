'use strict';

// Import modules
const express = require('express');

// Construct a router instance
const router = express.Router();

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
  router.get('/courses', (req, res) => {
    const testData = { 'user': 'list of courses' };
    res.json(testData);
});
  
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