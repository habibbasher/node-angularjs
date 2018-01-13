/**
* Importing node modules
*/
import express from 'express';


const router = express.Router();

router.get("/", (req, res) => {
  res.json({msg: 'This is users module.You can write your api route here!!'})

});

export default router;
