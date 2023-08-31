import {  render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import Root from "../Root";

describe("Header", () => {
    afterEach(cleanup)

    it("renders Header", () => {
        const { asFragment } = render(
        <BrowserRouter>
            <Root />
        </BrowserRouter>
        
        )
    
        expect(asFragment(<Root />)).toMatchSnapshot()
    })
    
})

describe("Search Bar", () => {
    afterEach(cleanup)

    it("renders search bar when search icon is clicked", async () => {
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        );
        const btn = screen.getByLabelText('open-search');

        await user.click(btn);

        expect(screen.getByRole('searchbox')).toBeInTheDocument();
    })

    it("closes search bar when close icon is clicked", async () => {
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        );
        const openBtn = screen.getByLabelText('open-search');

        await user.click(openBtn);

        const closeBtn = screen.getByLabelText('close-search');

        await user.click(closeBtn);

        expect(screen.getByRole('navigation')).toBeInTheDocument();
    })

    it("closes search bar when anything but it is clicked", async () => {
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        );
        const openBtn = screen.getByLabelText('open-search');

        await user.click(openBtn);

        const closeBtn = screen.getByTestId('overlay');

        await user.click(closeBtn);

        expect(screen.getByRole('navigation')).toBeInTheDocument();
    })
})

describe("Cart Modal", () => {
    afterEach(cleanup)

    it("renders cart modal when cart is clicked", async () => {
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        );
        const btn = screen.getByLabelText('cart');

        await user.click(btn);

        expect(screen.getByTestId('overlay')).toBeInTheDocument();
    })

    it("closes cart modal when cart is clicked", async () => {
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        );
        const openBtn = screen.getByLabelText('cart');

        await user.click(openBtn);

        const closeBtn = screen.getByLabelText('cart');

        await user.click(closeBtn);

        expect(screen.queryAllByTestId('overlay').length).toBe(0);
    })

    it("closes cart modal when anything but it is clicked", async () => {
        const user = userEvent.setup();
        render(
            <BrowserRouter>
                <Root />
            </BrowserRouter>
        );
        const openBtn = screen.getByLabelText('open-search');

        await user.click(openBtn);

        const closeBtn = screen.getByTestId('overlay');

        await user.click(closeBtn);

        expect(screen.queryAllByTestId('overlay').length).toBe(0);
    })
})