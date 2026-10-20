/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and account management endpoints
 */

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Creates a new user account and sends an OTP verification email to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Secret@123
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: Secret@123
 *     responses:
 *       201:
 *         description: User registered successfully and OTP sent to email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: OTP sent to your email address successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request (user already exists, password mismatch, or validation failure)
 *       500:
 *         description: Internal server error
 */
