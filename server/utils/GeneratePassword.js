import { compareSync, genSaltSync, hashSync } from "bcrypt";
import generatePassword from 'generate-password';

export function HashedPassword(password) {
    const salt = genSaltSync();
    return hashSync(password, salt);
}

export function ComparePasword(raw, hashedPassword) {
    return compareSync(raw, hashedPassword)
}

export function CompareText(i, j) {
    return (i == j)
}

export function generateRandomPassword() {
    const password = generatePassword.generate({
        length: 8,
        numbers: true,
        symbols: false,
        uppercase: true,
        excludeSimilarCharacters: true,
    });
    return password;
}