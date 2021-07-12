import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

const server = setupServer(
  rest.get("/getComments", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          created: "2019-05-10 9:51:55",
          id: 1,
          message: "Hi there",
          name: "User1",
        },
        {
          created: "2021-03-10 12:00:00",
          id: 2,
          message: "Hello",
          name: "User2",
        },
        {
          created: "2021-04-1 18:51:55",
          id: 3,
          message: "Welcome",
          name: "User3",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders commentFeed loading", () => {
  render(<App />);
  const linkElement = screen.getByAltText(/loading/i);
  expect(linkElement).toBeInTheDocument();
});

test("loads and displays comments", async () => {
  render(<App />);

  await waitFor(() => screen.getByText("Name"));

  expect(screen.getByText("Hi there"));
  expect(screen.getByText("User1 on May 10th, 2019 at 9am"));
  expect(screen.getByText("Hello"));
  expect(screen.getByText("User2 on March 10th at 12noon"));
  expect(screen.getByText("Welcome"));
  expect(screen.getByText("User3 on April 1st at 6pm"));
});
