import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOuts/MainLayout";
import Home from "../Components/Home/Home";
import AuthLaoyout from "../AuthLaoyout/AuthLaoyout";
import Register from "../AuthLaoyout/Register";
import Login from "../AuthLaoyout/Login";
import ErrorPage from "../LayOuts/ErrorPage";
import ForgetPassword from "../AuthLaoyout/ForgetPassword";
import AllReviews from "../Pages/AllReviews";
import PrivateRoute from "./PrivateRoute";
import AddReview from "../Pages/AddReview";
import MyReviews from "../Pages/MyReviews";
import ReviewDetails from "../Pages/ReviewDetails";
import MyWatchlist from "../Pages/MyWatchlist";
import UpdateReviewPage from "../Pages/UpdateReviewPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/reviews",
        element: <AllReviews></AllReviews>,
        loader: () => fetch("https://chill-gamer-server-sigma.vercel.app/allReviews"),
      },
      {
        path: "/addReview",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/myreviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/review/:id",
        element: (
          <PrivateRoute>
            <ReviewDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://chill-gamer-server-sigma.vercel.app/allReviews/${params.id}`).then((res) =>
            res.json()
          ),
      },
      //
      {
        path: "/myWatchlist",
        element: (
          <PrivateRoute>
            <MyWatchlist></MyWatchlist>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/review/updateReview/:id",
        element: <UpdateReviewPage></UpdateReviewPage>,
        loader: ({ params }) =>
          fetch(`https://chill-gamer-server-sigma.vercel.app/allReviews/${params.id}`).then((res) =>
            res.json()
          ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLaoyout></AuthLaoyout>,
    children: [
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/forgetpassword",
        element: <ForgetPassword></ForgetPassword>,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default Router;
