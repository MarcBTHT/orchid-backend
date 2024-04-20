import User from './db/schemas/user-schema.js'
import { encryptionPassword, comparePassword } from './utils/crypto-utils.js';
import jwt from 'jsonwebtoken'

export function registerRoutes(app) {
  // function qui récupère les données de la base de données
  app.get('/users', async function handler(request, reply) {
    const users = await User.find()
    return users
  })

  app.get('/users/:id', async function handler(request, reply) {
    const user = await User.findById(request.params.id)
    return user
  })

  app.post('/users', async function handler(request, reply) {
    const user = new User({
      username: request.body.username,
      email: request.body.email,
      password: await encryptionPassword(request.body.password)
    })
    await user.save()
    console.log('user saved')
    return request.body
  })


  app.post('/auth/token', async function handler(request, reply) {
    // Recherche de l'utilisateur par son username ou son email
    const user = await User.findOne({
        $or: [
            { username: request.body.username },
            { email: request.body.username }
        ]
    });

    if (!user) {
        return reply.status(401).send({ error: "This user doesn't exist" });
    }

    const isSamePassword = await comparePassword(request.body.password, user.password);
    if (!isSamePassword) {
        return reply.status(401).send({ error: 'Password is incorrect' });
    }

    // Confirmer la connexion réussie
    console.log('User connected:', user.email);
    return reply.status(200).send({ message: "User successfully connected", email: user.email });
});
}