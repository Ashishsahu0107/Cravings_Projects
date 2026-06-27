export const sapleMiddleware = async (req, res, next) => {
    console.log("I am simple middleware one");
    next();
}

export const sapleMiddleware1 = async (req, res, next) => {
    console.log("I am simple middleware two");  
    next();
}

