'use strict';

// Import modules
const db = require('./db').models;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
let Sequelize = require('sequelize');

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
//
// USER ROUTES
//

// Authenticate middleware
const authenticateUser = asyncHandler(async (req, res, next) => {
  let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  if (credentials) {
    // Attempt to retrieve the user from the data store
    // by their username (i.e. the user's "key"
    // from the Authorization header).
    // Since we don't have a username, we use the (unique) emailAddress as username
    const user = await db.User.findOne({
      where: {
        emailAddress: credentials.name
      }
    });

    // If a user was successfully retrieved from the data store...
    if (user) {
      // Use the bcryptjs npm package to compare the user's password
      // (from the Authorization header) to the user's password
      // that was retrieved from the data store.
      const authenticated = bcryptjs
        .compareSync(credentials.pass, user.password);

      // If the passwords match...
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.username}`);

        // Then store the retrieved user object on the request object
        // so any middleware functions that follow this middleware function
        // will have access to the user's information.
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }

  // If user authentication failed...
  if (message) {
    console.warn(message);

    // Return a response with a 401 Unauthorized HTTP status code.
    res.status(401).json({ message: 'Access Denied' });
  } else {
    // Or if user authentication succeeded...
    // Call the next() method.
    next();
  }
});

// GET /api/users 200 - Returns the currently authenticated user

router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = await req.currentUser;
  console.log(user);
  res.status(200).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
  }).end();
}));
  
// POST /users 201 - Creates a user, sets the Location header to "/", and returns no content

router.post('/users', asyncHandler(async (req, res) => {
  const user = req.body;
  if (user.password) {
    user.password = await bcryptjs.hashSync(user.password); // Hash password for database
  }

  // Add the user to the db
   db.User.create(user).then(() => {
      // if validation is ok, create user
      res.status(201).location('/').json().end()
    }).catch(Sequelize.ValidationError, (error) => {
      // if validation throws errors, send message
      let errMessage = error.errors.map(error => error.message);
      res.status(400).json({ error:errMessage });
    });
}));

//
// COURSE ROUTES
//  

// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
  router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await db.Course.findAll({attributes: { exclude: ["createdAt", "updatedAt"] }}); // exclude TimeStamps
    res.status(200).json(courses).end();
}));
  
  // GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
  router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await db.Course.findByPk(req.params.id, {
      attributes: { exclude: [ 'createdAt', 'updatedAt'] },
      include: [
        {
          model: db.User,
          as: 'owner',
          attributes: { exclude: [ 'password', 'createdAt', 'updatedAt'] }
        }
      ]
    });
    console.log(course);
  if (course) {
    res.status(200).json(course).end();
  } else {
    res.status(400).json({message: 'Sorry, a course with this title is unavailable'}).end();
  }
})); 
  
  // POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
  router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    await db.Course.create(req.body)
    .then(course => {
      res.status(201).location('/courses/' + course.id).end();
    })
    .catch(Sequelize.ValidationError, (error) => {
      // responds with Sequelize custom validation errors
      let errorMessage = error.errors.map(error => error.message);
      res.status(400).json({ error:errorMessage });
    });
  }));
  
  // PUT /api/courses/:id 204 - Updates a course and returns no content
  router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await db.Course.findByPk(req.params.id);
    if (req.body.title && req.body.description) {
      course.update(req.body)
      .then(() => {
        // if validation passes, it will update model
        res.status(204).json(course).end();
      })
      .catch(Sequelize.ValidationError, (error) => {
        // responds with Sequelize custom validation errors
        let errorMessage = error.errors.map(error => error.message);
        res.status(400).json({ error:errorMessage });
      });
    } else {
      res.status(400).json({ message: "Both title and description needed to be filled." });
    }
  }));

  // DELETE /api/courses/:id 204 - Deletes a course and returns no content
  router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await db.Course.findByPk(req.params.id);
    if (course) {
      course.destroy()
      .then(() => {
        // return status 204 and no content
        res.status(204).json(course).end();
      })
      .catch(Sequelize.ValidationError, (error) => {
        // responds with Sequelize custom validation errors
        let errorMessage = error.errors.map(error => error.message);
        res.status(400).json({ error:errorMessage });
      });
    } else {
      res.status(404).json();
    }
  }));
  
  module.exports = router;