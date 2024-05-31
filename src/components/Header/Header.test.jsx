import { render, fireEvent, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import Header from "./Header";

describe("Header Component", () => {
  it("should add new todo", () => {
    render(<Header />);
    const input = screen.getAllByTestId("header-input");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Test Todo" } });

    fireEvent.click(button);

    expect(input).toBe("Test Todo");
  });
});
