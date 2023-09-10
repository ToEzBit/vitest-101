const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

type LoginRes = {
  userId: number;
  token: string;
};

type Login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<LoginRes>;

export const login: Login = async ({ email, password }) => {
  await wait(1000);

  if (email === password) {
    return {
      userId: 1,
      token: "asd12JasdsdIOUncmslsw92!s",
    };
  }

  throw new Error("email or password is invalid");
};
