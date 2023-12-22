export const switchResponse = (message: string): string => {
  switch (message) {
    case 'Email already registered!':
      return 'Email já cadastrado no sistema!'
    default:
      return 'Error tente novamente mais tarde';
  }
}