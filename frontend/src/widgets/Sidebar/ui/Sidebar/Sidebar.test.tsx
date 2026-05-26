// import { fireEvent, screen } from "@testing-library/react";
// import { componentRender } from "shared/lib/tests/componentRender";
// import { Sidebar } from "widgets/Sidebar";

// describe("Sidebar", () => {
//   test("component", () => {
//     componentRender(<Sidebar />);
//     expect(screen.getByTestId("sidebar")).toBeInTheDocument();
//   });

//   test("collapse", () => {
//     componentRender(<Sidebar />);

//     const toggle = screen.getByTestId("toggle-sidebar");
//     fireEvent.click(toggle);
//     expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
//   });
// });
