export const AuthProject = async (req, res, next) => {
    try {
        
        next();
    } catch (error) {
        const Error = new Error("Unknown Error At Middleware");
        Error.statauCode = 500;
        next(Error);
    }
};

