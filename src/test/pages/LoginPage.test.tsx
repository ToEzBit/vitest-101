import { screen, render, userEvent, waitFor } from "../../utils/test-utils";
import LoginPage from "@pages/LoginPage";
import { login } from "@api/auth";

vi.mock("@api/auth");

const renderApp = () => {
  render(<LoginPage />);

  const user = userEvent.setup();

  const getEmailInput = screen.getByLabelText(/email/i);
  const getPasswordInput = screen.getByLabelText(/password/i);
  const getLoginButton = screen.getByRole("button", { name: "login" });

  return {
    user,
    getEmailInput,
    getPasswordInput,
    getLoginButton,
  };
};

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should display Email & Password input", () => {
    const { getEmailInput, getPasswordInput } = renderApp();

    expect(getEmailInput).toBeInTheDocument();
    expect(getPasswordInput).toBeInTheDocument();
  });

  it("should display login button", () => {
    const { getLoginButton } = renderApp();

    expect(getLoginButton).toBeInTheDocument();
  });

  it("should successes login when email & password correct", async () => {
    const { user, getEmailInput, getPasswordInput, getLoginButton } =
      renderApp();

    // vi.mocked(login).mockResolvedValue({
    //   userId: 1,
    //   token: "asd12JasdsdIOUncmslsw92!s",
    // });

    const mockUsername = "john";
    const mockPassword = "john";

    await user.type(getEmailInput, mockUsername);
    await user.type(getPasswordInput, mockPassword);

    await user.click(getLoginButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: mockUsername,
        password: mockPassword,
      });
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });

  it("should fail login when email & password incorrect", async () => {
    const { user, getEmailInput, getPasswordInput, getLoginButton } =
      renderApp();

    vi.mocked(login).mockRejectedValue({});

    const mockUsername = "john";
    const mockPassword = "kuy";

    await user.type(getEmailInput, mockUsername);
    await user.type(getPasswordInput, mockPassword);

    await user.click(getLoginButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: mockUsername,
        password: mockPassword,
      });
      expect(screen.getByText(/fail/i)).toBeInTheDocument();
    });
  });
});
