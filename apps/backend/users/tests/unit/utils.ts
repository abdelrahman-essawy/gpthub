interface PasswordProps {
  minLength: number;
  minLowercase: number;
  minUppercase: number;
  minNumbers?: number;
  minSpecialChars?: number;
}

export function generatePassword(props: PasswordProps): string {
  const {
    minLength,
    minLowercase,
    minUppercase,
    minNumbers = 0,
    minSpecialChars = 0,
  } = props;

  const generateRandomChar = (charset: string) => {
    return charset.charAt(Math.floor(Math.random() * charset.length));
  };

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numericChars = '0123456789';
  const specialChars = '!@#$%^&*()_+{}[]<>?';

  let password = '';

  // Add required lowercase characters
  for (let i = 0; i < minLowercase; i++) {
    password += generateRandomChar(lowercaseChars);
  }

  // Add required uppercase characters
  for (let i = 0; i < minUppercase; i++) {
    password += generateRandomChar(uppercaseChars);
  }

  // Add required numeric characters
  for (let i = 0; i < minNumbers; i++) {
    password += generateRandomChar(numericChars);
  }

  // Add required special characters
  for (let i = 0; i < minSpecialChars; i++) {
    password += generateRandomChar(specialChars);
  }

  // Add remaining characters
  const remainingLength =
    minLength - minLowercase - minUppercase - minNumbers - minSpecialChars;
  const allChars =
    lowercaseChars + uppercaseChars + numericChars + specialChars;
  for (let i = 0; i < remainingLength; i++) {
    password += generateRandomChar(allChars);
  }

  // Shuffle the password
  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return password;
}
