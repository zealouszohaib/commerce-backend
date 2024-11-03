const router = require('express').Router();
const { authenticate } = require("../middlewares/authenticate");
const {
  signUp,
  login,
  logout,
  me,
} = require('../controller/auth');


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: User Authenticate
 *     tags: [Auth]
 *     description: Get a user and return a JWT token
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid token
 */
router.get('/me', authenticate, me);
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: Login a user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);
router.post('/logout', logout);
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Register a new user with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               entityName:
 *                 type: string
 *                 example: ExampleEntity
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *     responses:
 *       200:
 *         description: User registered successfully
 *       409:
 *         description: Email already registered
 */
router.post('/register', signUp);

module.exports = router;
