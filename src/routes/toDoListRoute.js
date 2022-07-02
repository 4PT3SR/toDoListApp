const router = require('express').Router();
const controller = require('../controllers/toDoController')



router.get('/',controller.allToDos)
router.post('/add',controller.addTodo)
router.patch('/update/:id',controller.update)
router.delete('/delete/:id',controller.delete)



module.exports = router;