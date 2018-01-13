/**
* Importing node modules
*/
import express from 'express';
/**
* Importing custom modules
*/
import User from '../../models/User';
import parseErrors from '../../utils/parseErrors';

const router = express.Router();

router.post("/register", (req, res) => {
  
  // Check if email was provided
  if (!req.body.email) {
    res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
  } else if (!req.body.username){
    res.json({ success: false, message: 'You must provide a username' }); // Return error
  } else if (!req.body.password) {
    res.json({ success: false, message: 'You must provide a password' }); // Return error
  } else {
    // Create new user object and apply user input
    const user = new User({
      email: req.body.email.toLowerCase(),
      username: req.body.username.toLowerCase(),
      password: req.body.password
    });

    // Save user to database using promise
    user.save()
        .then(userRecord => {
          res.status(200).json({ success: true, message: 'Account registered!', user: userRecord.toAuthJSON() }); // Return success
        })
        .catch(err => {
          // Check if error is an error indicating duplicate account
          if (err.code === 11000) {
            res.status(400).json({ success: false, message: 'Username or e-mail already exists' }); // Return error
          } else if (err.errors){
              if (err.errors.email) {
                res.status(400).json({ success: false, errors: parseErrors(err.errors), message: err.errors.email.message }); // Return error
              } else if (err.errors.username) {
                res.status(400).json({ success: false, errors: parseErrors(err.errors), message: err.errors.username.message }); // Return error
              } else if (err.errors.password) {
                res.status(400).json({ success: false, errors: parseErrors(err.errors), message: err.errors.password.message }); // Return error
              } else {
                res.status(400).json({ success: false, errors: parseErrors(err.errors), message: err }); // Return any other error not already covered
              }
          } else {
            res.status(400).json({ success: false, errors: parseErrors(err.errors), message: 'Could not save user.'}); // Return error if not related to validation
          }  
        });

  }

});

export default router;
