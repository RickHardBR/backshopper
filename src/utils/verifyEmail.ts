export const verifyEmail = ( emailAddress: string ): boolean => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress);
};