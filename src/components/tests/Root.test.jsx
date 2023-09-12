import {  render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect } from "vitest";
import { BrowserRouter } from 'react-router-dom';
import Root from "../Root";

describe("Search Bar", () => {
    afterEach(cleanup)

    it("renders search bar when search icon is clicked", async () => {
        const user = userEvent.setup();
        const fakeCart = [];
        render(
            <BrowserRouter>
                <Root cart={fakeCart}/>
            </BrowserRouter>
        );
        const btn = screen.getByLabelText('open-search');

        await user.click(btn);

        expect(screen.getByRole('searchbox')).toBeInTheDocument();
    })

    it("closes search bar when close icon is clicked", async () => {
        const user = userEvent.setup();
        const fakeCart = [];
        render(
            <BrowserRouter>
                <Root cart={fakeCart}/>
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
        const fakeCart = [];
        render(
            <BrowserRouter>
                <Root cart={fakeCart}/>
            </BrowserRouter>
        );
        const openBtn = screen.getByLabelText('open-search');

        await user.click(openBtn);

        const closeBtn = screen.getByTestId('overlay');

        await user.click(closeBtn);

        expect(screen.getByRole('navigation')).toBeInTheDocument();
    })

    it("search displays results correctly", async () => {
        const user = userEvent.setup();
        const allGames = [{id : 1, name: 'The Game', released: '2022-01-02', genres: [{name: 'RPG'}]}];
        const fakeCart = [];
        render(
            <BrowserRouter>
                <Root cart={fakeCart} allGames={allGames}/>
            </BrowserRouter>
        );
        const openBtn = screen.getByLabelText('open-search');

        await user.click(openBtn);
        const searchInput = screen.getByRole('searchbox')
        await user.type(searchInput, 'The');

        expect(screen.getByText("The Game")).toBeInTheDocument();
    })
})

describe("Cart Modal", () => {
    afterEach(cleanup)


    it("renders cart modal when cart is clicked", async () => {
        const user = userEvent.setup();
        const fakeCart = [];
        render(
            <BrowserRouter>
                <Root cart={fakeCart}/>
            </BrowserRouter>
        );
        const btn = screen.getByLabelText('cart');

        await user.click(btn);

        expect(screen.getByTestId('overlay')).toBeInTheDocument();
    })

    it("closes cart modal when cart is clicked", async () => {
        const user = userEvent.setup();
        const fakeCart = [];
        render(
            <BrowserRouter>
                <Root cart={fakeCart}/>
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
        const fakeCart = [];
        render(
            <BrowserRouter>
                <Root cart={fakeCart}/>
            </BrowserRouter>
        );
        const openBtn = screen.getByLabelText('cart');

        await user.click(openBtn);

        const closeBtn = screen.getByTestId('overlay');

        await user.click(closeBtn);

        expect(screen.queryAllByTestId('overlay').length).toBe(0);
    })

    it("displays cart items", async () => {
        const user = userEvent.setup();
        const fakeCart = [{id: 1, name: 'My Game', background_image: ''}];
        render(
            <BrowserRouter>
                <Root cart={fakeCart}/>
            </BrowserRouter>
        );
        const openBtn = screen.getByLabelText('cart');

        await user.click(openBtn);

        expect(screen.getByText('My Game')).toBeInTheDocument();
    })

    it("displays appropriate text if cart is empty", async () => {
        const user = userEvent.setup();
        const fakeCart = [];
        render(
            <BrowserRouter>
                <Root cart={fakeCart}/>
            </BrowserRouter>
        );
        const openBtn = screen.getByLabelText('cart');

        await user.click(openBtn);

        expect(screen.getByText('YOUR CART IS EMPTY')).toBeInTheDocument();
    })
})