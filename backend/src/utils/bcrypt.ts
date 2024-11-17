const bcrypt = require('bcrypt');

export async function hash(password: string) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}