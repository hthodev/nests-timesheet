import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

export function calculateWorkingTime(startTime: string, endTime: string) {
  const start = startTime.split(':');
  const end = endTime.split(':');

  const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
  const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);

  const diffMinutes = endMinutes - startMinutes;
  const diffHours = diffMinutes / 60;

  return diffHours;
}

export function hashPassword(password) {
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  return hashSync(password, salt);
}

export function comparePassword(password, hashPassworded) {
  return compareSync(password, hashPassworded);
}

export function signToken(user) {
  const privateKey = process.env.PRIVATE_KEY;
  return sign({ ...user }, privateKey, { algorithm: 'RS256' })
}