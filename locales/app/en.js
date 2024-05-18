export default {
  app: {
    title: "Omar App",
  },

  pages: {
    error: {
      notFound: {
        title: "Oops! page not found",
        desc: "The page you are looking for might have been removed or its name changed or is temporarily unavailable.",
        btn: "Back to Home",
      },
      serverErr: {
        title: "Oops! server error",
        desc: "The server encountered an internal error or misconfiguration and was unable to complete your request.",
        btn: "Try Later",
      },
      else: {
        title: "Oops! something went wrong",
        desc: "An unexpected error has occurred. Please try again later.",
        btn: "Try Later",
      },
    },
  },
};
