export type CurrentUser = {
  id: string;
};

export type JwtUser = CurrentUser & {
  iat: number;
  exp: number;
};
